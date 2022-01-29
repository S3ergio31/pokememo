import { GameContext } from 'context/GameProvider';
import React, { useState, useContext } from 'react';
import Modal from './Modal';

const NewRecord = () => {
    const { addRecord } = useContext(GameContext);
    const [name, setName] = useState("");
    
    const handleChange = event => setName(event.target.value);
    const handleAccept = () => addRecord(name);

    return (
        <Modal title="New record!" show={true} onAccept={handleAccept}>
            <div style={{ textAlign: 'center' }}>
                <input type="text" placeholder='Enter your name' value={name} onChange={handleChange}/>
            </div>
        </Modal>
    ); 
}

export default NewRecord;