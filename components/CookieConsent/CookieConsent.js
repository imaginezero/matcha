import { useTranslation } from '../../hooks';

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
  const { t } = useTranslation();
  return (
    <Modal onClose={onClose}>
      <CookieConsentForm>
        <Markdown contents={t('cookieConsentText')} />
      </CookieConsentForm>
    </Modal>
  );
}
