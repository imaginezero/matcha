import { withEffort, withLoading } from '../../hooks';

import Header from './Header';
import Footer from './Footer';

import { pageWrapper, mainWrapper } from './Frame.module.css';

export default withEffort(
  withLoading(function Frame({ children, ...props }) {
    return (
      <div className={pageWrapper}>
        <Header />
        <main className={mainWrapper} {...props}>
          {children}
        </main>
        <Footer />
      </div>
    );
  })
);
