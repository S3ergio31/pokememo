import getPokemonIcon from './PokemonAssets';

class Pokemon {
    constructor(pokemonNumber){
        this._pokemonNumber = pokemonNumber;
    }

    equals(pokemon){
        return this.id === pokemon.id;
    }

    get id(){
        return this._pokemonNumber;
    }

    get image(){
        return getPokemonIcon(this._pokemonNumber);
    }

    get name() {
        return `pokemon_${this._pokemonNumber}`;
    }
}

export default Pokemon;