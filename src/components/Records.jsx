import { GameContext } from 'context/GameProvider';
import React, { useContext } from 'react';
import Modal from './Modal';
import NewRecord from './NewRecord';

const Records = () => {
    const { 
        game_over, 
        records, 
        resetGame, 
        win, 
        new_record_saved,
        new_record
    } = useContext(GameContext);

    if(!new_record_saved && win && new_record){
        return <NewRecord />
    }

    return (
        <Modal title="Best records" show={game_over} onAccept={resetGame}>
            <table style={{margin: 'auto'}} cellSpacing="10">
                <thead>
                    <tr>
                        <th>Position</th>
                        <th>Player</th>
                        <th>Rounds</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        records.map((puntaje, index) =>               
                            <tr key={index}>
                                <td style={{ textAlign: 'center' }}>{ index + 1 }</td>
                                <td style={{ textAlign: 'center' }}>{ puntaje.player }</td>
                                <td style={{ textAlign: 'center' }}>{ puntaje.rounds }</td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </Modal>
    );
}

export default Records;