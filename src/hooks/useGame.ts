import { useReducer } from 'react';
import { gameReducer, initialGameState, getGameActions } from 'state/reducer';
import type { GameState, GameActions } from 'state/reducer';

const useGame = (): GameState & GameActions => {
  const [state, dispatch] = useReducer(gameReducer, initialGameState);
  return {
    ...state,
    ...getGameActions(dispatch),
  };
};

export default useGame;
