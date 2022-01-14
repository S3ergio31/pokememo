import { useReducer } from "react";
import { gameReducer, initialGameState, getGameActions } from "state/reducer";

const useGame = () => {
    const [state, dispatch] = useReducer(gameReducer, initialGameState);
    return { 
        ...state,
        ...getGameActions(dispatch)
    }
}

export default useGame;