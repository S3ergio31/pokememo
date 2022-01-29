import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import Button from './Button';
import 'css/modal.css';

const Modal = ({
    children, 
    show,
    title,
    onAccept = () => {}
}) => {
    const [visible, setVisible] = useState(show);
    
    const close = () => {
        onAccept();
        setVisible(false);
    }

    useEffect(() => {
        show && setVisible(show);
    }, [show]);

    if(!visible) return null;

    return ReactDOM.createPortal(
        <div className='modal'>
            <div className='modal-dialog' >
                <header className='modal-header'>
                    <span>{ title }</span>
                    <button className='modal-close-button' onClick={close}>X</button>
                </header>
                <section className='modal-body'>
                    { children }
                </section>
                <footer className='modal-footer'>
                    <Button onClick={close}>
                        Accept
                    </Button>
                </footer>
            </div>
        </div>,
        document.getElementById('root')
    );
}

export default Modal;