import { useState } from 'react';

import {
  useTracking,
  useTranslation,
  saveEmailEntered,
} from '../../hooks';

import { H2 } from '../Typo';

import { inputWrapper, text, button } from './Interstitial.module.css';

export default function Interstitial({ organization, link, slug, close }) {
  const { t } = useTranslation();
  const { trackOutboundLink } = useTracking();
  const params = new URLSearchParams({ redirectTo: `/activity/${slug}` });

  const [valid, setValid] = useState(false);

  const updateButtonState = e => setValid(!e.target.validity.typeMismatch);

  const onSubmit = () => {
    trackOutboundLink(link, false);
    saveEmailEntered();
    close();
  }

  // TODO clean up interstitial* in Contentful

  return (
    <>
      <H2>{t('interstitialHeadline2', {organization: organization.title})}</H2>
      <p>{t('interstitialDescriptionLine1')}</p>
      <p>{t('interstitialDescriptionLine2')}</p>
      <form
        onSubmit={onSubmit}
        action="/api/clickout"
        method="post"
        target="_blank">
          <input type="hidden" name="target" value={link}/>
        <p className={inputWrapper}>
          <input
            type="email"
            name="email"
            onChange={updateButtonState}
            className={text}/>
          <input
            type="submit"
            name="submit"
            disabled={!valid}
            className={button}
            value={'Los'}
        />
        </p>
      </form>
      <p>{t('interstitialDirectDescription')}</p>
      <a
        href={link}
        target="_blank"
        rel="noopener"
        onClick={(event) => {
          event.preventDefault();
          trackOutboundLink(link, true, '_blank');
          close();
        }}
      >
        {t('interstitialDirectLink')}
      </a>
    </>
  );
}
