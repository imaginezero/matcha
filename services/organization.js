import { getEntry, getEntries } from '../utils';

export async function getOrganizations(preview) {
  const organizations = await getEntries('organization', preview);
  return organizations;
}

export async function getOrganization(properties, preview) {
  const activities = await getEntries('activity', preview);
  const organization = await getEntry('organization', properties, preview);
  return {
    ...organization,
    activities: activities
      .filter(
        (activity) =>
          activity.organization && activity.organization.id === organization.id
      )
      .sort((a, b) => b.aggregateScore - a.aggregateScore),
  };
}
