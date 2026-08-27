const fs = require('fs');
const path = require('path');

const sampleRate = 44100;

function createWavBuffer(samples, sampleRate = 44100) {
  const numChannels = 2;
  const bytesPerSample = 2;
  const blockAlign = numChannels * bytesPerSample;
  const byteRate = sampleRate * blockAlign;
  const totalSamples = samples.length;
  const dataSize = totalSamples * blockAlign;

  const buffer = Buffer.alloc(44 + dataSize);

  // RIFF header
  buffer.write('RIFF', 0);
  buffer.writeUInt32LE(36 + dataSize, 4);
  buffer.write('WAVE', 8);

  // fmt chunk
  buffer.write('fmt ', 12);
  buffer.writeUInt32LE(16, 16);
  buffer.writeUInt16LE(1, 20); // PCM
  buffer.writeUInt16LE(numChannels, 22);
  buffer.writeUInt32LE(sampleRate, 24);
  buffer.writeUInt32LE(byteRate, 28);
  buffer.writeUInt16LE(blockAlign, 32);
  buffer.writeUInt16LE(16, 34);

  // data chunk
  buffer.write('data', 36);
  buffer.writeUInt32LE(dataSize, 40);

  let offset = 44;
  for (let i = 0; i < totalSamples; i++) {
    const s = Math.max(-0.98, Math.min(0.98, samples[i]));
    const intVal = Math.floor(s * 32767);
    buffer.writeInt16LE(intVal, offset);
    offset += 2;
    buffer.writeInt16LE(intVal, offset);
    offset += 2;
  }

  return buffer;
}

// =========================================================================
// 1. CINEMATIC HEALTHCARE "TA-DUM" (Deep warm sub-pulse + rich string chord bloom)
// =========================================================================
function generateCinematicTaDum() {
  const duration = 1.9;
  const totalSamples = Math.floor(sampleRate * duration);
  const samples = new Float32Array(totalSamples);

  for (let i = 0; i < totalSamples; i++) {
    const t = i / sampleRate;
    let s = 0;

    // 1st Sub Hit (t = 0.05s to 0.3s)
    if (t >= 0.04 && t <= 0.32) {
      const dt = t - 0.04;
      const dur = 0.28;
      const env = Math.sin((dt / dur) * Math.PI);
      const f = 82 - (dt / dur) * 28; // 82Hz -> 54Hz
      s += (Math.sin(2 * Math.PI * f * dt) + 0.4 * Math.sin(2 * Math.PI * f * 2 * dt)) * env * 0.75;
    }

    // 2nd Sub Hit (t = 0.28s to 0.58s)
    if (t >= 0.28 && t <= 0.60) {
      const dt = t - 0.28;
      const dur = 0.32;
      const env = Math.sin((dt / dur) * Math.PI);
      const f = 90 - (dt / dur) * 32; // 90Hz -> 58Hz
      s += (Math.sin(2 * Math.PI * f * dt) + 0.45 * Math.sin(2 * Math.PI * f * 2 * dt)) * env * 0.85;
    }

    // Cinematic Cello & Bell Bloom (F-Major-9 chord: F3, C4, E4, G4, A4, C5)
    if (t >= 0.48) {
      const notes = [
        { f: 174.61, delay: 0.48, amp: 0.45, decay: 1.1 }, // F3
        { f: 261.63, delay: 0.50, amp: 0.40, decay: 1.2 }, // C4
        { f: 329.63, delay: 0.52, amp: 0.38, decay: 1.2 }, // E4
        { f: 392.00, delay: 0.54, amp: 0.35, decay: 1.3 }, // G4
        { f: 440.00, delay: 0.56, amp: 0.32, decay: 1.3 }, // A4
        { f: 523.25, delay: 0.58, amp: 0.28, decay: 1.4 }  // C5
      ];

      for (const n of notes) {
        if (t >= n.delay) {
          const dt = t - n.delay;
          const attack = Math.min(1, dt / 0.05);
          const release = Math.exp(-dt / (n.decay * 0.45));
          const env = attack * release;
          const tone = Math.sin(2 * Math.PI * n.f * dt) + 0.2 * Math.sin(2 * Math.PI * n.f * 2 * dt);
          s += tone * env * n.amp;
        }
      }
    }

    samples[i] = s * 0.85;
  }

  return samples;
}

