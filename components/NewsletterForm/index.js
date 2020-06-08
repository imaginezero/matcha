const mailchimpUrl =
  'https://imagine-zero.us10.list-manage.com/subscribe/post?u=470788f15c170e69d1a3ef0e5&amp;id=7b5132350f';

import {
  formWrapper,
  inputWrapper,
  paragraph,
  emailInput,
  hiddenField,
  submitButton,
} from './styles.module.css';

export function NewsletterForm() {
  return (
    <form action={mailchimpUrl} method="post" target="_blank">
      <div className={formWrapper}>
        <p className={paragraph}>
          Trag dich ein und erfahr, was du gegen die Klimakrise tun kannst:
        </p>
        <div className={inputWrapper}>
          <input
            type="email"
            defaultValue=""
            name="EMAIL"
            id="mce-EMAIL"
            placeholder="deine@adresse.de"
            autoComplete="off"
            required
            className={emailInput}
          />
          <input
            type="text"
            name="b_470788f15c170e69d1a3ef0e5_7b5132350f"
            tabIndex="-1"
            defaultValue=""
            className={hiddenField}
            aria-hidden="true"
          />
          <input
            type="submit"
            value="Eintragen"
            name="subscribe"
            className={submitButton}
          />
        </div>
      </div>
    </form>
  );
}
