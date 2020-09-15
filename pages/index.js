import { Page, Content, Headline, EffortForm, Results } from '../components';
import { useTranslation, defaultEffort, withLogin } from '../hooks';
import { recommendActivities } from '../services';
import { getPrefs, getProfile } from '../utils';

export default withLogin(function Home({ activities, moreActivities }) {
  const { t } = useTranslation();
  return (
    <Page title={t('mainTitle')} description={t('mainDescription')}>
      <Content>
        <Headline>{t('mainHeadline')}</Headline>
        <EffortForm />
      </Content>
      <Results activities={activities} moreActivities={moreActivities} />
    </Page>
  );
});

export async function getServerSideProps({ req, query, preview }) {
  const { e: effort = defaultEffort /*, p: page = 1 */ } = query;
  // const num = Number(page) * 3;
  const num = 100;
  const prefs = getPrefs(req);
  const profile = await getProfile(req);
  const activities = await recommendActivities(effort, prefs, preview);
  return {
    props: {
      activities: activities.slice(0, num),
      moreActivities: num < activities.length,
      profile,
    },
  };
}
