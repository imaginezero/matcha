import { headline, subline, explanation } from './styles.module.css';

export function Headline({ children, ...props }) {
  return (
    <h1 {...props} className={headline}>
      <span>{children}</span>
    </h1>
  );
}

export function Subline(props) {
  return <p className={subline} {...props} />;
}

export function Explanation(props) {
  return <p className={explanation} {...props} />;
}
