import Link from 'next/link';
import { MDXProvider } from '@mdx-js/react';

import { Headline, Subline } from '../Typo';

import { markdown, headline, subline } from './Markdown.module.css';

const components = {
  h1: function MarkdownHeadline({ children }) {
    return <Headline className={headline}>{children}</Headline>;
  },
  h2: function MarkdownSubline({ children }) {
    return <Subline className={subline}>{children}</Subline>;
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
