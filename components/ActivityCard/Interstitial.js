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

  return (
    <>
      <H2>{`Gleich geht's in Richtung ${organization.title}...`}</H2>
      <p>{'Aber vorher brauchen wir deine Emailadresse! Wir fragen dich in einigen Wochen, wie\'s war und entscheiden dann, was wir in Zukunft empfehlen.'}</p>
      <p>{'Matcha ist gemeinnützig, niemand sonst bekommt deine Daten und wir verstehen etwas von IT-Sicherheit.'}</p>
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
      <p>{`Wir wollen dich zu nichts zwingen. Du kannst auch weiter, ohne uns zu helfen, Matcha nützlicher zu machen :`}</p>
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
