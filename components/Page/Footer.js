import { Content } from '../Content';
import { NewsletterForm } from '../NewsletterForm';
import { Explanation } from '../Typo';
import { AssociationMark } from '../Logo';

import {
  footerWrapper,
  newsletter,
  compliance,
  content,
  imprint,
  association,
  associationMark,
} from './Page.module.css';

export default function Footer() {
  return (
    <footer className={footerWrapper}>
      <div className={newsletter}>
        <Content>
          <NewsletterForm />
        </Content>
      </div>
      <div className={compliance}>
        <Content className={content}>
          <Explanation className={imprint}>
            <a href="https://gomatcha.org">
              <b>Matcha</b>
            </a>{' '}
            ist ein Projekt von:
            <br />
            <br />
            <a href="https://imagine-zero.org/">
              <b>ImagineZero e.V.</b>
            </a>
            <br />
            Seilerstraße 38a
            <br />
            20359 Hamburg
            <br />
            <br />
            Telefon: <a href="tel:004917647611161">+49 (0)176 / 47611161</a>
            <br />
            E-Mail: <a href="mailto:hi@gomatcha.org">hi@gomatcha.org</a>
            <br />
            <br />
            Geschäftsführender Vorstand​: Andre Reichel
            <br />
            Registereintrag: ImagineZero e.V. ist im Vereinsregister des
            Amtsgerichtes Hamburg eingetragen.
          </Explanation>
          <div className={association}>
            <Explanation>
              <a href="https://imagine-zero.org/">
                <AssociationMark className={associationMark} />
              </a>
            </Explanation>
          </div>
        </Content>
      </div>
    </footer>
  );
}
