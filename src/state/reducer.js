import PokemonsGenerator from "lib/PokemonsGenerator";
import buildState from "./gameStore";
import actions from "state/actions";

const initialGameState = {
    round: 0,
    pair_has_been_selected: false,
    win: false,
    game_over: false,
    new_record_saved: false,
    new_record: null,
    records: [],
    fail: false,
    pokemons: PokemonsGenerator.build(),
    selected_pokemons: [],
    found_pokemons: [],
    incorrects: []
}

const gameReducer = (state, action) => buildState(dispatch(state, action), action);

const dispatch = (state, action) => {
    const actionToInvoke = actions[action.type];
    if(!actionToInvoke) {
        throw new Error(`the action type "${action.type}" is not defined in state/actions`);
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