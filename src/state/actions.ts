import PokemonsGenerator from 'lib/PokemonsGenerator';
import { initialGameState } from './initialState';
import RecordsRepository from 'lib/RecordsRepository';
import type Pokemon from 'lib/Pokemon';
import type { GameState } from './reducer';

const actions = {
  selectPokemon: (state: GameState, pokemon: Pokemon): GameState => ({
    ...state,
    selected_pokemons: [...state.selected_pokemons, pokemon],
  }),

  resetGame: (): GameState => ({
    ...initialGameState,
    pokemons: PokemonsGenerator.build(),
  }),

  newRound: (state: GameState): GameState => ({
    ...state,
    selected_pokemons: [],
    incorrects: [],
  }),

  failGame: (state: GameState): GameState => ({
    ...state,
    fail: true,
  }),

  addRecord: (state: GameState, player: string): GameState => {
    if (!state.new_record) return state;
    return {
      ...state,
      new_record: null,
      new_record_saved: RecordsRepository.save({ record: state.new_record, player }),
    };
  },
};

export default actions;
