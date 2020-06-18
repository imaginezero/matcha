import { withLogin } from '../hooks';

import './global.css';

export default withLogin(function CustomApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
});
