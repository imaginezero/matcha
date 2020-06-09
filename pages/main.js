import { Fragment } from 'react';

import { Slider } from '../components';

export default function Home({ activities }) {
  return (
    <Fragment>
      <Slider />
      <ul>
        {activities.map((activity, index) => (
          <li key={index}>{activity.name}</li>
        ))}
      </ul>
    </Fragment>
  );
}

export async function getServerSideProps({ req, query, preview }) {
  const { getData } = require('../services/data');
  const { getPrefsFilter } = require('../utils/prefs');

  const { p: page = 1, e: effort = 1 } = query;
  const maxNum = Number(page) * 3;
  const maxEffort = Number(effort) + 10;

  const { activities, activityTypes, organizations } = await getData(preview);

  const allActivities = activities
    .filter(
      ({ effortScore }) => effortScore >= effort && effortScore < maxEffort
    )
    .filter(getPrefsFilter(req));

  return {
    props: {
      activities: allActivities
        .sort((a, b) => b.impactScore - a.impactScore)
        .slice(0, maxNum)
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
        })),
      moreActivities: maxNum > allActivities.length,
    },
  };
}
