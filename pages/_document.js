import Document, { Html, Head, Main, NextScript } from 'next/document';

import { withTranslation } from '../hooks';

class MatchaDocument extends Document {
  static async getInitialProps(ctx) {
    const trackingId = process.env.GA_MEASUREMENT_ID;
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps, trackingId };
  }
  render() {
    const { t, trackingId } = this.props;
    return (
      <Html lang={t('lang')}>
        <Head>
          <meta property="og:locale" content={t('locale')} />
          <link
            rel="apple-touch-icon"
            sizes="120x120"
            href="/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/favicon-16x16.png"
          />
          <link rel="manifest" href="/site.webmanifest" />
          <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#72286f" />
          <meta name="msapplication-TileColor" content="#9f00a7" />
          <meta name="theme-color" content="#ffffff" />
          <meta name="robots" content="index, follow" />
        </Head>
        <body>
          <Main />
          <NextScript />
          {trackingId ? (
            <>
              <script
                async
                src={`https://www.googletagmanager.com/gtag/js?id=${trackingId}`}
              />
              <script
                dangerouslySetInnerHTML={{
                  __html: `window.gaId = "${trackingId}";window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);} gtag('js', new Date());`,
                }}
              />
            </>
          ) : null}
        </body>
      </Html>
    );
  }
}

export default withTranslation(MatchaDocument);
