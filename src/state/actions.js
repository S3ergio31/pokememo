import PokemonsGenerator from "lib/PokemonsGenerator";
import { initialGameState } from "./reducer";

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
    })
};

export default acciones;