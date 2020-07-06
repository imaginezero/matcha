import { Children, cloneElement, useMemo, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

import { concatClassnames } from '../utilities';

import { wrapper, hiddenWrapper, modal } from './Modal.module.css';

function ModalPortal({ children }) {
  const el = useMemo(() => document.createElement('div'), []);
  const root = document.getElementById('__next_modal');
  useEffect(() => {
    root.appendChild(el);
    return () => {
      root.removeChild(el);
    };
  }, []);
  useEffect(() => {
    document.body.style.position = 'fixed';
    document.body.style.top = `-${window.scrollY}px`;
    return () => {
      const scrollY = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      window.scrollTo(0, parseInt(scrollY || '0') * -1);
    };
  }, []);
  return createPortal(children, el);
}

function ModalWrapper({ children, isClosing, onClose, className }) {
  const [isOpening, setIsOpening] = useState(true);
  useEffect(() => {
    if (isOpening) setTimeout(() => setIsOpening(false), 125);
  }, []);
  useEffect(() => {
    if (isClosing) setTimeout(() => onClose(), 125);
  }, [isClosing]);
  return (
    <div className={isOpening || isClosing ? hiddenWrapper : wrapper}>
      <div className={concatClassnames(modal, className)}>{children}</div>
    </div>
  );
}

export default function Modal({ children, onClose }) {
  const [isOpen, setIsOpen] = useState(null);
  const [isClosing, setIsClosing] = useState(false);
  useEffect(() => {
    if (isOpen === null) setIsOpen(true);
    else if (!isOpen && onClose) onClose();
  }, [isOpen]);
  return isOpen ? (
    <ModalPortal>
      <ModalWrapper isClosing={isClosing} onClose={() => setIsOpen(false)}>
        {cloneElement(Children.only(children), {
          close() {
            setIsClosing(true);
          },
        })}
      </ModalWrapper>
    </ModalPortal>
  ) : null;
}
