import 'css/pokemon.css';
import usePokemonFlip from 'hooks/usePokemonFlip';
import type PokemonModel from 'lib/Pokemon';

function Pokemon({ pokemon }: { pokemon: PokemonModel }) {
  const { flip, image, handleFlip } = usePokemonFlip(pokemon);
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
