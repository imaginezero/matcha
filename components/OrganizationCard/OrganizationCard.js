import parse from 'snarkdown';

import { useTranslation } from '../../hooks';

import { Content } from '../Content';
import { H3 } from '../Typo';

import { wrapper, main, links } from './OrganizationCard.module.css';

export default function OrganizationCard({ organization }) {
  const { t } = useTranslation();
  const { name, description, mainLink, contactLink } = organization;
  return (
    <Content>
      <H3>{name}</H3>
      <div className={wrapper}>
        <div
          className={main}
          dangerouslySetInnerHTML={{ __html: parse(description) }}
        />
        <div className={links}>
          <ul>
            <li>
              <a href={mainLink} rel="noreferrer noopener">
                {t('organizationMainLink')}
              </a>
            </li>
            <li>
              <a href={contactLink} rel="noreferrer noopener">
                {t('organizationContactLink')}
              </a>
            </li>
          </ul>
        </div>
      </div>
    </Content>
  );
}
