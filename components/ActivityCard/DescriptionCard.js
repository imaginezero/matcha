import { Content } from '../Content';
import { Markdown } from '../Markdown';

import CallToAction from './CallToAction';

import { descriptionButtonWrapper } from './ActivityCard.module.css';

export default function DescriptionCard({
  activity: { description, mainLink, slug, callToAction },
}) {
  return (
    <Content>
      <Markdown contents={description} />
      <div className={descriptionButtonWrapper}>
        <CallToAction link={mainLink} slug={slug} label={callToAction} />
      </div>
    </Content>
  );
}
