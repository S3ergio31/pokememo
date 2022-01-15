import PokemonsGenerator from "lib/PokemonsGenerator";
import { initialGameState } from "./reducer";
import RecordsRepository from "lib/RecordsRepository";

const acciones = {
    seleccionarPokemon: (state, action) => ({
        ...state,
        seleccionados: [
            ...state.seleccionados,
            action.payload
        ]
    }),

    resetGame: () => ({
        ...initialGameState,
        pokemons: PokemonsGenerator.build()
    }),

    nuevaRonda: state => ({
        ...state,
        seleccionados: [],
        incorrectos: []
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
            jugador: action.payload
        })
    })
};

export default acciones;