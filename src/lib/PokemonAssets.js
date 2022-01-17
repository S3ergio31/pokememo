const pokemonIcons = require.context('ico/pokemons');

const getPokemonIcon = id => {
    const resource_key = `./${id}.png`;
    const module = pokemonIcons(resource_key);
    return module.default;
}

export default getPokemonIcon;
