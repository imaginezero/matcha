import { useTranslation } from '../../hooks';

import { Facebook, Instagram, Twitter } from '../Icon';

import { socialWrapper, socialIcon } from './Frame.module.css';

export default function SocialLinks() {
  const { t } = useTranslation();
  return (
    <div className={socialWrapper}>
      <a href="https://facebook.com/gomatcha.org" rel="noreferrer noopener">
        <Facebook className={socialIcon} title={t('visitFacebook')} />
      </a>
      <a href="https://instagram.com/gomatcha_org" rel="noreferrer noopener">
        <Instagram className={socialIcon} title={t('visitInstagram')} />
      </a>
      <a href="https://twitter.com/gomatcha_org" rel="noreferrer noopener">
        <Twitter className={socialIcon} title={t('visitTwitter')} />
      </a>
    </div>
  );
}
