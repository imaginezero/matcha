import Link from 'next/link';
import { useRouter } from 'next/router';

import { H2, H3 } from '../Typo';
import { Content } from '../Content';
import { Markdown } from '../Markdown';

import CallToAction from './CallToAction';

import {
  imageWrapper,
  contentWrapper,
  actionWrapper,
  descriptionWrapper,
  description,
  h2,
  h3,
} from './ActivityCard.module.css';

function OrganizationLink({ name, slug }) {
  const { asPath } = useRouter();
  return (
    <H3 className={h3}>
      {asPath === `/organization/${slug}` ? (
        name
      ) : (
        <Link href={'/organization/[slug]'} as={`/organization/${slug}`}>
          <a>{name}</a>
        </Link>
      )}
    </H3>
  );
}

function ActivityLink({ name, slug }) {
  const { asPath } = useRouter();
  return (
    <H2 className={h2}>
      {asPath === `/activity/${slug}` ? (
        name
      ) : (
        <Link href={'/activity/[slug]'} as={`/activity/${slug}`}>
          <a>{name}</a>
        </Link>
      )}
    </H2>
  );
}

function Description({ content }) {
  return (
    <div className={description}>
      <Content>
        <Markdown contents={content} />
      </Content>
    </div>
  );
}

export default function ActivityCard({ activity, ...props }) {
  const {
    title,
    slug,
    summary,
    callToAction,
    mainLink,
    headerImage,
    organization,
  } = activity;
  return (
    <div {...props}>
      <Content
        className={imageWrapper}
        style={{
          backgroundImage: `url("${headerImage ? headerImage.url : null}")`,
        }}
        key={slug}
      >
        <div className={contentWrapper}>
          <OrganizationLink
            name={organization.title}
            slug={organization.slug}
          />
          <ActivityLink name={title} slug={slug} />
        </div>
        <div className={actionWrapper}>
          <CallToAction link={mainLink} slug={slug} label={callToAction} />
        </div>
      </Content>
      <div className={descriptionWrapper}>
        <Description content={summary} />
      </div>
    </div>
  );
}
