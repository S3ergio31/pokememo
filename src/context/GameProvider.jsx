import React from 'react';
import useGame from 'hooks/useGame';

const GameContext = React.createContext();

const GameProvider = ({children}) => (
    <GameContext.Provider value={useGame()}>
        {children}
    </GameContext.Provider>
);

export default GameProvider;
export { GameContext }