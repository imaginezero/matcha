import Link from 'next/link';

import { Content } from '../Content';
import { TypeMark, LogoMark } from '../Logo';

import {
  headerWrapper,
  headerContent,
  logo,
  typemark,
  logomark,
} from './Page.module.css';

export default function Header() {
  return (
    <Content className={headerContent}>
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
    </Content>
  );
}
