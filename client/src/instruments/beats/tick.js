import { Loop } from 'tone';
import tick from '../sounds/tick';

const tickPart = new Loop(time => tick.triggerAttackRelease('C2', '8n', time));

export default tickPart;
