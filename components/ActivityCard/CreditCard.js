import parse from 'snarkdown';

import { Content } from '../Content';
import { Muted } from '../Typo';

export default function CreditCard({ activity, ...props }) {
  const { imgAttribution } = activity;
  return (
    <Content {...props}>
      <Muted dangerouslySetInnerHTML={{ __html: parse(imgAttribution) }} />
    </Content>
  );
}
