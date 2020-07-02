import Head from 'next/head';

export default function Page({ title, description, metaData, children }) {
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
      {children}
    </>
  );
}
