import { concatClassnames } from '../utilities';

import { wrapper } from './Content.module.css';

export default function Content({ children, className }) {
  const classNames = concatClassnames(wrapper, className);
  return <div className={classNames}>{children}</div>;
}
