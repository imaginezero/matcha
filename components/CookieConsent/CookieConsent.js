import { useTranslation } from '../../hooks';

import { Modal } from '../Modal';
import { Markdown } from '../Markdown';

import { button } from './CookieConsent.module.css';

function CookieConsentForm({ children, onConfirm }) {
  const { t } = useTranslation();
  return (
    <>
      {children}
      <a className={button} onClick={onConfirm}>
        {t('cookieConsentButton')}
      </a>
    </>
  );
}

export default function CookieConsent({ onConfirm }) {
  const { t } = useTranslation();
  return (
    <Modal canceable={false}>
      <CookieConsentForm onConfirm={onConfirm}>
        <Markdown contents={t('cookieConsentText')} />
      </CookieConsentForm>
    </Modal>
  );
}
