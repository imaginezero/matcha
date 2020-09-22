import { Children, cloneElement, useMemo, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

import { concatClassnames } from '../utilities';

import { wrapper, hiddenWrapper, modal } from './Modal.module.css';

function ModalPortal({ children }) {
  const { body } = document;
  const el = useMemo(() => document.createElement('div'), []);
  useEffect(() => {
    body.appendChild(el);
    body.style.overflow = 'hidden';
    return () => {
      body.removeChild(el);
      body.style.overflow = 'scroll';
    };
  }, []);
  return createPortal(children, el);
}

function ModalWrapper({
  children,
  closing,
  onClose,
  canceable,
  cancel,
  className,
  ...props
}) {
  const [hidden, setHidden] = useState(true);
  useEffect(() => {
    setTimeout(() => setHidden(false));
  }, []);
  useEffect(() => {
    if (closing) {
      setHidden(true);
      setTimeout(() => onClose(), 125);
    }
  }, [closing]);

  const handlers = canceable ? {
    onClick(e) {    
      if(e.target === e.currentTarget) {
        // Click on the modal wrapper happened outside the modal
        cancel();
      }
    },
  } : {};
  return (
    <div className={hidden ? hiddenWrapper : wrapper} {...handlers}>
      <div {...props} className={concatClassnames(modal, className)}>
        {children}
      </div>
    </div>
  );
}

export default function Modal({
  children,
  canceable = true,
  onClose = () => {},
  onCancel = () => {},
  ...props
}) {
  const [open, setOpen] = useState(null);
  const [closing, setClosing] = useState(false);
  useEffect(() => {
    if (open === null) setOpen(true);
    if (open === false) onClose();
  }, [open]);
  return open ? (
    <ModalPortal>
      <ModalWrapper
        {...props}
        closing={closing}
        canceable={canceable}
        onClose={() => setOpen(false)}
        cancel={() => {
          setClosing(true);
          onCancel();
        }}
      >
        {cloneElement(Children.only(children), {
          close() {
            setClosing(true);
          },
        })}
      </ModalWrapper>
    </ModalPortal>
  ) : null;
}
