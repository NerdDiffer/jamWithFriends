import { Loop } from 'tone';
import { membrane, metal } from '../sounds/tick';

const membranePart = new Loop(time => (
  membrane.triggerAttackRelease('Bb5', '8n'))
);

const metalPart = new Loop(time => {
  const duration = 100;
  return metal.triggerAttackRelease(duration, time);
});

export default membranePart;
