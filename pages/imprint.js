import { Page, Content, Markdown } from '../components';

import ImprintContent from '../contents/imprint.md';

export default function Terms() {
  return (
    <Page>
      <Content>
        <Markdown>
          <ImprintContent />
        </Markdown>
      </Content>
    </Page>
  );
}
