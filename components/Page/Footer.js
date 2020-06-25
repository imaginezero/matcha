import { Content } from '../Content';
import { NewsletterForm } from '../NewsletterForm';

import { footerWrapper, footer } from './Page.module.css';

export default function Footer() {
  return (
    <footer className={footerWrapper}>
      <div className={footer}>
        <Content>
          <NewsletterForm />
        </Content>
      </div>
    </footer>
  );
}
