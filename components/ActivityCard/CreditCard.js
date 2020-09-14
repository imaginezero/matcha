import { Content } from '../Content';
import { Markdown } from '../Markdown';
import { Muted } from '../Typo';

export default function CreditCard({ activity, ...props }) {
  const { headerImage: { description = '' } = {} } = activity;
  return (
    <Content {...props}>
      <Muted>
        <Markdown contents={description} />
      </Muted>
    </Content>
  );
}
