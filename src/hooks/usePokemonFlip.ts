import { useContext, useEffect, useState } from 'react';
import { GameContext } from 'context/GameProvider';
import pokeball from 'ico/pokeball.png';
import type Pokemon from 'lib/Pokemon';

interface FlipResult {
  flip: string;
  image: string;
  handleFlip: () => void;
}

const existPokemonIn = (pokemons: Pokemon[], pokemon: Pokemon): boolean =>
  pokemons.some(p => p.equals(pokemon));

const usePokemonFlip = (pokemon: Pokemon): FlipResult => {
  const [found, setFound] = useState(false);
  const [visible, setVisible] = useState(false);

  const { found_pokemons, incorrects, selectPokemon, pair_has_been_selected, newRound } =
    useContext(GameContext);

  const handleFlip = (): void => {
    if (!found && !visible && !pair_has_been_selected) {
      setVisible(v => !v);
      selectPokemon(pokemon);
    }
  };

  const markFound = (): void => {
    if (!found && visible && existPokemonIn(found_pokemons, pokemon)) {
      setFound(true);
      newRound();
    }
  };

  const hideIncorrect = (): (() => void) | void => {
    if (!found && visible && existPokemonIn(incorrects, pokemon)) {
      const timer = setTimeout(() => {
        setVisible(false);
        newRound();
      }, 600);
      return () => clearTimeout(timer);
    }
  };

  useEffect(markFound, [found, newRound, visible, pokemon, found_pokemons]);
  useEffect(hideIncorrect, [found, newRound, visible, pokemon, incorrects]);

  return {
    flip: `pokemon ${visible ? 'flip' : ''}`,
    image: visible || found ? pokemon.image : pokeball,
    handleFlip,
  };
};

export default usePokemonFlip;
