import { EFFORT_STEP, EFFORT_MIN, EFFORT_MAX } from './static-config';
import { getEntry, getEntries } from '../utils';

const conditions = {
  parentOnly: 'isParent',
  studentOnly: 'isStudent',
  scientistOnly: 'isScientist',
  officialOnly: 'isOfficial',
  ngoExecOnly: 'isNgoExec',
  companyExecOnly: 'isCompanyExec',
};

function filterActivities(activities, effort, prefs) {
  const minEffort = Math.max(Number(effort) - EFFORT_STEP, EFFORT_MIN);
  const maxEffort = Math.min(Number(effort), EFFORT_MAX);
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
        effortScore > minEffort - (EFFORT_STEP / 2) &&
        aggregateScore > maxScores.aggregate &&
        impactScore > maxScores.impact
      );
    }),
  ].filter((activity) =>
    Object.entries(conditions).every(
      ([condition, property]) => !activity[condition] || prefs[property]
    )
  );
}

export async function getActivities(preview) {
  const activities = await getEntries('activity', preview);
  return activities;
}

export async function getActivity(properties, preview) {
  const activity = await getEntry('activity', properties, preview);
  const organizations = await getEntries('organization', preview);
  return {
    ...activity,
    organization: organizations.find(
      ({ id }) => id === activity.organization.id
    ),
  };
}

export async function recommendActivities(effort, prefs, preview) {
  const activities = await getEntries('activity', preview);
  const organizations = await getEntries('organization', preview);
  return filterActivities(activities, effort, prefs)
    .map(({ effortScore, impactScore, organization, ...activity }) => ({
      ...activity,
      effortScore,
      impactScore,
      aggregateScore: Math.round(
        (Math.pow(impactScore, 2) / effortScore) * Math.log2(impactScore)
      ),
      organization: organizations.find(({ id }) => id === organization.id),
    }))
    .sort((a, b) => b.aggregateScore - a.aggregateScore);
}
