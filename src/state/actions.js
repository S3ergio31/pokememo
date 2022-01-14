import PokemonsGenerator from "lib/PokemonsGenerator";
import { initialGameState } from "./reducer";

const seleccionarPokemon = (state, action) => {
    return {
        ...state,
        seleccionados: [
            ...state.seleccionados,
            action.payload
        ]
    }
};

const resetGame = () => ({
    ...initialGameState,
    pokemons: PokemonsGenerator.build()
});

const nuevaRonda = state => {
    return {
        ...state,
        seleccionados: [],
        incorrectos: []
    }
}

const acciones = {
    seleccionarPokemon,
    resetGame,
    nuevaRonda
};

export default acciones;