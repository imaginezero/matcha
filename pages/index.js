import { Fragment } from 'react';
import Head from 'next/head';

import { Logo } from '../components';

export default function HomePage() {
  return (
    <Fragment>
      <Head>
        <title>Matcha: Coming Soon!</title>
      </Head>
      <div>
        <Logo style={{ display: 'block', margin: '5em auto' }} width="250" />
      </div>
    </Fragment>
  );
}
