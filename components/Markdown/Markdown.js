import Link from 'next/link';
import { MDXProvider } from '@mdx-js/react';

import { H1, H2, H3, H4 } from '../Typo';

import { markdown } from './Markdown.module.css';

const components = {
  h1({ children, ...props }) {
    return <H1 {...props}>{children}</H1>;
  },
  h2({ children, ...props }) {
    return <H2 {...props}>{children}</H2>;
  },
  h3({ children, ...props }) {
    return <H3 {...props}>{children}</H3>;
  },
  h4({ children, ...props }) {
    return <H4 {...props}>{children}</H4>;
  },
  hr({ children }) {
    return <>{children}</>;
  },
  a: function MarkdownLink({ href, children, ...props }) {
    return /^[a-z]*:/.test(href) ? (
      <a href={href} {...props}>
        {children}
      </a>
    ) : (
      <Link href={href}>
        <a {...props}>{children}</a>
      </Link>
    );
  },
};

export default function Markdown({ children }) {
  return (
    <MDXProvider components={components}>
      <div className={markdown}>{children}</div>
    </MDXProvider>
  );
}
