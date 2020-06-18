import { NewsletterForm } from '../NewsletterForm';

import { footer } from './styles.module.css';

export function Footer() {
  return (
    <div className={footer}>
      <NewsletterForm />
    </div>
  );
}
