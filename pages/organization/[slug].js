import { getOrganizations, getOrganization } from '../../services';

import {
  Page,
  Cards,
  OrganizationCard,
  OrganizationActivitiesCard,
  ShareCard,
} from '../../components';

export default function Organization({ organization }) {
  const { name, summary, activities } = organization;
  return (
    <Page title={name} description={summary}>
      <Cards>
        <OrganizationCard organization={organization} />
        <OrganizationActivitiesCard
          organization={organization}
          activities={activities}
        />
        <ShareCard />
      </Cards>
    </Page>
  );
}

export async function getStaticProps({ params: { slug }, preview }) {
  const organization = await getOrganization({ slug }, preview);
  return {
    props: {
      organization: {
        ...organization,
        activities: [...organization.activities].map((activity) => ({
          ...activity,
          organization,
        })),
      },
    },
  };
}

export async function getStaticPaths() {
  const organizations = await getOrganizations();
  return {
    paths: organizations.map(({ slug }) => ({ params: { slug } })),
    fallback: false,
  };
}
