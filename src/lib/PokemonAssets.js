// import.meta.glob replaces CRA's webpack require.context
const pokemonIcons = import.meta.glob('../ico/pokemons/*.png', { eager: true });

const getPokemonIcon = id => {
    const key = `../ico/pokemons/${id}.png`;
    return pokemonIcons[key]?.default;
}

export default getPokemonIcon;
