import { MembraneSynth } from 'tone';

const tick = new MembraneSynth({
  envelope: {
    sustain: 0,
    attack: 0.02,
    decay: 0.8
  },
  octaves: 10
}).toMaster();

export default tick;
