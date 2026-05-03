import { createContext, type ReactNode } from 'react';
import useGame from 'hooks/useGame';
import type { GameState, GameActions } from 'state/reducer';

export type GameContextValue = GameState & GameActions;

export const GameContext = createContext<GameContextValue>(null!);

function GameProvider({ children }: { children: ReactNode }) {
  return (
    <GameContext.Provider value={useGame()}>
      {children}
    </GameContext.Provider>
  );
}

export default GameProvider;
