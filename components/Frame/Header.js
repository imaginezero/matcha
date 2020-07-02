import Link from 'next/link';

import { useEffort } from '../../hooks';

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
  const { getQuery } = useEffort();
  const href = { pathname: '/main', query: getQuery() };
  return (
    <Content className={headerContent}>
      <header className={headerWrapper}>
        <div className={logo}>
          <Link href={href}>
            <a>
              <TypeMark className={typemark} />
            </a>
          </Link>
        </div>
        <div className={logo}>
          <Link href={href}>
            <a>
              <Spinner />
            </a>
          </Link>
        </div>
      </header>
    </Content>
  );
}
