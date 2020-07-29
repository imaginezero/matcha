import { getData } from '../utils';

export async function getOrganizations() {
  const { organizations } = await getData();
  return organizations;
}

export async function getOrganization(properties, preview) {
  const { activities, activityTypes, organizations } = await getData(preview);
  const organization = organizations.find((organization) =>
    Object.entries(properties).every(
      ([key, value]) => organization[key] === value
    )
  );
  return {
    ...organization,
    activities: activities
      .filter((activity) => activity.organization === organization.name)
      .map((activity) => ({
        ...activity,
        type: activityTypes.find(({ type }) => activity.type === type) || null,
      })),
  };
}
