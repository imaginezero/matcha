import { getData } from '../utils/data';

const conditions = {
  parentOnly: 'isParent',
  studentOnly: 'isStudent',
  scientistOnly: 'isScientist',
  officialOnly: 'isOfficial',
  ngoExecOnly: 'isNgoExec',
  companyExecOnly: 'isCompanyExec',
};

export async function getActivities() {
  const { activities } = await getData();
  return activities;
}

export async function getActivity(properties, preview) {
  const { activities, activityTypes, organizations } = await getData(preview);
  const activity = activities.find((activity) =>
    Object.entries(properties).every(([key, value]) => activity[key] === value)
  );
  return {
    ...activity,
    organization:
      organizations.find(({ name }) => name === activity.organization) || null,
    type: activityTypes.find(({ type }) => type === activity.type) || null,
  };
}

export async function recommendActivities(effort, prefs, preview) {
  const { activities, activityTypes, organizations } = await getData(preview);
  return sortActivities(
    filterActivities(activities, effort, prefs).map((activity) => ({
      ...activity,
      organization:
        organizations.find(
          (organization) => organization.name === activity.organization
        ) || null,
      type:
        activityTypes.find(
          (activityType) => activityType.name === activity.type
        ) || null,
    }))
  );
}

const sortActivities = (activities) => {
  const getScore = ({ effortScore, impactScore }) => {
    const relativeScore = (impactScore / effortScore) * 100;
    return Math.round(impactScore * 5 + relativeScore);
  };
  return activities.sort((a, b) => getScore(b) - getScore(a));
};

const filterActivities = (activities, effort, prefs) => {
  const maxEffort = Math.min(Number(effort), 100);
  const minEffort = Math.max(Number(effort) - 10, 0);
  const subMinEffort = Math.max(minEffort - 20, 0);
  const activitiesByEffort = activities.filter(
    ({ effortScore }) => effortScore > minEffort && effortScore <= maxEffort
  );
  const minImpact = activitiesByEffort.reduce(
    (result, { impactScore }) => Math.min(result, impactScore),
    100
  );
  const activitiesByImpact = activities.filter(
    ({ effortScore, impactScore }) =>
      effortScore <= minEffort &&
      effortScore > subMinEffort &&
      impactScore > minImpact
  );
  return [...activitiesByEffort, ...activitiesByImpact].filter((activity) =>
    Object.entries(conditions).every(
      ([condition, property]) => !activity[condition] || prefs[property]
    )
  );
};
