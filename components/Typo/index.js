import { concatClassnames } from '../utilities';

import { headline, subline, explanation } from './Typo.module.css';

export function Headline({ children, className, ...props }) {
  const classNames = concatClassnames(headline, className);
  return (
    <h1 className={classNames} {...props}>
      <span>{children}</span>
    </h1>
  );
}

export function Subline({ className, ...props }) {
  const classNames = concatClassnames(subline, className);
  return <p className={classNames} {...props} />;
}

export function Explanation({ className, ...props }) {
  const classNames = concatClassnames(explanation, className);
  return <p className={classNames} {...props} />;
}
