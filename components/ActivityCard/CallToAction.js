import { useState } from 'react';

import {
  useCapture,
  useTracking,
  didEnterEmail
} from '../../hooks';

import { Modal } from '../Modal';

import Interstitial from './Interstitial';

import { button } from './ActivityCard.module.css';

function LoggedOutButton(props) {
  const { label } = props;
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <a
        className={button}
        onClick={(event) => {
          event.preventDefault();
          setIsOpen(true);
        }}
      >
        {label}
      </a>
      {isOpen ? (
        <Modal onClose={() => setIsOpen(false)}>
          <Interstitial {...props} />
        </Modal>
      ) : null}
    </>
  );
}

function LoggedInButton({ link, label, slug }) {
  const { trackOutboundLink } = useTracking();
  const { captureOutboundLink } = useCapture();
  return (
    <a
      className={button}
      href={link}
      target="_blank"
      rel="noreferrer noopener"
      onClick={(event) => {
        event.preventDefault();
        captureOutboundLink(slug, link);
        trackOutboundLink(link, true, '_blank');
      }}
    >
      {label}
    </a>
  );
}

export default function CallToAction(props) {
  return didEnterEmail() ? (
    <LoggedInButton {...props} />
  ) : (
    <LoggedOutButton {...props} />
  );
}
