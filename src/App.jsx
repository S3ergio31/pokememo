import React from 'react';
import 'css/app.css';
import Tablero from 'components/Tablero';
import Header from 'components/Header';
import Body from 'components/Body';
import ModalMejoresPuntajes from 'components/ModalMejoresPuntajes';

const App = () => (
    <>
        <ModalMejoresPuntajes />
        <Header />
        <Body>
            <Tablero />
        </Body>
    </>
);

export default App;
