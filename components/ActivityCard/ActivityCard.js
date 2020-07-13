import { useTracking } from '../../hooks';

import { Headline, Subline } from '../Typo';
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

function Button({ link, label }) {
  const { trackOutboundLink } = useTracking();
  return (
    <a
      className={button}
      href={link}
      target="_blank"
      rel="noreferrer"
      onClick={() => trackOutboundLink(link)}
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
      style={{ '--background-image': `url("${imgUrlPublic}")` }}
      key={slug}
    >
      <div className={contentWrapper}>
        <Subline className={subline}>{org.name}</Subline>
        <Headline className={headline}>{name}</Headline>
        <Description>{description}</Description>
      </div>
      <div className={actionWrapper}>
        <Button link={link} label={singleWordCta} />
      </div>
    </Content>
  );
}
