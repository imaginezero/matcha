import { useEffort } from '../../hooks';

export function Slider() {
  const { effort, setEffort } = useEffort();
  return (
    <input
      type="range"
      min="10"
      max="100"
      step="1"
      value={effort}
      onChange={({ target: { value } }) => setEffort(value)}
    />
  );
}
