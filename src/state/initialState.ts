import PokemonsGenerator from 'lib/PokemonsGenerator';
import type { GameState } from './reducer';

export const initialGameState: GameState = {
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
  incorrects: [],
};
