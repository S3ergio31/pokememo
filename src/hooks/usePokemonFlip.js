import { useContext, useEffect, useState } from 'react';
import { GameContext } from 'context/GameProvider';
import pokeball from 'ico/pokeball.png';

const existPokemonIn = (pokemons, pokemon) => pokemons.some(p => p.equals(pokemon));

const usePokemonFlip = pokemon => {
    const [found, setFound] = useState(false);
    const [visible, setVisible] = useState(false);

    const { 
        found_pokemons,
        incorrects,
        selectPokemon,
        pair_has_been_selected,
        newRound
    } = useContext(GameContext);

    const handleFlip = () => {
        const canFlip = !found && !visible && !pair_has_been_selected;
        if(canFlip){
            setVisible(visible => !visible);
            selectPokemon(pokemon);
        }
    }

    const markFound = () => {
        const pairIsCorrect = !found && visible && existPokemonIn(found_pokemons, pokemon);
        if(pairIsCorrect){
            setFound(true);
            newRound();
        }
    }

    const hideIncorrect = () => {
        const pairIsIncorrect = !found && visible && existPokemonIn(incorrects, pokemon);
        if(pairIsIncorrect){
            const timer = setTimeout(
                () => {
                    setVisible(false);
                    newRound();
                },
                600
            );
            return () => !visible && clearTimeout(timer);
        }
    }

    useEffect(
        markFound, 
        [found, newRound, visible, pokemon, found_pokemons]
    );

    useEffect(
        hideIncorrect, 
        [found, newRound, visible, pokemon, incorrects]
    );

    return {
        flip: `pokemon ${visible ? 'flip' : ''}`,
        image: visible || found ? pokemon.image : pokeball,
        handleFlip
    }
}

export default usePokemonFlip;