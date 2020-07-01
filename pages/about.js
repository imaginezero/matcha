import { Page, Content, Markdown } from '../components';
import { useTranslation } from '../hooks';

import AboutContent from '../contents/about.md';

export default function About() {
  const { t } = useTranslation();
  return (
    <Page title={t('aboutTitle')} description={t('aboutDescription')}>
      <Content>
        <Markdown>
          <AboutContent />
        </Markdown>
      </Content>
    </Page>
  );
}
