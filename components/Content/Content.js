import { concatClassnames } from '../utilities';

import { wrapper } from './Content.module.css';

export default function Content({ children, className, ...props }) {
  const classNames = concatClassnames(wrapper, className);
  return (
    <div className={classNames} {...props}>
      {children}
    </div>
  );
}
