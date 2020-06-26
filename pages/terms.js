import { Page, Content, Markdown } from '../components';

import TermsContent from '../contents/terms.md';

export default function Terms() {
  return (
    <Page>
      <Content>
        <Markdown>
          <TermsContent />
        </Markdown>
      </Content>
    </Page>
  );
}
