import { useEffect, useState } from 'react';
import Link from 'next/link';

import { useEffort } from '../../hooks';

import { Content } from '../Content';
import { TypeMark } from '../Logo';

import Spinner from './Spinner';

import {
  headerWrapper,
  smallHeaderWrapper,
  headerContent,
  headerLogos,
  logo,
  typemark,
} from './Frame.module.css';

export default function Header() {
  const { getQuery } = useEffort();
  const [headerClassName, setHeaderClassName] = useState(headerWrapper);
  useEffect(() => {
    const handleScroll = () => {
      setHeaderClassName(
        window.scrollY < 1 ? headerWrapper : smallHeaderWrapper
      );
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  const href = { pathname: '/main', query: getQuery() };
  return (
    <div className={headerClassName}>
      <Content className={headerContent}>
        <header className={headerLogos}>
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
    </div>
  );
}
