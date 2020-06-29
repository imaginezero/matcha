import { Page, Content, Markdown } from '../components';
import { useTranslation } from '../hooks';

import TermsContent from '../contents/terms.md';

export default function Terms() {
  const { t } = useTranslation();
  return (
    <Page title={t('termsTitle')} description={t('termsDescription')}>
      <Content>
        <Markdown>
          <TermsContent />
        </Markdown>
      </Content>
    </Page>
  );
}
