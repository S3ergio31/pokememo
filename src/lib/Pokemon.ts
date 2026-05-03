import getPokemonIcon from './PokemonAssets';

class Pokemon {
  private _pokemonNumber: number;

  constructor(pokemonNumber: number) {
    this._pokemonNumber = pokemonNumber;
  }

  equals(pokemon: Pokemon): boolean {
    return this.id === pokemon.id;
  }

  get id(): number {
    return this._pokemonNumber;
  }

  get image(): string {
    return getPokemonIcon(this._pokemonNumber);
  }

  get name(): string {
    return `pokemon_${this._pokemonNumber}`;
  }
}

export default Pokemon;
