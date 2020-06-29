import Link from 'next/link';

import {
  Page,
  Content,
  Headline,
  Subline,
  Slider,
  Results,
} from '../components';
import { useTranslation } from '../hooks';

import { subline, prefLink } from './common.module.css';

export default function Home({ activities }) {
  const { t } = useTranslation();
  return (
    <Page title={t('mainTitle')} description={t('mainDescription')}>
      <Content>
        <Headline>{t('mainHeadline')}</Headline>
        <Subline className={subline}>{t('mainSubline')}</Subline>
        <Slider />
        <Link href="/preferences">
          <a className={prefLink}>{t('prefLink')}</a>
        </Link>
      </Content>
      <Results activities={activities} />
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
      moreActivities: num > activities.length,
    },
  };
}
