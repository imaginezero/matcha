import { checkboxWrapper, checkbox, label } from './Checkbox.module.css';

export default function Checkbox({ id, checked, onChange }) {
  return (
    <div className={checkboxWrapper}>
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={onChange}
        className={checkbox}
      />
      <label htmlFor={id} className={label}>
        {id}
      </label>
    </div>
  );
}
