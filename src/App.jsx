import React from 'react';
import 'css/app.css';
import Dashboard from 'components/Dashboard';
import Header from 'components/Header';
import Body from 'components/Body';
import Records from 'components/Records';
import GameProvider from 'context/GameProvider';

const App = () => (
    <GameProvider>
        <Records />
        <Header />
        <Body>
            <Dashboard />
        </Body>
    </GameProvider>
);

export default App;
