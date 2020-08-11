import Head from 'next/head';

import { getAbsoluteUrl } from '../utilities';

export default function Page({
  title,
  description,
  image = 'share-preview.jpg',
  children,
}) {
  const imageUrl = getAbsoluteUrl(image);
  return (
    <>
      <Head>
        {/* Web / Google */}
        <title>{title ? `Matcha: ${title}` : 'Matcha'}</title>
        {description ? <meta name="description" content={description} /> : null}

        {/* Facebook / OpenGraph */}
        <meta property="og:site_name" content="Matcha" key="og:site_name" />
        {title ? (
          <meta property="og:title" content={title} key="og:title" />
        ) : null}
        {description ? (
          <meta
            property="og:description"
            content={description}
            key="og:description"
          />
        ) : null}
        <meta property="og:image:url" content={imageUrl} key="og:image:url" />
        <meta property="og:image:width" content="900" key="og:image:width" />
        <meta property="og:image:height" content="600" key="og:image:height" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="@gomatcha_org" />
        {title ? <meta name="twitter:title" content={title} /> : null}
        {description ? (
          <meta name="twitter:description" content={description} />
        ) : null}
        <meta name="twitter:image" content={imageUrl} />
      </Head>
      {children}
    </>
  );
}
