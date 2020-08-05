import {
  getActivity,
  getActivities,
  recommendActivities,
} from '../../services';

import {
  Page,
  Cards,
  ActivityCard,
  ActivityCreditCard,
  AlternativeActivitiesCard,
  OrganizationCard,
} from '../../components';

export default function Activity({ activity, activities }) {
  return (
    <Page title={activity.name} description={activity.description}>
      <Cards>
        <ActivityCard activity={activity} />
        <OrganizationCard organization={activity.organization} />
        <AlternativeActivitiesCard activities={activities} />
        <ActivityCreditCard activity={activity} />
      </Cards>
    </Page>
  );
}

export async function getStaticProps({ params: { slug }, preview }) {
  const activity = await getActivity({ slug }, preview);
  const activities = await recommendActivities(
    activity.effortScore + 10,
    {},
    preview
  );
  return {
    props: {
      activity,
      activities: activities
        .filter(({ slug }) => slug !== activity.slug)
        .slice(0, 3),
    },
  };
}

export async function getStaticPaths() {
  const activities = await getActivities();
  return {
    paths: activities.map(({ slug }) => ({ params: { slug } })),
    fallback: false,
  };
}
