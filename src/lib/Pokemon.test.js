vi.mock('lib/PokemonAssets', () => ({ default: id => `pokemon_${id}.png` }));

import Pokemon from 'lib/Pokemon';

describe('Pokemon', () => {
    describe('equals', () => {
        it('returns true when both pokemons have the same id', () => {
            const a = new Pokemon(5);
            const b = new Pokemon(5);
            expect(a.equals(b)).toBe(true);
        });

        it('returns false when pokemons have different ids', () => {
            const a = new Pokemon(5);
            const b = new Pokemon(3);
            expect(a.equals(b)).toBe(false);
        });
    });

    describe('id', () => {
        it('returns the pokemon number passed to constructor', () => {
            expect(new Pokemon(7).id).toBe(7);
            expect(new Pokemon(1).id).toBe(1);
            expect(new Pokemon(50).id).toBe(50);
        });
    });

    describe('name', () => {
        it('returns pokemon_N format', () => {
            expect(new Pokemon(3).name).toBe('pokemon_3');
            expect(new Pokemon(10).name).toBe('pokemon_10');
        });
    });

    describe('image', () => {
        it('returns the asset path for the pokemon', () => {
            expect(new Pokemon(1).image).toBe('pokemon_1.png');
            expect(new Pokemon(42).image).toBe('pokemon_42.png');
        });
    });
});
