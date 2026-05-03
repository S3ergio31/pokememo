interface PngModule {
  default: string;
}

const pokemonIcons = import.meta.glob('../ico/pokemons/*.png', { eager: true }) as Record<string, PngModule>;

const getPokemonIcon = (id: number): string => {
  const icon = pokemonIcons[`../ico/pokemons/${id}.png`] as PngModule | undefined;
  return icon?.default ?? '';
};

export default getPokemonIcon;
