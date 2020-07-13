import { Children, cloneElement, useMemo, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

import { concatClassnames } from '../utilities';

import { wrapper, hiddenWrapper, modal } from './Modal.module.css';

function ModalPortal({ children }) {
  const { body } = document;
  const el = useMemo(() => document.createElement('div'), []);
  useEffect(() => {
    body.appendChild(el);
    return () => body.removeChild(el);
  }, []);
  useEffect(() => {
    const { style } = body;
    const scrollY = window.scrollY;
    style.position = 'fixed';
    style.top = `${scrollY * -1}px`;
    return () => {
      style.position = '';
      style.top = '';
      window.scrollTo(0, scrollY);
    };
  }, []);
  return createPortal(children, el);
}

function ModalWrapper({ children, closing, onClose, className, ...props }) {
  const [hidden, setHidden] = useState(true);
  useEffect(() => {
    setHidden(false);
  }, []);
  useEffect(() => {
    if (closing) {
      setHidden(true);
      setTimeout(() => onClose(), 125);
    }
  }, [closing]);
  return (
    <div className={hidden ? hiddenWrapper : wrapper}>
      <div {...props} className={concatClassnames(modal, className)}>
        {children}
      </div>
    </div>
  );
}

export default function Modal({ children, onClose = () => {}, ...props }) {
  const [open, setOpen] = useState(null);
  const [closing, setClosing] = useState(false);
  useEffect(() => {
    if (open === null) setOpen(true);
    if (open === false) onClose();
  }, [open]);
  return open ? (
    <ModalPortal>
      <ModalWrapper {...props} closing={closing} onClose={() => setOpen(false)}>
        {cloneElement(Children.only(children), {
          close() {
            setClosing(true);
          },
        })}
      </ModalWrapper>
    </ModalPortal>
  ) : null;
}
