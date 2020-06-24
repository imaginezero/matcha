import { ActivityCard } from '../ActivityCard';

import { wrapper, card } from './Results.module.css';

export default function Results({ activities }) {
  return (
    <div className={wrapper}>
      {activities.map((activity) => (
        <div key={activity.slug} className={card}>
          <ActivityCard activity={activity} />
        </div>
      ))}
    </div>
  );
}
