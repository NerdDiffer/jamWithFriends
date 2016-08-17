import { Sequence } from 'tone';
import conga from '../sounds/conga';

// notes & rhythms to play
const congaEvents = [['G3', 'Bb4', 'D3'], ['Bb4', 'D3', 'F3']];

const congaPart = new Sequence((time, pitch) => {
  conga.triggerAttack(pitch, time);
}, congaEvents, '2n');

// congaPart.loop = true;
// congaPart.loopEnd = '1m';

export default congaPart;
