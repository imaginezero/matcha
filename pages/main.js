import {
  Page,
  Content,
  Headline,
  Subline,
  EffortForm,
  Results,
} from '../components';
import { useTranslation } from '../hooks';

export default function Home({ activities, moreActivities }) {
  const { t } = useTranslation();
  return (
    <Page title={t('mainTitle')} description={t('mainDescription')}>
      <Content>
        <Headline>{t('mainHeadline')}</Headline>
        <Subline>{t('mainSubline')}</Subline>
        <EffortForm />
      </Content>
      <Results activities={activities} moreActivities={moreActivities} />
    </Page>
  );
}

export async function getServerSideProps({ req, query, preview }) {
  const { getPrefs } = require('../utils/prefs');
  const { recommendActivities } = require('../services/activity');
  const { defaultEffort } = require('../hooks');

  const { e: effort = defaultEffort, p: page = 1 } = query;
  const num = Number(page) * 3;
  const prefs = getPrefs(req);

  const activities = await recommendActivities(effort, prefs, preview);

  return {
    props: {
      activities: activities.slice(0, num),
      moreActivities: num < activities.length,
    },
  };
}
