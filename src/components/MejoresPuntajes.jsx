import { GameContext } from 'context/GameProvider';
import React, { useContext } from 'react';
import Modal from './Modal';

const puntajes = [
    {
        posicion: 1,
        jugador: "Sergio",
        rondas: 25,
        puntos: 14
    }
];

const MejoresPuntajes = () => {
    const { juego_terminado } = useContext(GameContext);
    return (
        <Modal title="Mejores puntajes" show={juego_terminado}>
            <table style={{margin: 'auto'}}>
                <thead>
                    <tr>
                        <th>Posición</th>
                        <th>Jugador</th>
                        <th>Rondas</th>
                        <th>Puntaje</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        puntajes.map(puntaje =>               
                            <tr key={puntaje.jugador}>
                                <td>{ puntaje.posicion }</td>
                                <td>{ puntaje.jugador }</td>
                                <td>{ puntaje.rondas }</td>
                                <td>{ puntaje.puntos }</td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </Modal>
    );
}

export default MejoresPuntajes;