import { useTranslation } from '../../hooks';

import CookieConsentContent from '../../contents/cookies.md';

import { Modal } from '../Modal';
import { Markdown } from '../Markdown';

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
  return (
    <Modal onClose={onClose}>
      <CookieConsentForm>
        <Markdown>
          <CookieConsentContent />
        </Markdown>
      </CookieConsentForm>
    </Modal>
  );
}
