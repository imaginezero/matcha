import { Headline, Subline } from '../Typo';

import { headline } from './ActivityCard.module.css';

export default function ActivityCard({
  activity: { name, slug, organization: org },
}) {
  return (
    <div key={slug}>
      <Subline>{org.name}</Subline>
      <Headline className={headline}>{name}</Headline>
    </div>
  );
}
