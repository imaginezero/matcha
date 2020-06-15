export default function Activity({ activity }) {
  return <pre>{JSON.stringify(activity, null, 2)}</pre>;
}

export async function getStaticProps({ params: { slug }, preview }) {
  const { getActivity } = require('../../services/activity');
  const activity = await getActivity({ slug }, preview);
  return { props: { activity } };
}

export async function getStaticPaths() {
  const { getActivities } = require('../../services/activity');
  const activities = await getActivities();
  return {
    paths: activities.map(({ slug }) => ({ params: { slug } })),
    fallback: false,
  };
}
