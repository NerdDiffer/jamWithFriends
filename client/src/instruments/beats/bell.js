import { MetalSynth, Sequence } from 'tone';

// Tone color (timbre)
const bell = new MetalSynth({
  harmonicity: 12,
  resonance: 800,
  modulationIndex: 20,
  envelope: {
    decay: 0.4,
  },
  volume: -15
}).toMaster();

// notes to play
const bellEvents = [
  300, null, 200, null, 200, 200, null, 200, null, 200, null, 200
];

const bellPart = new Sequence((time, freq) => {
  bell.frequency.setValueAtTime(freq, time);
  bell.triggerAttack(time);
}, bellEvents, '8t');

// bellPart.loop = true;
// bellPart.loopEnd = '1m';

export default bellPart;
