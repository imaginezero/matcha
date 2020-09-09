import parse from 'snarkdown';

import { useTranslation } from '../../hooks';

import { Modal } from '../Modal';

import { button } from './CookieConsent.module.css';

function CookieConsentForm({ children, close }) {
  const { t } = useTranslation();
  return (
    <>
      {children}
      <a className={button} onClick={close}>
        {t('cookieConsentButton')}
      </a>
    </>
  );
}

export default function CookieConsent({ onClose }) {
  const { t } = useTranslation();
  return (
    <Modal onClose={onClose}>
      <CookieConsentForm>
        <div
          dangerouslySetInnerHTML={{ __html: parse(t('cookieConsentText')) }}
        />
      </CookieConsentForm>
    </Modal>
  );
}
