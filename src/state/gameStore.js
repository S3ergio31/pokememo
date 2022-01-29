import RecordsRepository from "lib/RecordsRepository";

const buildState = (state, action) => ({
    ...state,
    round: getRound(state),
    win: isWin(state, action),
    game_over: isGameOver(state, action),
    selected_pokemons: getSelectedPokemons(state),
    found_pokemons: getFoundPokemons(state, action),
    incorrects: getIncorrects(state, action),
    pair_has_been_selected: pairHasBeenSelected(state),
    new_record: calculateNewRecord(state),
    records: RecordsRepository.records
});

const pairHasBeenSelected = state => state.selected_pokemons.length === 2;

const getRound = state => pairHasBeenSelected(state) ? state.round + 1 : state.round;

const isWin = (state, action) => getFoundPokemons(state, action).length === state.pokemons.length / 2

const isGameOver = state => state.win || state.fail;

const getSelectedPokemons = state => pairHasBeenSelected(state) ? [] : state.selected_pokemons;
    
const getFoundPokemons = (state, action) => {
    const matchWithSelectedPokemons = state.selected_pokemons.every(p => p.equals(action.payload));
    if(pairHasBeenSelected(state) && matchWithSelectedPokemons){
        return [...state.found_pokemons, action.payload];
    }
    return [...state.found_pokemons];
}

const getIncorrects = (state, action) => {
    const noMatchSomeSelected = state.selected_pokemons.some(p => !p.equals(action.payload));
    if(!pairHasBeenSelected(state)){
        return [];
    }
    if(pairHasBeenSelected(state) && noMatchSomeSelected){
        return [...state.selected_pokemons];
    }
    return [...state.incorrects]
}

const calculateNewRecord = state => {
    if(!state.round || !state.found_pokemons.length || state.new_record_saved) {
        return null;
    };
    return RecordsRepository.createRecord(state.round);

}

export default buildState;