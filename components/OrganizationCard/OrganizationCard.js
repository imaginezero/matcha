import parse from 'snarkdown';
import { useRouter } from 'next/router';

import { useTranslation } from '../../hooks';

import { Content } from '../Content';
import { H1, H3 } from '../Typo';

import { wrapper, main, links } from './OrganizationCard.module.css';

export default function OrganizationCard({ organization }) {
  const { asPath } = useRouter();
  const { t } = useTranslation();
  const { title, slug, summary, mainLink, contactLink } = organization;
  return (
    <Content>
      {asPath === `/organization/${slug}` ? <H1>{title}</H1> : <H3>{title}</H3>}
      <div className={wrapper}>
        <div
          className={main}
          dangerouslySetInnerHTML={{ __html: parse(summary) }}
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
