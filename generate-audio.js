const fs = require('fs');
const path = require('path');

// Generate 16-bit PCM WAV audio for CareConnect Intro Sound:
// Heartbeat 1 (0.05s-0.25s) + Heartbeat 2 (0.28s-0.5s) + Warm Chord Chime (0.52s-1.8s)
const sampleRate = 44100;
const durationSeconds = 1.9;
const totalSamples = Math.floor(sampleRate * durationSeconds);
const numChannels = 2;
const bytesPerSample = 2;
const blockAlign = numChannels * bytesPerSample;
const byteRate = sampleRate * blockAlign;
const dataSize = totalSamples * blockAlign;

const buffer = Buffer.alloc(44 + dataSize);

// RIFF chunk descriptor
buffer.write('RIFF', 0);
buffer.writeUInt32LE(36 + dataSize, 4);
buffer.write('WAVE', 8);

// fmt sub-chunk
buffer.write('fmt ', 12);
buffer.writeUInt32LE(16, 16); // SubChunk1Size (16 for PCM)
buffer.writeUInt16LE(1, 20);  // AudioFormat (1 for PCM)
buffer.writeUInt16LE(numChannels, 22); // NumChannels
buffer.writeUInt32LE(sampleRate, 24); // SampleRate
buffer.writeUInt32LE(byteRate, 28);   // ByteRate
buffer.writeUInt16LE(blockAlign, 32); // BlockAlign
buffer.writeUInt16LE(16, 34);         // BitsPerSample

// data sub-chunk
buffer.write('data', 36);
buffer.writeUInt32LE(dataSize, 40);

let offset = 44;

// Frequencies for warm chord (F major 9 / D minor 7 / A minor warm harmony)
const chordNotes = [
  { freq: 261.63, delay: 0.52, amp: 0.22, decay: 0.8 }, // C4
  { freq: 329.63, delay: 0.54, amp: 0.25, decay: 0.9 }, // E4
  { freq: 392.00, delay: 0.56, amp: 0.28, decay: 1.0 }, // G4
  { freq: 523.25, delay: 0.58, amp: 0.24, decay: 1.1 }, // C5
  { freq: 659.25, delay: 0.60, amp: 0.18, decay: 1.1 }  // E5
];

for (let i = 0; i < totalSamples; i++) {
  const t = i / sampleRate;
  let sample = 0;

  // --- 1. First Heartbeat Thump (t = 0.05s to 0.25s) ---
  if (t >= 0.05 && t <= 0.28) {
    const dt = t - 0.05;
    const dur = 0.23;
    const env = Math.sin((dt / dur) * Math.PI);
    const freq = 65 - (dt / dur) * 20; // 65Hz down to 45Hz
    const osc = Math.sin(2 * Math.PI * freq * dt) + 0.3 * Math.sin(2 * Math.PI * (freq * 0.5) * dt);
    sample += osc * env * 0.48;
  }

  // --- 2. Second Heartbeat Thump (t = 0.28s to 0.54s) ---
  if (t >= 0.28 && t <= 0.55) {
    const dt = t - 0.28;
    const dur = 0.26;
    const env = Math.sin((dt / dur) * Math.PI);
    const freq = 74 - (dt / dur) * 24; // 74Hz down to 50Hz
    const osc = Math.sin(2 * Math.PI * freq * dt) + 0.35 * Math.sin(2 * Math.PI * (freq * 0.5) * dt);
    sample += osc * env * 0.58;
  }

  // --- 3. Warm Harmonic Chime (t = 0.52s to 1.8s) ---
  if (t >= 0.52) {
    for (const note of chordNotes) {
      if (t >= note.delay) {
        const dt = t - note.delay;
        // Soft attack (0.04s) and smooth exponential release
        const attack = Math.min(1, dt / 0.04);
        const release = Math.exp(-dt / (note.decay * 0.45));
        const env = attack * release;
        
        // Pure tone + subtle soft harmonic
        const tone = Math.sin(2 * Math.PI * note.freq * dt) + 0.15 * Math.sin(2 * Math.PI * note.freq * 2 * dt);
        sample += tone * env * note.amp;
      }
    }
  }

  // Soft master clipping prevention
  sample = Math.max(-0.95, Math.min(0.95, sample));

  const intSample = Math.floor(sample * 32767);

  // Left channel
  buffer.writeInt16LE(intSample, offset);
  offset += 2;
  // Right channel
  buffer.writeInt16LE(intSample, offset);
  offset += 2;
}

const outputPath = path.join(__dirname, '..', 'public', 'careconnect-chime.wav');
fs.writeFileSync(outputPath, buffer);
console.log('WAV sound file generated successfully at:', outputPath);
