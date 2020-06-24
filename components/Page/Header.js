import Link from 'next/link';

import { TypeMark, LogoMark } from '../Logo';

import { headerWrapper, logo, typemark, logomark } from './Page.module.css';

export default function Header() {
  return (
    <header className={headerWrapper}>
      <div className={logo}>
        <Link href="/main">
          <a>
            <TypeMark className={typemark} />
          </a>
        </Link>
      </div>
      <div className={logo}>
        <Link href="/main">
          <a>
            <LogoMark className={logomark} />
          </a>
        </Link>
      </div>
    </header>
  );
}
