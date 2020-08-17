import { useRouter } from 'next/router';

import { useTranslation, useTracking } from '../../hooks';

import { getAbsoluteUrl } from '../utilities';

import { Content } from '../Content';
import { H3 } from '../Typo';
import { Facebook, Mail, Telegram, Twitter, WhatsApp } from '../Icon';

import { shareWrapper, shareLink } from './ShareCard.module.css';

export default function Share() {
  const { asPath } = useRouter();
  const { t } = useTranslation();
  const { trackShareLink } = useTracking();
  const url = getAbsoluteUrl(asPath);
  const encodedUrl = encodeURIComponent(url);
  const encodedText = encodeURIComponent(t('shareText', { url }));
  return (
    <Content>
      <H3>{t('shareHeadline')}</H3>
      <div className={shareWrapper}>
        <a
          href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
          onClick={() => trackShareLink('Facebook')}
          rel="noreferrer noopener"
          target="_blank"
        >
          <Facebook title={t('shareFacebook')} className={shareLink} />
        </a>
        <a
          href={`https://twitter.com/intent/tweet?url=${encodedUrl}`}
          onClick={() => trackShareLink('Twitter')}
          rel="noreferrer noopener"
          target="_blank"
        >
          <Twitter title={t('shareTwitter')} className={shareLink} />
        </a>
        <a
          href={`https://wa.me/?text=${encodedText}`}
          onClick={() => trackShareLink('WhatsApp')}
          rel="noreferrer noopener"
          target="_blank"
        >
          <WhatsApp title={t('shareWhatsApp')} className={shareLink} />
        </a>
        <a
          href={`https://t.me/share/url?url=${encodedUrl}`}
          onClick={() => trackShareLink('Twitter')}
          rel="noreferrer noopener"
          target="_blank"
        >
          <Telegram title={t('shareTelegram')} className={shareLink} />
        </a>
        <a
          href={`mailto:?body=${encodedText}`}
          onClick={() => trackShareLink('Email')}
          rel="noreferrer noopener"
          target="_blank"
        >
          <Mail title={t('shareMail')} className={shareLink} />
        </a>
      </div>
    </Content>
  );
}
