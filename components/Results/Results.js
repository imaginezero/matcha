import { ActivityCard } from '../ActivityCard';

import { wrapper } from './Results.module.css';

export default function Results({ activities }) {
  return (
    <div className={wrapper}>
      {activities.map((activity) => (
        <ActivityCard key={activity.slug} activity={activity} />
      ))}
    </div>
  );
}
