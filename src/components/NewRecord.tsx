import { useState, useContext, type ChangeEvent } from 'react';
import { GameContext } from 'context/GameProvider';
import Modal from './Modal';

function NewRecord() {
  const { addRecord } = useContext(GameContext);
  const [name, setName] = useState('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => setName(e.target.value);
  const handleAccept = (): void => addRecord(name);

  return (
    <Modal title="New record!" show={true} onAccept={handleAccept}>
      <div style={{ textAlign: 'center' }}>
        <input
          type="text"
          placeholder='Enter your name'
          value={name}
          onChange={handleChange}
        />
      </div>
    </Modal>
  );
}

export default NewRecord;
