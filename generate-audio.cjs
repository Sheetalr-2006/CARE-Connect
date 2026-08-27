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
    const s = Math.max(-0.95, Math.min(0.95, samples[i]));
    const intVal = Math.floor(s * 32767);
    buffer.writeInt16LE(intVal, offset);
    offset += 2;
    buffer.writeInt16LE(intVal, offset);
    offset += 2;
  }

  return buffer;
}

// =========================================================================
// 1. PEACEFUL SANCTUARY BELL (Ultra-Pleasant, Gentle Warm Bell & Singing Bowl)
// =========================================================================
function generatePeacefulSanctuary() {
  const duration = 2.2;
  const totalSamples = Math.floor(sampleRate * duration);
  const samples = new Float32Array(totalSamples);

  // Soothing Warm Harmony: C4 (261.6Hz), E4 (329.6Hz), G4 (392Hz), B4 (493.9Hz), D5 (587.3Hz)
  const notes = [
    { f: 261.63, delay: 0.12, amp: 0.32, decay: 1.6, attack: 0.18 }, // Soft C4 base
    { f: 329.63, delay: 0.28, amp: 0.28, decay: 1.5, attack: 0.15 }, // Warm E4
    { f: 392.00, delay: 0.44, amp: 0.26, decay: 1.4, attack: 0.14 }, // Gentle G4
    { f: 523.25, delay: 0.60, amp: 0.22, decay: 1.3, attack: 0.12 }, // Pure C5
    { f: 659.25, delay: 0.74, amp: 0.16, decay: 1.2, attack: 0.10 }  // Soft E5 shimmer
  ];

  for (let i = 0; i < totalSamples; i++) {
    const t = i / sampleRate;
    let s = 0;

    // Very soft, gentle warm ambient hum (no harsh thumps)
    if (t <= 1.2) {
      const humEnv = Math.sin((t / 1.2) * Math.PI);
      s += (Math.sin(2 * Math.PI * 130.81 * t) + Math.sin(2 * Math.PI * 196.0 * t) * 0.5) * humEnv * 0.14;
    }

    // Melodic gentle bells with slow, rounded attack
    for (const n of notes) {
      if (t >= n.delay) {
        const dt = t - n.delay;
        // Smooth sine attack (never clicks or punches)
        const attack = Math.min(1, dt / n.attack);
        const release = Math.exp(-dt / (n.decay * 0.55));
        const env = attack * release;
        
        // Pure sinusoidal tone with mellow warm overtone
        const tone = Math.sin(2 * Math.PI * n.f * dt) + 0.08 * Math.sin(2 * Math.PI * n.f * 2 * dt);
        s += tone * env * n.amp;
      }
    }

    samples[i] = s * 0.70;
  }

  return samples;
}

// =========================================================================
// 2. GENTLE MORNING HARP (Delicate, Calming Acoustic String Roll)
// =========================================================================
function generateGentleMorningHarp() {
  const duration = 2.2;
  const totalSamples = Math.floor(sampleRate * duration);
  const samples = new Float32Array(totalSamples);

  // Soft pentatonic acoustic harp: G3, B3, D4, G4, B4, D5
  const harpNotes = [
    { f: 196.00, delay: 0.10, amp: 0.35, decay: 1.5, attack: 0.08 },
    { f: 246.94, delay: 0.24, amp: 0.32, decay: 1.4, attack: 0.08 },
    { f: 293.66, delay: 0.38, amp: 0.30, decay: 1.3, attack: 0.07 },
    { f: 392.00, delay: 0.52, amp: 0.28, decay: 1.3, attack: 0.07 },
    { f: 493.88, delay: 0.66, amp: 0.25, decay: 1.2, attack: 0.06 },
    { f: 587.33, delay: 0.80, amp: 0.20, decay: 1.1, attack: 0.06 }
  ];

  for (let i = 0; i < totalSamples; i++) {
    const t = i / sampleRate;
    let s = 0;

    for (const n of harpNotes) {
      if (t >= n.delay) {
        const dt = t - n.delay;
        const attack = Math.min(1, dt / n.attack);
        const release = Math.exp(-dt / (n.decay * 0.45));
        const env = attack * release;
        const tone = Math.sin(2 * Math.PI * n.f * dt) + 0.1 * Math.sin(2 * Math.PI * n.f * 2 * dt);
        s += tone * env * n.amp;
      }
    }

    samples[i] = s * 0.65;
  }

  return samples;
}

