import { useTranslation } from '../../hooks';

import { Content } from '../Content';
import { AssociationMark } from '../Logo';
import { Markdown } from '../Markdown';

import SocialLinks from './SocialLinks';

import {
  footerWrapper,
  compliance,
  content,
  menu,
  social,
  association,
  associationMark,
} from './Frame.module.css';

export default function Footer() {
  const { t } = useTranslation();
  return (
    <footer className={footerWrapper}>
      <div className={compliance}>
        <Content className={content}>
          <div className={menu}>
            <Markdown contents={t('mainMenu')} />
          </div>
          <div className={social}>
            <SocialLinks />
          </div>
          <div className={association}>
            <a href="https://imagine-zero.org/">
              <AssociationMark className={associationMark} />
            </a>
          </div>
        </Content>
      </div>
    </footer>
  );
}
