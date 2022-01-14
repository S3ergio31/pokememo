import React from 'react';
import 'css/pokemon.css';
import usePokemonFlip from 'hooks/usePokemonFlip';

const Pokemon = ({pokemon}) => {
    const { 
        flip, 
        image, 
        handleFlip 
    } = usePokemonFlip(pokemon);
    return (
        <img 
            className={flip}
            src={image} 
            alt={pokemon.name}
            onClick={handleFlip}
        />
    );
}

export default Pokemon;