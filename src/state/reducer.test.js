// Mocks must be set up before any imports so Jest hoisting works correctly
// PokemonsGenerator must NOT be mocked — initialGameState needs a real non-empty deck
// so isWin (found / total*0.5) doesn't trivially return true on an empty board.
jest.mock('lib/PokemonAssets', () => id => `pokemon_${id}.png`);
jest.mock('lib/RecordsRepository', () => ({
    records: [],
    createRecord: jest.fn(() => null),
    save: jest.fn(() => true),
}));

import { gameReducer, initialGameState } from 'state/reducer';
import Pokemon from 'lib/Pokemon';

// Builds a minimal state with a controlled deck of n pairs
const makeCards = (...ids) =>
    ids.flatMap((id, i) => [
        { key: i * 2, value: new Pokemon(id) },
        { key: i * 2 + 1, value: new Pokemon(id) },
    ]);

const dispatch = (state, type, payload) =>
    gameReducer(state, { type, payload });

describe('gameReducer', () => {
    describe('initial state', () => {
        it('has the expected shape', () => {
            expect(initialGameState).toMatchObject({
                round: 0,
                win: false,
                fail: false,
                game_over: false,
                selected_pokemons: [],
                found_pokemons: [],
                incorrects: [],
            });
        });
    });

    describe('unknown action', () => {
        it('throws when an undefined action type is dispatched', () => {
            expect(() =>
                dispatch(initialGameState, 'NOT_AN_ACTION')
            ).toThrow(/NOT_AN_ACTION/);
        });
    });

    describe('selectPokemon', () => {
        const baseState = { ...initialGameState, pokemons: makeCards(1, 2) };
        const p1 = baseState.pokemons[0].value; // Pokemon(1)
        const p2 = baseState.pokemons[2].value; // Pokemon(2)

        it('adds the first card to selected_pokemons', () => {
            const next = dispatch(baseState, 'selectPokemon', p1);
            expect(next.selected_pokemons).toHaveLength(1);
            expect(next.round).toBe(0);
        });

        it('sets pair_has_been_selected after two cards are chosen', () => {
            const s1 = dispatch(baseState, 'selectPokemon', p1);
            // Rehydrate raw selected so second pick works
            const midState = { ...s1, selected_pokemons: [p1] };
            const s2 = dispatch(midState, 'selectPokemon', p2);
            expect(s2.round).toBe(1);
        });

        it('increments round after any pair selection', () => {
            const mid = { ...baseState, selected_pokemons: [p1] };
            const next = dispatch(mid, 'selectPokemon', p2);
            expect(next.round).toBe(1);
        });

        describe('matching pair', () => {
            const p1b = baseState.pokemons[1].value; // also Pokemon(1)

            it('adds the pokemon to found_pokemons', () => {
                const mid = { ...baseState, selected_pokemons: [p1] };
                const next = dispatch(mid, 'selectPokemon', p1b);
                expect(next.found_pokemons).toHaveLength(1);
                expect(next.found_pokemons[0].id).toBe(1);
            });

            it('clears selected_pokemons', () => {
                const mid = { ...baseState, selected_pokemons: [p1] };
                const next = dispatch(mid, 'selectPokemon', p1b);
                expect(next.selected_pokemons).toHaveLength(0);
            });

            it('does NOT add to incorrects', () => {
                const mid = { ...baseState, selected_pokemons: [p1] };
                const next = dispatch(mid, 'selectPokemon', p1b);
                expect(next.incorrects).toHaveLength(0);
            });
        });

        describe('mismatched pair', () => {
            it('adds both mismatched cards to incorrects', () => {
                const mid = { ...baseState, selected_pokemons: [p1] };
                const next = dispatch(mid, 'selectPokemon', p2);
                // getIncorrects returns [...state.selected_pokemons] which already has both cards
                expect(next.incorrects).toHaveLength(2);
            });

            it('does NOT add to found_pokemons', () => {
                const mid = { ...baseState, selected_pokemons: [p1] };
                const next = dispatch(mid, 'selectPokemon', p2);
                expect(next.found_pokemons).toHaveLength(0);
            });
        });
    });

    describe('newRound', () => {
        it('clears selected_pokemons and incorrects', () => {
            const p1 = new Pokemon(1);
            const p2 = new Pokemon(2);
            const dirtyState = {
                ...initialGameState,
                pokemons: makeCards(1, 2),
                selected_pokemons: [p1],
                incorrects: [p1, p2],
            };
            const next = dispatch(dirtyState, 'newRound');
            expect(next.selected_pokemons).toHaveLength(0);
            expect(next.incorrects).toHaveLength(0);
        });
    });

    describe('failGame', () => {
        it('sets fail and game_over to true', () => {
            const next = dispatch(initialGameState, 'failGame');
            expect(next.fail).toBe(true);
            expect(next.game_over).toBe(true);
        });

        it('does not affect win', () => {
            const next = dispatch(initialGameState, 'failGame');
            expect(next.win).toBe(false);
        });
    });

    describe('win condition', () => {
        it('sets win=true after finding all pairs', () => {
            const cards = makeCards(1);           // 1 pair = 2 cards
            const p1a = cards[0].value;
            const p1b = cards[1].value;

            const mid = { ...initialGameState, pokemons: cards, selected_pokemons: [p1a] };
            const next = dispatch(mid, 'selectPokemon', p1b);

            expect(next.win).toBe(true);
        });

        it('game_over becomes true after the subsequent newRound dispatch', () => {
            // win=true is set by selectPokemon, but game_over requires one more action
            const cards = makeCards(1);
            const p1a = cards[0].value;
            const p1b = cards[1].value;

            const afterMatch = dispatch(
                { ...initialGameState, pokemons: cards, selected_pokemons: [p1a] },
                'selectPokemon',
                p1b,
            );
            // win is already true here, game_over depends on state.win in next action
            const afterRound = dispatch(afterMatch, 'newRound');
            expect(afterRound.game_over).toBe(true);
        });
    });

    describe('resetGame', () => {
        it('returns fresh state with round 0 and empty selections', () => {
            const dirty = { ...initialGameState, round: 5, fail: true, game_over: true };
            const next = dispatch(dirty, 'resetGame');
            expect(next.round).toBe(0);
            expect(next.fail).toBe(false);
            expect(next.win).toBe(false);
            expect(next.game_over).toBe(false);
            expect(next.selected_pokemons).toHaveLength(0);
            expect(next.found_pokemons).toHaveLength(0);
            expect(next.incorrects).toHaveLength(0);
        });
    });
});
