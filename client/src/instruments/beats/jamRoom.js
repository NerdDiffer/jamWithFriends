import toneSequence from './sequence';
import beatSounds from '../sounds/tick';

const { bell, conga, membrane, metal } = beatSounds;

const bellEvents = [
  300, null, 200, null, 200, 200, null, 200, null, 200, null, 200
];
const congaEvents = [['G3', 'Bb4', 'D3'], ['Bb4', 'D3', 'F3']];
const membraneEvents = [1, 1, 1, 1];
const metalEvents = [0, 1, 0, 1];

const bellBeat = toneSequence({ tone: 200, def: bell }, bellEvents, '8t');
const congaBeat = toneSequence({ tone: 200, def: conga }, congaEvents, '2n');
const membraneBeat = toneSequence({ tone: 'Bb5', def: membrane }, membraneEvents, '8n');
const metalBeat = toneSequence({ tone: 200, def: metal }, metalEvents, '4n');

export default [
  bellBeat,
  congaBeat,
  membraneBeat,
  metalBeat
];
