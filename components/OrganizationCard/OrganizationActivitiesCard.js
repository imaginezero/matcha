import { useTranslation } from '../../hooks';

import { H3 } from '../Typo';
import { Content } from '../Content';
import { Cards } from '../Cards';
import { ActivityCard } from '../ActivityCard';

export default function OrganizationActivitiesCard({
  activities,
  organization,
}) {
  const { t } = useTranslation();
  return (
    <div>
      <Content>
        <H3>{t('organizationActivities', organization)}</H3>
      </Content>
      <Cards height="high">
        {activities.map((activity) => (
          <ActivityCard activity={activity} key={activity.slug} />
        ))}
        <Content />
      </Cards>
    </div>
  );
}
