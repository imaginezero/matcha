import { Content } from '../Content';
import { Markdown } from '../Markdown';
import { AssociationMark } from '../Logo';

import MenuContent from '../../contents/menu.md';

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
  return (
    <footer className={footerWrapper}>
      <div className={compliance}>
        <Content className={content}>
          <div className={menu}>
            <Markdown>
              <MenuContent />
            </Markdown>
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
