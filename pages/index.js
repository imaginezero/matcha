import Head from 'next/head';

import { ComboMark, NewsletterForm } from '../components';

function HomePage() {
  return (
    <>
      <Head>
        <title>Matcha kommt!</title>
      </Head>
      <div>
        <ComboMark
          style={{ display: 'block', margin: '5em auto 2.5em' }}
          width="250"
        />
      </div>
      <NewsletterForm />
    </>
  );
}

HomePage.noFrame = true;

export default HomePage;
