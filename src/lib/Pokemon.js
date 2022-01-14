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
        return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${this._pokemonNumber}.png`;
    }

    get name() {
        return `pokemon_${this._pokemonNumber}`;
    }
}

export default Pokemon;