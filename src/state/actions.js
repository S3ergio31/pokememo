import PokemonsGenerator from "lib/PokemonsGenerator";
import { initialGameState } from "./reducer";
import RecordsRepository from "lib/RecordsRepository";

const actions = {
    selectPokemon: (state, action) => ({
        ...state,
        selected_pokemons: [
            ...state.selected_pokemons,
            action.payload
        ]
    }),

    resetGame: () => ({
        ...initialGameState,
        pokemons: PokemonsGenerator.build()
    }),

    newRound: state => ({
        ...state,
        selected_pokemons: [],
        incorrects: []
    }),

    failGame: state => ({
        ...state,
        fail: true
    }),

    addRecord: (state, action) => ({
        ...state,
        new_record: null,
        new_record_saved: RecordsRepository.save({
            record: state.new_record, 
            player: action.payload
        })
    })
};

export default actions;