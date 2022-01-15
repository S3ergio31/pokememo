import Pokemon from "./Pokemon";

const MAX_POKEMONS_TO_GENERATE = 11;
let key = 0;

class PokemonsGenerator {
    static build = () => {
        const generator = new PokemonsGenerator();
        const pokemonsPairs = generator.generatePokemonNumbersPairs();
        const shufflePokemons = generator.shufflePokemonNumbers(pokemonsPairs);
        return generator.makePokemonsList(shufflePokemons);
    }

    makePokemonsList = pokemonNumbers => pokemonNumbers.map(
        pokemonNumber => ({
            key: key++,
            value: new Pokemon(pokemonNumber)
        })
    );
    
    shufflePokemonNumbers = pokemonNumbers => pokemonNumbers.sort(
        () => 0.5 - Math.random()
    );
    
    generatePokemonNumbersPairs = () => [
        ...this.generatePokemonNumbers(), 
        ...this.generatePokemonNumbers()
    ];

    generatePokemonNumbers = () => (
        this.removePokemonNumberZero(
            this.generateMaxNumberOfPokemons()
        )
    );

    generateMaxNumberOfPokemons = () => [...Array(MAX_POKEMONS_TO_GENERATE).keys()];
    
    removePokemonNumberZero = pokemonNumbers => pokemonNumbers.filter(
        pokemonNumber => pokemonNumber !== 0
    );

}

export default PokemonsGenerator;

