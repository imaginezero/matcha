import { useCapture, useTracking } from '../../hooks';

import { Headline } from '../Typo';
import { Content } from '../Content';

import {
  wrapper,
  contentWrapper,
  actionWrapper,
  headline,
  subline,
  description,
  button,
} from './ActivityCard.module.css';

function Button({ link, label, slug }) {
  const { trackOutboundLink } = useTracking();
  const { captureOutboundLink } = useCapture();
  return (
    <a
      className={button}
      href={link}
      target="_blank"
      rel="noreferrer"
      onClick={() => {
        trackOutboundLink(link);
        captureOutboundLink(slug, link);
      }}
    >
      {label}
    </a>
  );
}

function Description({ children }) {
  return (
    <div className={description}>
      <p>{children}</p>
    </div>
  );
}

export default function ActivityCard({ activity }) {
  const {
    name,
    slug,
    description,
    singleWordCta,
    link,
    imgUrlPublic,
    organization: org,
  } = activity;
  return (
    <Content
      className={wrapper}
      style={{ backgroundImage: `url("${imgUrlPublic}")` }}
      key={slug}
    >
      <div className={contentWrapper}>
        <Headline className={subline}>{org.name}</Headline>
        <Headline className={headline}>{name}</Headline>
        <Description>{description}</Description>
      </div>
      <div className={actionWrapper}>
        <Button link={link} label={singleWordCta} slug={slug} />
      </div>
    </Content>
  );
}
