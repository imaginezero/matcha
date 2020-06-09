import { useEffort } from '../../hooks';

export function Slider() {
  const { effort, setEffort } = useEffort();
  return (
    <input
      type="range"
      min="0"
      max="90"
      step="1"
      value={effort}
      onChange={({ target: { value } }) => setEffort(value)}
    />
  );
}
