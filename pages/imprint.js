import { Page, Content, Markdown } from '../components';
import { useTranslation } from '../hooks';

import ImprintContent from '../contents/imprint.md';

export default function Terms() {
  const { t } = useTranslation();
  return (
    <Page title={t('imprintTitle')} description={t('imprintDescription')}>
      <Content>
        <Markdown>
          <ImprintContent />
        </Markdown>
      </Content>
    </Page>
  );
}
