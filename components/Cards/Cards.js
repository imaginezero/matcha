import { concatClassnames } from '../utilities';

import styles from './Cards.module.css';

export default function Cards({
  height = 'normal',
  children,
  className,
  ...props
}) {
  const classNames = concatClassnames(styles[height], className);
  return (
    <div className={classNames} {...props}>
      {children}
    </div>
  );
}
