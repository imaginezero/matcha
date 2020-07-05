import { useState, useEffect } from 'react';

import { useLoading } from '../../hooks';

import { LogoMark } from '../Logo';
import { concatClassnames } from '../utilities';

import { logomark, spinner } from './Frame.module.css';

export default function Spinner() {
  const { loading } = useLoading();
  const [spinning, setSpinning] = useState(loading);
  useEffect(() => {
    if (loading && !spinning) setSpinning(true);
  }, [loading]);
  return (
    <LogoMark
      className={concatClassnames(logomark, ...(spinning ? [spinner] : []))}
      onAnimationIteration={() => {
        if (!loading && spinning) setSpinning(false);
      }}
    />
  );
}
