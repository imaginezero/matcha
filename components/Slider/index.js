import { useEffort } from '../../hooks';

import { slider } from './styles.module.css';

export function Slider() {
  const { effort, setEffort } = useEffort();
  return (
    <input
      type="range"
      min="10"
      max="100"
      step="10"
      value={effort}
      onChange={({ target: { value } }) => setEffort(value)}
      className={slider}
    />
  );
}
