import Link from 'next/link';

import { Typemark, Logomark } from '../Logo';

import {
  headerWrapper,
  mainWrapper,
  footerWrapper,
  typemark,
  logomark,
  logo,
} from './styles.module.css';

export function Page({ children }) {
  return (
    <>
      <header className={headerWrapper}>
        <div className={logo}>
          <Link href="/main">
            <a>
              <Typemark className={typemark} />
            </a>
          </Link>
        </div>
        <div className={logo}>
          <Link href="/main">
            <a>
              <Logomark className={logomark} />
            </a>
          </Link>
        </div>
      </header>
      <main className={mainWrapper}>{children}</main>
      <footer className={footerWrapper}></footer>
    </>
  );
}
