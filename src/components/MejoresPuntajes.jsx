import { GameContext } from 'context/GameProvider';
import React, { useContext } from 'react';
import Modal from './Modal';
import NuevoRecord from './NuevoRecord';

const MejoresPuntajes = () => {
    const { 
        game_over, 
        records, 
        resetGame, 
        win, 
        new_record_saved,
        new_record
    } = useContext(GameContext);

    if(!new_record_saved && win && new_record){
        return <NuevoRecord />
    }

    return (
        <Modal title="Mejores puntajes" show={game_over} onAceptar={resetGame}>
            <table style={{margin: 'auto'}} cellSpacing="10">
                <thead>
                    <tr>
                        <th>Posición</th>
                        <th>Jugador</th>
                        <th>Rondas</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        records.map((puntaje, index) =>               
                            <tr key={index}>
                                <td style={{ textAlign: 'center' }}>{ index + 1 }</td>
                                <td style={{ textAlign: 'center' }}>{ puntaje.jugador }</td>
                                <td style={{ textAlign: 'center' }}>{ puntaje.rondas }</td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </Modal>
    );
}

export default MejoresPuntajes;