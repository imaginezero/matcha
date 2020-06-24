import { NewsletterForm } from '../NewsletterForm';

import { footerWrapper, footer } from './Page.module.css';

export default function Footer() {
  return (
    <footer className={footerWrapper}>
      <div className={footer}>
        <NewsletterForm />
      </div>
    </footer>
  );
}
