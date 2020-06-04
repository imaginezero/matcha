import { getPrefs } from '../utils/prefs';

export default function Home({ activities }) {
  return <pre>{JSON.stringify(activities, null, 2)}</pre>;
}

export async function getServerSideProps({ req, preview }) {
  const { getData } = require('../services/data');
  const { activities, activityTypes, organizations } = await getData(preview);
  const prefs = getPrefs(req); // eslint-disable-line
  console.log(prefs);
  return {
    props: {
      activities: activityTypes.reduce(
        (result, { type, name, description = null }) => ({
          ...result,
          [type]: {
            name,
            activities: activities
              .filter((activity) => activity.type === type)
              .map((activity) => {
                activity.organization =
                  organizations.find(
                    (organization) =>
                      organization.name === activity.organization
                  ) || null;
                activity.type = { type, name, description };
                return activity;
              }),
          },
        }),
        {}
      ),
    },
  };
}
