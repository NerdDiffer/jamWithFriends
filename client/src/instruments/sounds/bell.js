import { MetalSynth } from 'tone';

// Timbre (tone color)
const bell = new MetalSynth({
  harmonicity: 12,
  resonance: 800,
  modulationIndex: 20,
  envelope: {
    decay: 0.4,
  },
  volume: -15
}).toMaster();

export default bell;
