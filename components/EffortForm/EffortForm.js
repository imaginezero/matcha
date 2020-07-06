import Link from 'next/link';

import { useTranslation } from '../../hooks';

import { Slider } from '../Slider';

import { prefLink } from './EffortForm.module.css';

export default function EffortForm() {
  const { t } = useTranslation();
  return (
    <>
      <Slider />
      <Link href="/preferences">
        <a className={prefLink}>{t('prefLink')}</a>
      </Link>
    </>
  );
}
