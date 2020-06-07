export default function Organization({ organization }) {
  return <pre>{JSON.stringify(organization, null, 2)}</pre>;
}

export async function getStaticProps({ params: { slug }, preview }) {
  const { getData } = require('../../services/data');
  const { activities, activityTypes, organizations } = await getData(preview);
  const organization = organizations.find(
    (organization) => organization.slug === slug
  );
  return {
    props: {
      organization: {
        ...organization,
        activities: activities
          .filter((activity) => activity.organization === organization.name)
          .map((activity) => ({
            ...activity,
            type:
              activityTypes.find(({ type }) => activity.type === type) || null,
          })),
      },
    },
  };
}

export async function getStaticPaths() {
  const { getData } = require('../../services/data');
  const { organizations } = await getData();
  return {
    paths: organizations.map(({ slug }) => ({ params: { slug } })),
    fallback: false,
  };
}
