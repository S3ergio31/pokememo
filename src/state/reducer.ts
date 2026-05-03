import { type Dispatch } from 'react';
import buildState from './gameStore';
import actions from 'state/actions';
import { initialGameState } from './initialState';
import type { CardEntry } from 'lib/PokemonsGenerator';
import type { GameRecord, StoredRecord } from 'lib/RecordsRepository';
import type Pokemon from 'lib/Pokemon';

export interface GameState {
  round: number;
  pair_has_been_selected: boolean;
  win: boolean;
  game_over: boolean;
  new_record_saved: boolean;
  new_record: GameRecord | null;
  records: StoredRecord[];
  fail: boolean;
  pokemons: CardEntry[];
  selected_pokemons: Pokemon[];
  found_pokemons: Pokemon[];
  incorrects: Pokemon[];
}

export type GameAction =
  | { type: 'selectPokemon'; payload: Pokemon }
  | { type: 'resetGame' }
  | { type: 'newRound' }
  | { type: 'failGame' }
  | { type: 'addRecord'; payload: string };

export interface GameActions {
  selectPokemon: (pokemon: Pokemon) => void;
  resetGame: () => void;
  newRound: () => void;
  failGame: () => void;
  addRecord: (name: string) => void;
}

export const gameReducer = (state: GameState, action: GameAction): GameState =>
  buildState(applyAction(state, action), action);

const applyAction = (state: GameState, action: GameAction): GameState => {
  switch (action.type) {
    case 'selectPokemon': return actions.selectPokemon(state, action.payload);
    case 'resetGame':     return actions.resetGame();
    case 'newRound':      return actions.newRound(state);
    case 'failGame':      return actions.failGame(state);
    case 'addRecord':     return actions.addRecord(state, action.payload);
    default: {
      const { type } = action as unknown as { type: string };
      throw new Error(`the action type "${type}" is not defined in state/actions`);
    }
  }
};

export const getGameActions = (dispatch: Dispatch<GameAction>): GameActions => ({
  selectPokemon: (pokemon) => dispatch({ type: 'selectPokemon', payload: pokemon }),
  resetGame:     ()        => dispatch({ type: 'resetGame' }),
  newRound:      ()        => dispatch({ type: 'newRound' }),
  failGame:      ()        => dispatch({ type: 'failGame' }),
  addRecord:     (name)    => dispatch({ type: 'addRecord', payload: name }),
});

export { initialGameState };
