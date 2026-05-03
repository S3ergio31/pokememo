import { useContext } from 'react';
import { GameContext } from 'context/GameProvider';
import Modal from './Modal';
import NewRecord from './NewRecord';
import type { StoredRecord } from 'lib/RecordsRepository';

function Records() {
  const { game_over, records, resetGame, win, new_record_saved, new_record } =
    useContext(GameContext);

  if (!new_record_saved && win && new_record) {
    return <NewRecord />;
  }

  return (
    <Modal title="Best records" show={game_over} onAccept={resetGame}>
      <table style={{ margin: 'auto' }} cellSpacing="10">
        <thead>
          <tr>
            <th>Position</th>
            <th>Player</th>
            <th>Rounds</th>
          </tr>
        </thead>
        <tbody>
          {records.map((record: StoredRecord, index: number) => (
            <tr key={index}>
              <td style={{ textAlign: 'center' }}>{index + 1}</td>
              <td style={{ textAlign: 'center' }}>{record.player}</td>
              <td style={{ textAlign: 'center' }}>{record.rounds}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Modal>
  );
}

export default Records;
