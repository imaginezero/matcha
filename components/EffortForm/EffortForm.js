import { useTranslation } from '../../hooks';

import { H4 } from '../Typo';
import { Slider } from '../Slider';

import { wrapper } from './EffortForm.module.css';

export default function EffortForm() {
  const { t } = useTranslation();
  return (
    <div className={wrapper}>
      <H4>{t('mainEffortExplanation')}</H4>
      <Slider />
    </div>
  );
}
