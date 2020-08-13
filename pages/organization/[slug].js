import { getOrganizations } from '../../services';

import {
  Page,
  Cards,
  OrganizationCard,
  OrganizationActivitiesCard,
  ShareCard,
} from '../../components';

export default function Organization({ organization }) {
  const { name, description, activities } = organization;
  const image = activities.length ? activities[0].imgUrlPublic : null;
  return (
    <Page title={name} description={description} image={image}>
      <Cards>
        <OrganizationCard organization={organization} />
        <ShareCard />
        <OrganizationActivitiesCard
          organization={organization}
          activities={activities}
        />
      </Cards>
    </Page>
  );
}

export async function getStaticProps({ params: { slug }, preview }) {
  const { getOrganization } = require('../../services/organization');
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
