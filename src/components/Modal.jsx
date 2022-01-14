import React, { useContext, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import Boton from './Boton';
import 'css/modal.css';
import { GameContext } from 'context/GameProvider';

const Modal = ({
    children, 
    show,
    title
}) => {
    const [visible, setVisible] = useState(show);

    const { resetGame } = useContext(GameContext);
    
    const close = () => {
        resetGame();
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
                    <Boton onClick={close}>
                        Aceptar
                    </Boton>
                </footer>
            </div>
        </div>,
        document.getElementById('root')
    );
}

export default Modal;