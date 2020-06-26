import { Page, Content, Markdown } from '../components';

import PrivacyContent from '../contents/privacy.md';

export default function Privacy() {
  return (
    <Page>
      <Content>
        <Markdown>
          <PrivacyContent />
        </Markdown>
      </Content>
    </Page>
  );
}
