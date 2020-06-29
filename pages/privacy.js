import { Page, Content, Markdown } from '../components';
import { useTranslation } from '../hooks';

import PrivacyContent from '../contents/privacy.md';

export default function Privacy() {
  const { t } = useTranslation();
  return (
    <Page title={t('privacyTitle')} description={t('privacyDescription')}>
      <Content>
        <Markdown>
          <PrivacyContent />
        </Markdown>
      </Content>
    </Page>
  );
}