// =========================================================================
// 2. HEALING ACOUSTIC CHIME (Warm acoustic harp pluck + crystal bell)
// =========================================================================
function generateAcousticChime() {
  const duration = 1.9;
  const totalSamples = Math.floor(sampleRate * duration);
  const samples = new Float32Array(totalSamples);

  // Calming Pentatonic Ascent (D4, F#4, A4, B4, D5, F#5)
  const notes = [
    { f: 293.66, delay: 0.10, amp: 0.45, decay: 0.9 },
    { f: 369.99, delay: 0.25, amp: 0.48, decay: 1.0 },
    { f: 440.00, delay: 0.42, amp: 0.52, decay: 1.1 },
    { f: 493.88, delay: 0.58, amp: 0.55, decay: 1.2 },
    { f: 587.33, delay: 0.72, amp: 0.60, decay: 1.3 },
    { f: 739.99, delay: 0.85, amp: 0.45, decay: 1.4 }
  ];

  for (let i = 0; i < totalSamples; i++) {
    const t = i / sampleRate;
    let s = 0;

    for (const n of notes) {
      if (t >= n.delay) {
        const dt = t - n.delay;
        const attack = Math.min(1, dt / 0.015);
        const release = Math.exp(-dt / (n.decay * 0.4));
        const env = attack * release;
        const tone = Math.sin(2 * Math.PI * n.f * dt) + 0.12 * Math.sin(2 * Math.PI * n.f * 3 * dt);
        s += tone * env * n.amp;
      }
    }

    samples[i] = s * 0.8;
  }

  return samples;
}

// =========================================================================
// 3. ORGANIC STETHOSCOPE HEARTBEAT (Deep bass thuds + soothing ambient warm chord)
// =========================================================================
function generateOrganicHeartbeat() {
  const duration = 1.9;
  const totalSamples = Math.floor(sampleRate * duration);
  const samples = new Float32Array(totalSamples);

  for (let i = 0; i < totalSamples; i++) {
    const t = i / sampleRate;
    let s = 0;

    // Heartbeat Lub (t = 0.06s)
    if (t >= 0.06 && t <= 0.35) {
      const dt = t - 0.06;
      const env = Math.sin((dt / 0.29) * Math.PI);
      const f = 55 - (dt / 0.29) * 15;
      s += Math.sin(2 * Math.PI * f * dt) * env * 0.9;
    }

    // Heartbeat Dub (t = 0.32s)
    if (t >= 0.32 && t <= 0.65) {
      const dt = t - 0.32;
      const env = Math.sin((dt / 0.33) * Math.PI);
      const f = 62 - (dt / 0.33) * 18;
      s += Math.sin(2 * Math.PI * f * dt) * env * 1.0;
    }

    // Ambient Warm Pad (t = 0.55s)
    if (t >= 0.55) {
      const dt = t - 0.55;
      const env = Math.min(1, dt / 0.1) * Math.exp(-dt / 0.7);
      const pad = Math.sin(2 * Math.PI * 220 * dt) + Math.sin(2 * Math.PI * 277.18 * dt) + Math.sin(2 * Math.PI * 329.63 * dt);
      s += pad * env * 0.25;
    }

    samples[i] = s * 0.85;
  }

  return samples;
}

// =========================================================================
// 4. MODERN LUXURY SPARKLE CHIME (Apple/Modern Brand Signature Chord)
// =========================================================================
function generateModernSparkle() {
  const duration = 1.9;
  const totalSamples = Math.floor(sampleRate * duration);
  const samples = new Float32Array(totalSamples);

  // Sparkling Glass Chime (E Major 9th: E5, G#5, B5, D#6, F#6)
  const notes = [
    { f: 659.25, delay: 0.12, amp: 0.4 },
    { f: 830.61, delay: 0.22, amp: 0.45 },
    { f: 987.77, delay: 0.34, amp: 0.5 },
    { f: 1244.51, delay: 0.46, amp: 0.45 },
    { f: 1479.98, delay: 0.58, amp: 0.38 }
  ];

  for (let i = 0; i < totalSamples; i++) {
    const t = i / sampleRate;
    let s = 0;

    for (const n of notes) {
      if (t >= n.delay) {
        const dt = t - n.delay;
        const env = Math.min(1, dt / 0.01) * Math.exp(-dt / 0.5);
        s += Math.sin(2 * Math.PI * n.f * dt) * env * n.amp;
      }
    }

    samples[i] = s * 0.8;
  }

  return samples;
}

// Write files to public folder
const publicDir = path.join(__dirname, 'public');

const files = [
  { name: 'careconnect-chime.wav', samples: generateCinematicTaDum() },
  { name: 'careconnect-sound-cinematic.wav', samples: generateCinematicTaDum() },
  { name: 'careconnect-sound-acoustic.wav', samples: generateAcousticChime() },
  { name: 'careconnect-sound-heartbeat.wav', samples: generateOrganicHeartbeat() },
  { name: 'careconnect-sound-sparkle.wav', samples: generateModernSparkle() }
];

for (const file of files) {
  const wavBuf = createWavBuffer(file.samples, sampleRate);
  const dest = path.join(publicDir, file.name);
  fs.writeFileSync(dest, wavBuf);
  console.log(`Generated: ${dest} (${wavBuf.length} bytes)`);
}
