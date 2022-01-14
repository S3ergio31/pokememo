import React from 'react';
import 'css/app.css';
import Tablero from 'components/Tablero';
import Header from 'components/Header';
import Body from 'components/Body';
import MejoresPuntajes from 'components/MejoresPuntajes';

const App = () => (
    <>
        <MejoresPuntajes />
        <Header />
        <Body>
            <Tablero />
        </Body>
    </>
);

export default App;
