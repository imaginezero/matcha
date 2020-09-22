import { concatClassnames } from '../utilities';

import { h1, h2, h3, h4, narrow, muted } from './Typo.module.css';

export function H1({ children, className, narrow: isNarrow = false, ...props }) {
  const classNames = concatClassnames(h1, isNarrow && narrow, className);
  return (
    <h1 className={classNames} {...props}>
      <span>{children}</span>
    </h1>
  );
}

export function H2({ children, className, narrow: isNarrow = false, ...props }) {
  const classNames = concatClassnames(h2, isNarrow && narrow, className);
  return (
    <h2 className={classNames} {...props}>
      <span>{children}</span>
    </h2>
  );
}

export function H3({ children, className, ...props }) {
  const classNames = concatClassnames(h3, className);
  return (
    <h3 className={classNames} {...props}>
      <span>{children}</span>
    </h3>
  );
}

export function H4({ children, className, ...props }) {
  const classNames = concatClassnames(h4, className);
  return (
    <h4 className={classNames} {...props}>
      {children}
    </h4>
  );
}

export function Muted({ className, ...props }) {
  const classNames = concatClassnames(muted, className);
  return <div className={classNames} {...props} />;
}