// =========================================================================
// 3. WARM FELT PIANO BLOOM (Cozy, Reassuring Warm Acoustic Chord)
// =========================================================================
function generateWarmFeltPiano() {
  const duration = 2.2;
  const totalSamples = Math.floor(sampleRate * duration);
  const samples = new Float32Array(totalSamples);

  // Warm F-Major-7 chord: F3, A3, C4, E4, A4
  const pianoNotes = [
    { f: 174.61, delay: 0.15, amp: 0.38, decay: 1.7, attack: 0.12 },
    { f: 220.00, delay: 0.18, amp: 0.35, decay: 1.6, attack: 0.10 },
    { f: 261.63, delay: 0.22, amp: 0.32, decay: 1.5, attack: 0.10 },
    { f: 329.63, delay: 0.26, amp: 0.30, decay: 1.4, attack: 0.09 },
    { f: 440.00, delay: 0.30, amp: 0.24, decay: 1.3, attack: 0.08 }
  ];

  for (let i = 0; i < totalSamples; i++) {
    const t = i / sampleRate;
    let s = 0;

    for (const n of pianoNotes) {
      if (t >= n.delay) {
        const dt = t - n.delay;
        const attack = Math.min(1, dt / n.attack);
        const release = Math.exp(-dt / (n.decay * 0.5));
        const env = attack * release;
        
        // Soft rounded piano harmonic
        const tone = Math.sin(2 * Math.PI * n.f * dt) + 
                     0.15 * Math.sin(2 * Math.PI * n.f * 2 * dt) + 
                     0.04 * Math.sin(2 * Math.PI * n.f * 3 * dt);
        s += tone * env * n.amp;
      }
    }

    samples[i] = s * 0.68;
  }

  return samples;
}

// =========================================================================
// 4. ZEN HARMONIC CHIMES (Tranquil, Soothing Wind Chime Resonance)
// =========================================================================
function generateZenHarmonic() {
  const duration = 2.2;
  const totalSamples = Math.floor(sampleRate * duration);
  const samples = new Float32Array(totalSamples);

  // Golden ratio calming frequencies: A4 (432Hz healing pitch base), C#5, E5, A5
  const chimes = [
    { f: 432.00, delay: 0.15, amp: 0.35, decay: 1.5, attack: 0.10 },
    { f: 544.29, delay: 0.35, amp: 0.32, decay: 1.4, attack: 0.09 },
    { f: 647.27, delay: 0.55, amp: 0.28, decay: 1.3, attack: 0.08 },
    { f: 864.00, delay: 0.72, amp: 0.20, decay: 1.1, attack: 0.07 }
  ];

  for (let i = 0; i < totalSamples; i++) {
    const t = i / sampleRate;
    let s = 0;

    for (const n of chimes) {
      if (t >= n.delay) {
        const dt = t - n.delay;
        const attack = Math.min(1, dt / n.attack);
        const release = Math.exp(-dt / (n.decay * 0.45));
        const env = attack * release;
        const tone = Math.sin(2 * Math.PI * n.f * dt);
        s += tone * env * n.amp;
      }
    }

    samples[i] = s * 0.60;
  }

  return samples;
}

// Write files to public folder
const publicDir = path.join(__dirname, 'public');

const files = [
  { name: 'careconnect-chime.wav', samples: generateGentleMorningHarp() },
  { name: 'careconnect-sound-harp.wav', samples: generateGentleMorningHarp() },
  { name: 'careconnect-sound-sanctuary.wav', samples: generatePeacefulSanctuary() },
  { name: 'careconnect-sound-piano.wav', samples: generateWarmFeltPiano() },
  { name: 'careconnect-sound-zen.wav', samples: generateZenHarmonic() }
];

for (const file of files) {
  const wavBuf = createWavBuffer(file.samples, sampleRate);
  const dest = path.join(publicDir, file.name);
  fs.writeFileSync(dest, wavBuf);
  console.log(`Generated Pleasant Senior Sound: ${dest} (${wavBuf.length} bytes)`);
}
