import { useEffort } from '../../hooks';

export function Slider() {
  const { effort, setEffort } = useEffort();
  return (
    <input
      type="range"
      min="1"
      max="90"
      step="1"
      defaultValue={effort}
      onChange={({ target: { value } }) => setEffort(value)}
    />
  );
}
