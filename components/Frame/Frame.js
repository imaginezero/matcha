import { withEffort, withLoading } from '../../hooks';

import Header from './Header';
import Footer from './Footer';

import { mainWrapper } from './Frame.module.css';

export default withEffort(
  withLoading(function Frame({ children, ...props }) {
    return (
      <>
        <Header />
        <main className={mainWrapper} {...props}>
          {children}
        </main>
        <Footer />
      </>
    );
  })
);
