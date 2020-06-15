export default function Organization({ organization }) {
  return <pre>{JSON.stringify(organization, null, 2)}</pre>;
}

export async function getStaticProps({ params: { slug }, preview }) {
  const { getOrganization } = require('../../services/organization');
  const organization = await getOrganization({ slug }, preview);
  return { props: { organization } };
}

export async function getStaticPaths() {
  const { getOrganizations } = require('../../services/organization');
  const organizations = await getOrganizations();
  return {
    paths: organizations.map(({ slug }) => ({ params: { slug } })),
    fallback: false,
  };
}
