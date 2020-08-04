import { getActivity, getActivities } from '../../services';

import { ActivityCard } from '../../components';

export default function Activity({ activity }) {
  return <ActivityCard activity={activity} />;
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
