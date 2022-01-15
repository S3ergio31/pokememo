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
    }),

    failGame: state => ({
        ...state,
        fail: true
    }),

    addRecord: (state, action) => {
        const lader = state.records;
        let newRecord = null;
        if(lader.length === 10){
            const last = lader.pop();
            if(state.ronda <= last.rondas && state.encontrados.length >= last.puntos){
                newRecord = {
                    jugador: action.payload,
                    rondas: state.ronda,
                    puntos: state.encontrados.length
                }
            }
            else {
                newRecord = last;
            }

        }
        else {
            newRecord = {
                jugador: action.payload,
                rondas: state.ronda,
                puntos: state.encontrados.length
            }
        }
        localStorage.setItem(
            'records', 
            JSON.stringify([...lader, newRecord])
        );
        return {
            ...state,
            new_record: null,
            new_record_saved: true
        }
    }
};

export default acciones;