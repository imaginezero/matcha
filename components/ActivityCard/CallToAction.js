import { useState } from 'react';

import { useLogin, useCapture, useTracking, useTranslation } from '../../hooks';

import { Modal } from '../Modal';
import { H2 } from '../Typo';

import { button, interstitialButton } from './ActivityCard.module.css';

function Interstitial({ link, slug, close }) {
  const { t } = useTranslation();
  const { trackLogin, trackOutboundLink } = useTracking();
  const params = new URLSearchParams({ redirectTo: `/activity/${slug}` });
  return (
    <>
      <H2>{t('interstitialHeadline')}</H2>
      <p>{t('interstitialDescription')}</p>
      <a
        href={`/api/auth/login?${params.toString()}`}
        onClick={(event) => {
          event.preventDefault();
          trackLogin(event.target.href, true);
        }}
        className={interstitialButton}
      >
        {`${t('login')}`}
      </a>
      <a
        href={link}
        target="_blank"
        rel="noreferrer noopener"
        onClick={() => {
          trackOutboundLink(link);
          close();
        }}
      >
        {t('interstitialDirectLink')}
      </a>
    </>
  );
}

function LoggedOutButton(props) {
  const { label } = props;
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <a className={button} onClick={() => setIsOpen(true)}>
        {label}
      </a>
      {isOpen ? (
        <Modal onClose={() => setIsOpen(false)}>
          <Interstitial {...props} />
        </Modal>
      ) : null}
    </>
  );
}

function LoggedInButton({ link, label, slug }) {
  const { trackOutboundLink } = useTracking();
  const { captureOutboundLink } = useCapture();
  return (
    <a
      className={button}
      href={link}
      target="_blank"
      rel="noreferrer noopener"
      onClick={() => {
        trackOutboundLink(link);
        captureOutboundLink(slug, link);
      }}
    >
      {label}
    </a>
  );
}

export default function CallToAction(props) {
  const { isLoggedIn } = useLogin();
  return isLoggedIn ? (
    <LoggedInButton {...props} />
  ) : (
    <LoggedOutButton {...props} />
  );
}
