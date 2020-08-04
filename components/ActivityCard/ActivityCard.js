import Link from 'next/link';
import { useRouter } from 'next/router';

import { useCapture, useTracking } from '../../hooks';

import { H2, H3 } from '../Typo';
import { Content } from '../Content';

import {
  imageWrapper,
  contentWrapper,
  actionWrapper,
  h2,
  h3,
  descriptionWrapper,
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

function ActivityLink({ name, slug }) {
  const { asPath } = useRouter();
  return (
    <H2 className={h2}>
      {asPath.includes(slug) ? (
        name
      ) : (
        <Link href={'/activity/[slug]'} as={`/activity/${slug}`}>
          <a>{name}</a>
        </Link>
      )}
    </H2>
  );
}

function Description({ children }) {
  return <div className={description}>{children}</div>;
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
    <>
      <Content
        className={imageWrapper}
        style={{ backgroundImage: `url("${imgUrlPublic}")` }}
        key={slug}
      >
        <div className={contentWrapper}>
          <H3 className={h3}>{org.name}</H3>
          <ActivityLink name={name} slug={slug} />
        </div>
        <div className={actionWrapper}>
          <Button link={link} label={singleWordCta} slug={slug} />
        </div>
      </Content>
      <div className={descriptionWrapper}>
        <Description>
          <Content>{description}</Content>
        </Description>
      </div>
    </>
  );
}
