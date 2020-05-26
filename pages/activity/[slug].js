export default function Activity({ activity }) {
  return <pre>{JSON.stringify(activity, null, 2)}</pre>;
}

export async function getStaticProps({ params: { slug } }) {
  const { getData } = require('../../services/data');
  const { activities, activityTypes, organizations } = await getData();
  const activity = activities.find((activity) => activity.slug === slug);
  activity.organization =
    organizations.find(
      (organization) => organization.name === activity.organization
    ) || null;
  activity.type =
    activityTypes.find((activityType) => activityType.type === activity.type) ||
    null;
  return { props: { activity } };
}

export async function getStaticPaths() {
  const { getData } = require('../../services/data');
  const { activities } = await getData();
  return {
    paths: activities.map(({ slug }) => ({ params: { slug } })),
    fallback: false,
  };
}
