import { Content } from '../Content';
import { ActivityCard } from '../ActivityCard';

import { wrapper, content, card } from './Results.module.css';

export default function Results({ activities }) {
  return (
    <div className={wrapper}>
      <Content className={content}>
        {activities.map((activity) => (
          <div key={activity.slug} className={card}>
            <ActivityCard activity={activity} />
          </div>
        ))}
      </Content>
    </div>
  );
}
