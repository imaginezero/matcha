import { getActivity, getActivities } from '../../services';

import {
  Page,
  Cards,
  ActivityCard,
  OrganizationCard,
  ActivityCreditCard,
} from '../../components';

export default function Activity({ activity }) {
  return (
    <Page title={activity.name} description={activity.description}>
      <Cards>
        <ActivityCard activity={activity} />
        <OrganizationCard organization={activity.organization} />
        <ActivityCreditCard activity={activity} />
      </Cards>
    </Page>
  );
}

export async function getStaticProps({ params: { slug }, preview }) {
  const activity = await getActivity({ slug }, preview);
  return { props: { activity } };
}

export async function getStaticPaths() {
  const activities = await getActivities();
  return {
    paths: activities.map(({ slug }) => ({ params: { slug } })),
    fallback: false,
  };
}
