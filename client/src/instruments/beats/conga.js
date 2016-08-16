import { MembraneSynth, Sequence } from 'tone';

// Tone color (timbre)
const conga = new MembraneSynth({
  pitchDecay: 0.008,
  octaves: 2,
  envelope: {
    attack: 0.0006,
    decay: 0.5,
    sustain: 0
  }
}).toMaster();

// notes to play
const congaEvents = [['G3', 'Bb4', 'D3'], ['Bb4', 'D3', 'F3']];

const congaPart = new Sequence((time, pitch) => {
  conga.triggerAttack(pitch, time);
}, congaEvents, '2n');

// congaPart.loop = true;
// congaPart.loopEnd = '1m';

export default congaPart;
