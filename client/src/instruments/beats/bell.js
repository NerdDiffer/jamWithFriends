import { Sequence } from 'tone';
import bell from '../sounds/bell';

// notes & rhythms to play
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
