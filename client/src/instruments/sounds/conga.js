import { MembraneSynth } from 'tone';

// Timbre (tone color)
const conga = new MembraneSynth({
  pitchDecay: 0.008,
  octaves: 2,
  envelope: {
    attack: 0.0006,
    decay: 0.5,
    sustain: 0
  }
}).toMaster();

export default conga;
