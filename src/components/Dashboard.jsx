import React, { useContext } from 'react';
import Pokemon from 'components/Pokemon';
import { GameContext } from 'context/GameProvider';

const Dashboard = () => (
    useContext(GameContext).pokemons.map( 
        pokemon => 
        <Pokemon 
            key={pokemon.key}
            pokemon={pokemon.value} 
        /> 
    )
);

export default Dashboard;
