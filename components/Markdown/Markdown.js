import Link from 'next/link';
import { MDXProvider } from '@mdx-js/react';
import { useLogin, useTracking, useTranslation } from '../../hooks';

function LoginLink(props) {
  const { isLoggedIn } = useLogin();
  const { trackLogin, trackLogout } = useTracking();
  const { t } = useTranslation();
  return (
    <a
      {...props}
      href={`/api/auth/${isLoggedIn ? 'logout' : 'login'}`}
      onClick={(event) => {
        event.preventDefault();
        (isLoggedIn ? trackLogout : trackLogin)(event.target.href, true);
      }}
    >
      {`${t(isLoggedIn ? 'logout' : 'login')}`}
    </a>
  );
}

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
    if (href === '/api/auth/login') {
      return <LoginLink {...props} />;
    }
    if (/^[a-z]*:/.test(href)) {
      return (
        <a href={href} {...props}>
          {children}
        </a>
      );
    } else {
      return (
        <Link href={href}>
          <a {...props}>{children}</a>
        </Link>
      );
    }
  },
};

export default function Markdown({ children }) {
  return (
    <MDXProvider components={components}>
      <div className={markdown}>{children}</div>
    </MDXProvider>
  );
}
