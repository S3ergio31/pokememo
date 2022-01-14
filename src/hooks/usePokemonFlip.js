import { useContext, useEffect, useState } from 'react';
import { GameContext } from 'context/GameProvider';
import pokeball from 'ico/pokeball.png';

const existPokemonIn = (pokemons, pokemon) => pokemons.some(p => p.equals(pokemon));

const usePokemonFlip = pokemon => {
    const [encontrado, setEncontrado] = useState(false);
    const [visible, setVisible] = useState(false);

    const { 
        encontrados,
        incorrectos,
        seleccionarPokemon,
        parFueSeleccionado,
        nuevaRonda
    } = useContext(GameContext);

    const handleFlip = () => {
        const canFlip = !encontrado && !visible && !parFueSeleccionado;
        if(canFlip){
            setVisible(visible => !visible);
            seleccionarPokemon(pokemon);
        }
    }

    const marcarEncontrado = () => {
        const parEsCorrecto = !encontrado && visible && existPokemonIn(encontrados, pokemon);
        if(parEsCorrecto){
            setEncontrado(true);
            nuevaRonda();
        }
    }

    const esconderIncorrectos = () => {
        const parEsIncorrecto = !encontrado && visible && existPokemonIn(incorrectos, pokemon);
        if(parEsIncorrecto){
            const timer = setTimeout(
                () => {
                    setVisible(false);
                    nuevaRonda()
                },
                1000
            );
            return () => clearTimeout(timer);
        }
    }

    useEffect(
        marcarEncontrado, 
        [encontrado, nuevaRonda, visible, pokemon, encontrados]
    );

    useEffect(
        esconderIncorrectos, 
        [encontrado, nuevaRonda, visible, pokemon, incorrectos]
    );

    return {
        flip: `pokemon ${visible ? 'flip' : ''}`,
        image: visible || encontrado ? pokemon.image : pokeball,
        handleFlip
    }
}

export default usePokemonFlip;