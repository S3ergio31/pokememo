import 'css/pokemon.css';
import pokeball from 'ico/pokeball.png';
import usePokemonFlip from 'hooks/usePokemonFlip';
import type PokemonModel from 'lib/Pokemon';

function Pokemon({ pokemon }: { pokemon: PokemonModel }) {
  const { isFlipped, isFound, isIncorrect, handleFlip } = usePokemonFlip(pokemon);

  const cardClass = [
    'pokemon-card',
    isFlipped   ? 'flipped'   : '',
    isFound     ? 'found'     : '',
    isIncorrect ? 'incorrect' : '',
  ].filter(Boolean).join(' ');

  return (
    <div className={cardClass} onClick={handleFlip}>
      <div className="pokemon-card-inner">
        <div className="pokemon-card-face pokemon-card-front">
          <img src={pokeball} alt="" />
        </div>
        <div className="pokemon-card-face pokemon-card-back">
          <img src={pokemon.image} alt={pokemon.name} />
        </div>
      </div>
    </div>
  );
}

export default Pokemon;
