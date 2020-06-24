import { useEffort } from '../../hooks';

import { slider } from './Slider.module.css';

export default function Slider() {
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
