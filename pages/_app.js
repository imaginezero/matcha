import { Frame, CookieConsent } from '../components';
import { withTracking, withLogin } from '../hooks';

import '../components/global.css';

export default withLogin(
  withTracking(function MatchaApp({ Component, pageProps }) {
    return (
      <Frame>
        <Component {...pageProps} />
      </Frame>
    );
  }, CookieConsent)
);

// export function reportWebVitals(params) {
//   withTracking.trackVitals(params);
// }
