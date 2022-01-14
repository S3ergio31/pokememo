import PokemonsGenerator from "lib/PokemonsGenerator";
import acciones from "./actions";
import buildState from "./gameStore";
import actions from "state/actions";

const initialGameState = {
    ronda: 0,
    parFueSeleccionado: false,
    juego_ganado: false,
    juego_terminado: false,
    fail: false,
    pokemons: PokemonsGenerator.build(),
    seleccionados: [],
    encontrados: [],
    incorrectos: []
}

const gameReducer = (state, action) => buildState(dispatch(state, action), action);

const dispatch = (state, action) => {
    const actionToInvoke = acciones[action.type];
    if(!actionToInvoke) {
        throw new Error(`La acción del tipo "${action.type}" no está definida en state/actions`);
    }
    return actionToInvoke(state, action);
}

const getGameActions = dispatch => {
    const reduceActions = (reducedActions, action) => ({
        ...reducedActions,
        [action.name]: function(payload = {}){
            dispatch({type: action.name, payload})
        }
    });
    return Object.values(actions).reduce(reduceActions, {});
}

export { 
    gameReducer, 
    initialGameState,
    getGameActions
};