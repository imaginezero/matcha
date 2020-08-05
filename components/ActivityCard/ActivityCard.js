import Link from 'next/link';
import { useRouter } from 'next/router';
import parse from 'snarkdown';

import { useCapture, useTracking } from '../../hooks';

import { H2, H3 } from '../Typo';
import { Content } from '../Content';

import {
  imageWrapper,
  contentWrapper,
  actionWrapper,
  descriptionWrapper,
  description,
  button,
  h2,
  h3,
} from './ActivityCard.module.css';

function OrganizationLink({ name }) {
  return <H3 className={h3}>{name}</H3>;
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

function OutboundLink({ link, label, slug }) {
  const { trackOutboundLink } = useTracking();
  const { captureOutboundLink } = useCapture();
  return (
    <a
      className={button}
      href={link}
      target="_blank"
      rel="noreferrer noopener"
      onClick={() => {
        trackOutboundLink(link);
        captureOutboundLink(slug, link);
      }}
    >
      {label}
    </a>
  );
}

function Description({ content }) {
  return (
    <div className={description}>
      <Content dangerouslySetInnerHTML={{ __html: parse(content) }} />
    </div>
  );
}

export default function ActivityCard({ activity, ...props }) {
  const {
    name,
    slug,
    description,
    singleWordCta,
    link,
    imgUrlPublic,
    organization,
  } = activity;
  return (
    <div {...props}>
      <Content
        className={imageWrapper}
        style={{ backgroundImage: `url("${imgUrlPublic}")` }}
        key={slug}
      >
        <div className={contentWrapper}>
          <OrganizationLink name={organization.name} slug={organization.slug} />
          <ActivityLink name={name} slug={slug} />
        </div>
        <div className={actionWrapper}>
          <OutboundLink link={link} slug={slug} label={singleWordCta} />
        </div>
      </Content>
      <div className={descriptionWrapper}>
        <Description content={description} />
      </div>
    </div>
  );
}
