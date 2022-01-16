import React from 'react';
import 'css/app.css';
import Tablero from 'components/Tablero';
import Header from 'components/Header';
import Body from 'components/Body';
import MejoresPuntajes from 'components/MejoresPuntajes';
import GameProvider from 'context/GameProvider';

const App = () => (
    <GameProvider>
        <MejoresPuntajes />
        <Header />
        <Body>
            <Tablero />
        </Body>
    </GameProvider>
);

export default App;
