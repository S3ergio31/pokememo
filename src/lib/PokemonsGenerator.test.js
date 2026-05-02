vi.mock('lib/PokemonAssets', () => ({ default: id => `pokemon_${id}.png` }));

import PokemonsGenerator from 'lib/PokemonsGenerator';
import Pokemon from 'lib/Pokemon';

describe('PokemonsGenerator', () => {
    let deck;

    beforeEach(() => {
        deck = PokemonsGenerator.build();
    });

    it('generates 20 cards (10 pairs)', () => {
        expect(deck).toHaveLength(20);
    });

    it('each card has a numeric key and a Pokemon as value', () => {
        deck.forEach(card => {
            expect(typeof card.key).toBe('number');
            expect(card.value).toBeInstanceOf(Pokemon);
        });
    });

    it('all card keys are unique', () => {
        const keys = deck.map(c => c.key);
        expect(new Set(keys).size).toBe(deck.length);
    });

    it('generates exactly 10 unique pokemon ids', () => {
        const uniqueIds = new Set(deck.map(c => c.value.id));
        expect(uniqueIds.size).toBe(10);
    });

    it('each pokemon appears exactly twice (one pair)', () => {
        const counts = {};
        deck.forEach(c => {
            counts[c.value.id] = (counts[c.value.id] || 0) + 1;
        });
        Object.values(counts).forEach(count => expect(count).toBe(2));
    });

    it('no card has pokemon id 0', () => {
        deck.forEach(card => expect(card.value.id).not.toBe(0));
    });

    it('produces a different order on successive calls (shuffled)', () => {
        const second = PokemonsGenerator.build();
        const firstIds = deck.map(c => c.value.id).join(',');
        const secondIds = second.map(c => c.value.id).join(',');
        // There's a ~1/(20!) chance this fails by coincidence — acceptable
        expect(firstIds).not.toBe(secondIds);
    });
});
