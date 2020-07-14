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
  return filterActivities(activities, effort, prefs)
    .map((activity) => ({
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
    .sort((a, b) => b.aggregateScore - a.aggregateScore);
}

const filterActivities = (activities, effort, prefs) => {
  const minEffort = Math.max(Number(effort) - 10, 0);
  const maxEffort = Math.min(Number(effort), 100);
  const maxScores = { impact: 0, aggregate: 0 };
  return [
    ...activities.filter(({ effortScore, impactScore, aggregateScore }) => {
      if (effortScore > minEffort && effortScore <= maxEffort) {
        maxScores.impact = Math.max(maxScores.impact, impactScore);
        maxScores.aggregate = Math.max(maxScores.aggregate, aggregateScore);
        return true;
      }
      return false;
    }),
    ...activities.filter(({ effortScore, impactScore, aggregateScore }) => {
      return (
        effortScore <= minEffort &&
        effortScore > minEffort - 5 &&
        aggregateScore > maxScores.aggregate &&
        impactScore > maxScores.impact
      );
    }),
  ].filter((activity) =>
    Object.entries(conditions).every(
      ([condition, property]) => !activity[condition] || prefs[property]
    )
  );
};
