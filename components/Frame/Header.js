import { useEffect, useState } from 'react';
import Link from 'next/link';

import { useRouter } from 'next/router';

import { useEffort, useTranslation } from '../../hooks';

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
  backLink,
} from './Frame.module.css';

function BackLink () {
  const { t } = useTranslation();
  return <span className={backLink}>{t('mainBackLink')}</span>
}

export default function Header() {
  const { pathname } = useRouter();
  const { getQuery } = useEffort();
  const { t } = useTranslation();
  const [headerClassName, setHeaderClassName] = useState(headerWrapper);
  useEffect(() => {
    const handleScroll = () => {
      window.requestAnimationFrame(() =>
        setHeaderClassName(
          window.scrollY < 5 ? headerWrapper : smallHeaderWrapper
        )
      );
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  //TODO This is a simple way of allowing 'back' navigation on activity pages.
  //     With activities and organizations, defining the meaning of 'back' is more complex.
  //     Consider all possible navigation paths, e.g.:
  //     - results > activity
  //     - results > activity > org
  //     - results > org
  //     - activity > org
  //     - org
  //     - org > activity > org
  
  const onDetailPage = pathname === '/activity/[slug]' || pathname === '/organization/[slug]';
  const href = { pathname: '/', query: getQuery() };

  return (
    <header className={headerClassName}>
      <Content className={headerContent}>
        <div className={headerLogos}>
          <div className={logo}>
            <Link href={href}>
              <a>
                {onDetailPage ? (
                  <BackLink />
                ) : (
                  <TypeMark className={typemark} title={t('mainPageLink')} />
                )}
              </a>
            </Link>
          </div>
          <div className={logo}>
            <Link href={href}>
              <a>
                <Spinner title={t('mainPageLink')} />
              </a>
            </Link>
          </div>
        </div>
      </Content>
    </header>
  );
}
