export default function Activity({ activity }) {
  return <pre>{JSON.stringify(activity, null, 2)}</pre>;
}

export async function getStaticProps({ params: { slug }, preview }) {
  const { getData } = require('../../services/data');
  const { activities, activityTypes, organizations } = await getData(preview);
  const activity = activities.find((activity) => activity.slug === slug);
  return {
    props: {
      activity: {
        ...activity,
        organization:
          organizations.find(({ name }) => name === activity.organization) ||
          null,
        type: activityTypes.find(({ type }) => type === activity.type) || null,
      },
    },
  };
}

export async function getStaticPaths() {
  const { getData } = require('../../services/data');
  const { activities } = await getData();
  return {
    paths: activities.map(({ slug }) => ({ params: { slug } })),
    fallback: false,
  };
}
