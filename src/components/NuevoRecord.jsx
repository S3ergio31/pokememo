import { GameContext } from 'context/GameProvider';
import React, { useState, useContext } from 'react';
import Modal from './Modal';

const NuevoRecord = () => {
    const { addRecord } = useContext(GameContext);
    const [nombre, setNombre] = useState("");
    
    const handleChange = event => setNombre(event.target.value);
    const handleAceptar = () => addRecord(nombre);

    return (
        <Modal title="Nuevo record!" show={true} onAceptar={handleAceptar}>
            <div style={{ textAlign: 'center' }}>
                <input type="text" placeholder='Ingresa tu numbre' value={nombre} onChange={handleChange}/>
            </div>
        </Modal>
    ); 
}

export default NuevoRecord;