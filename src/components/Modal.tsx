import { useEffect, useState, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import Button from './Button';
import 'css/modal.css';

interface ModalProps {
  children?: ReactNode;
  show: boolean;
  title: string;
  onAccept?: () => void;
}

function Modal({ children, show, title, onAccept = () => {} }: ModalProps) {
  const [visible, setVisible] = useState(show);

  const close = (): void => {
    onAccept();
    setVisible(false);
  };

  useEffect(() => {
    if (show) setVisible(true);
  }, [show]);

  if (!visible) return null;

  return createPortal(
    <div className='modal'>
      <div className='modal-dialog'>
        <header className='modal-header'>
          <span>{title}</span>
          <button className='modal-close-button' onClick={close}>X</button>
        </header>
        <section className='modal-body'>
          {children}
        </section>
        <footer className='modal-footer'>
          <Button onClick={close}>Accept</Button>
        </footer>
      </div>
    </div>,
    document.getElementById('root') as HTMLElement,
  );
}

export default Modal;
