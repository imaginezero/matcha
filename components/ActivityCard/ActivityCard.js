import Link from 'next/link';
import { useRouter } from 'next/router';

import { H2, H3 } from '../Typo';
import { Content } from '../Content';
import { Markdown } from '../Markdown';

import {
  activityLink,
  imageWrapper,
  contentWrapper,
  summaryWrapper,
  summary,
  h2,
  h3,
} from './ActivityCard.module.css';

function ActivityLink({ slug, children }) {
  const { asPath } = useRouter();
  return asPath === `/activity/${slug}` ? (
    children
  ) : (
    <Link href={'/activity/[slug]'} as={`/activity/${slug}`}>
      <a className={activityLink}>{children}</a>
    </Link>
  );
}

function Summary({ content }) {
  return (
    <div className={summary}>
      <Content>
        <Markdown contents={content} />
      </Content>
    </div>
  );
}

export default function ActivityCard({
  activity,
  withSummary = true,
  ...props
}) {
  const { title, slug, summary, headerImage, organization } = activity;
  return (
    <div {...props}>
      <ActivityLink slug={slug}>
        <Content
          className={imageWrapper}
          style={{
            backgroundImage: `url("${headerImage ? headerImage.url : null}")`,
          }}
        >
          <div className={contentWrapper}>
            <H3 className={h3}>{organization.title}</H3>
            <H2 className={h2}>{title}</H2>
          </div>
        </Content>
      </ActivityLink>
      {withSummary ? (
        <div className={summaryWrapper}>
          <Summary content={summary} />
        </div>
      ) : null}
    </div>
  );
}
