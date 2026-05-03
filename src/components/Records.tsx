import { useContext } from 'react';
import { GameContext } from 'context/GameProvider';
import Modal from './Modal';
import NewRecord from './NewRecord';
import type { StoredRecord } from 'lib/RecordsRepository';
import 'css/records.css';

const posMedal = (i: number): string => {
  if (i === 0) return 'pos-cell pos-gold';
  if (i === 1) return 'pos-cell pos-silver';
  if (i === 2) return 'pos-cell pos-bronze';
  return 'pos-cell';
};

function Records() {
  const { game_over, records, resetGame, win, new_record_saved, new_record } =
    useContext(GameContext);

  if (!new_record_saved && win && new_record) {
    return <NewRecord />;
  }

  return (
    <Modal title="Best records" show={game_over} onAccept={resetGame}>
      {records.length === 0 ? (
        <p className="records-empty">No records yet. Be the first!</p>
      ) : (
        <table className="records-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Player</th>
              <th>Rounds</th>
            </tr>
          </thead>
          <tbody>
            {records.map((record: StoredRecord, index: number) => (
              <tr key={index}>
                <td className={posMedal(index)}>{index + 1}</td>
                <td>{record.player}</td>
                <td>{record.rounds}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </Modal>
  );
}

export default Records;
