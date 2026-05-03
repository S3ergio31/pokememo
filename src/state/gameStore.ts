import RecordsRepository from 'lib/RecordsRepository';
import type { GameRecord } from 'lib/RecordsRepository';
import type Pokemon from 'lib/Pokemon';
import type { GameState, GameAction } from './reducer';

const buildState = (state: GameState, action: GameAction): GameState => ({
  ...state,
  round: getRound(state),
  win: isWin(state, action),
  game_over: isGameOver(state),
  selected_pokemons: getSelectedPokemons(state),
  found_pokemons: getFoundPokemons(state, action),
  incorrects: getIncorrects(state, action),
  pair_has_been_selected: pairHasBeenSelected(state),
  new_record: calculateNewRecord(state),
  records: RecordsRepository.records,
});

const pairHasBeenSelected = (state: GameState): boolean =>
  state.selected_pokemons.length === 2;

const getRound = (state: GameState): number =>
  pairHasBeenSelected(state) ? state.round + 1 : state.round;

const isWin = (state: GameState, action: GameAction): boolean =>
  getFoundPokemons(state, action).length === state.pokemons.length / 2;

const isGameOver = (state: GameState): boolean => state.win || state.fail;

const getSelectedPokemons = (state: GameState): Pokemon[] =>
  pairHasBeenSelected(state) ? [] : state.selected_pokemons;

const getFoundPokemons = (state: GameState, action: GameAction): Pokemon[] => {
  if (action.type !== 'selectPokemon') return [...state.found_pokemons];
  const { payload } = action;
  const matchWithSelected = state.selected_pokemons.every(p => p.equals(payload));
  if (pairHasBeenSelected(state) && matchWithSelected) {
    return [...state.found_pokemons, payload];
  }
  return [...state.found_pokemons];
};

const getIncorrects = (state: GameState, action: GameAction): Pokemon[] => {
  if (!pairHasBeenSelected(state)) return [];
  if (action.type !== 'selectPokemon') return [...state.incorrects];
  const { payload } = action;
  const noMatchSomeSelected = state.selected_pokemons.some(p => !p.equals(payload));
  return noMatchSomeSelected ? [...state.selected_pokemons] : [...state.incorrects];
};

const calculateNewRecord = (state: GameState): GameRecord | null => {
  if (!state.round || !state.found_pokemons.length || state.new_record_saved) return null;
  return RecordsRepository.createRecord(state.round);
};

export default buildState;
