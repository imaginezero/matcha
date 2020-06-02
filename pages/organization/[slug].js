export default function Organization({ organization }) {
  return <pre>{JSON.stringify(organization, null, 2)}</pre>;
}

export async function getStaticProps({ params: { slug }, preview }) {
  const { getData } = require('../../services/data');
  const { activities, activityTypes, organizations } = await getData(preview);
  const organization = organizations.find(
    (organization) => organization.slug === slug
  );
  organization.activities = activityTypes
    .reduce(
      (result, { type }) => [
        ...result,
        ...activities.filter(
          (activity) =>
            activity.organization === organization.name &&
            activity.type === type
        ),
      ],
      []
    )
    .map((activity) => {
      activity.type = activityTypes.find(({ type }) => activity.type === type);
      return activity;
    });
  return { props: { organization } };
}

export async function getStaticPaths() {
  const { getData } = require('../../services/data');
  const { organizations } = await getData();
  return {
    paths: organizations.map(({ slug }) => ({ params: { slug } })),
    fallback: false,
  };
}
