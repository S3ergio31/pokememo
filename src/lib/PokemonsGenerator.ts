import Pokemon from './Pokemon';

export interface CardEntry {
  key: number;
  value: Pokemon;
}

const MAX_POKEMONS_TO_GENERATE = 11;
let key = 0;

class PokemonsGenerator {
  static build = (): CardEntry[] => {
    const generator = new PokemonsGenerator();
    const pokemonsPairs = generator.generatePokemonNumbersPairs();
    const shuffledPokemons = generator.shufflePokemonNumbers(pokemonsPairs);
    return generator.makePokemonsList(shuffledPokemons);
  };

  makePokemonsList = (pokemonNumbers: number[]): CardEntry[] =>
    pokemonNumbers.map(pokemonNumber => ({
      key: key++,
      value: new Pokemon(pokemonNumber),
    }));

  shufflePokemonNumbers = (pokemonNumbers: number[]): number[] =>
    [...pokemonNumbers].sort(() => 0.5 - Math.random());

  generatePokemonNumbersPairs = (): number[] => [
    ...this.generatePokemonNumbers(),
    ...this.generatePokemonNumbers(),
  ];

  generatePokemonNumbers = (): number[] =>
    this.removePokemonNumberZero(this.generateMaxNumberOfPokemons());

  generateMaxNumberOfPokemons = (): number[] =>
    [...Array(MAX_POKEMONS_TO_GENERATE).keys()];

  removePokemonNumberZero = (pokemonNumbers: number[]): number[] =>
    pokemonNumbers.filter(n => n !== 0);
}

export default PokemonsGenerator;
