import { Frame } from '../components';
import { withTracking, withLogin } from '../hooks';

import './global.css';

export default withLogin(
  withTracking(function MatchaApp({ Component, pageProps }) {
    if (Component.noFrame) {
      return <Component {...pageProps} />;
    } else {
      return (
        <Frame>
          <Component {...pageProps} />
        </Frame>
      );
    }
  })
);

export function reportWebVitals(params) {
  withTracking.trackVitals(params);
}
