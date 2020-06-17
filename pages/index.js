import { Fragment } from 'react';
import Head from 'next/head';

import { Combomark, NewsletterForm } from '../components';

export default function HomePage() {
  return (
    <Fragment>
      <Head>
        <title>Matcha kommt!</title>
      </Head>
      <div>
        <Combomark
          style={{ display: 'block', margin: '5em auto 0' }}
          width="250"
        />
      </div>
      <NewsletterForm />
    </Fragment>
  );
}
