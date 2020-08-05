import { concatClassnames } from '../utilities';

import { cards } from './Cards.module.css';

export default function Cards({ children, className, ...props }) {
  const classNames = concatClassnames(cards, className);
  return (
    <div className={classNames} {...props}>
      {children}
    </div>
  );
}
