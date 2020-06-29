import Head from 'next/head';

import { concatClassnames } from '../utilities';

import Header from './Header';
import Footer from './Footer';

import { mainWrapper } from './Page.module.css';

export default function Page({
  title,
  description,
  metaData,
  className,
  children,
  ...props
}) {
  const classNames = concatClassnames(mainWrapper, className);
  const ogData = { title, description, ...(metaData || {}) };
  return (
    <>
      <Head>
        <title>Matcha{title ? `: ${title}` : ''}</title>
        {description ? (
          <meta name="description" content={description} key="description" />
        ) : null}
        <meta property="og:site_name" content="Matcha" />
        {Object.entries(ogData).map(([key, value]) => {
          if (!value) return null;
          const ogKey = `og:${key}`;
          return <meta property={ogKey} content={value} key={ogKey} />;
        })}
      </Head>
      <Header />
      <main className={classNames} {...props}>
        {children}
      </main>
      <Footer />
    </>
  );
}
