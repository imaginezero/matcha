import Link from 'next/link';

import { Content } from '../Content';
import { TypeMark } from '../Logo';

import Spinner from './Spinner';

import {
  headerWrapper,
  headerContent,
  logo,
  typemark,
} from './Frame.module.css';

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
              <Spinner />
            </a>
          </Link>
        </div>
      </header>
    </Content>
  );
}
