import Header from './Header';
import Footer from './Footer';

import { mainWrapper } from './Page.module.css';

export default function Page({ children }) {
  return (
    <>
      <Header />
      <main className={mainWrapper}>{children}</main>
      <Footer />
    </>
  );
}
