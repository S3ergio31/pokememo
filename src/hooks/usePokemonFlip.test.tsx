vi.mock('lib/PokemonAssets', () => ({ default: (id: number) => `pokemon_${id}.png` }));
vi.mock('ico/pokeball.png', () => ({ default: 'pokeball.png' }));

import { render, fireEvent, act } from '@testing-library/react';
import { GameContext } from 'context/GameProvider';
import type { GameContextValue } from 'context/GameProvider';
import usePokemonFlip from 'hooks/usePokemonFlip';
import Pokemon from 'lib/Pokemon';

function FlipCard({ pokemon }: { pokemon: Pokemon }) {
    const { flip, image, handleFlip } = usePokemonFlip(pokemon);
    return (
        <div data-testid="card" className={flip} onClick={handleFlip}>
            <img data-testid="img" src={image} alt="" />
        </div>
    );
}

const makeContext = (overrides: Partial<GameContextValue> = {}): GameContextValue => ({
    selectPokemon: vi.fn(),
    newRound: vi.fn(),
    found_pokemons: [],
    incorrects: [],
    pair_has_been_selected: false,
    ...overrides,
} as GameContextValue);

function renderCard(pokemon: Pokemon, contextValue: GameContextValue) {
    return render(
        <GameContext.Provider value={contextValue}>
            <FlipCard pokemon={pokemon} />
        </GameContext.Provider>
    );
}

describe('usePokemonFlip', () => {
    const pokemon = new Pokemon(1);

    describe('initial state', () => {
        it('shows the pokeball (face-down) before any flip', () => {
            const { getByTestId } = renderCard(pokemon, makeContext());
            expect((getByTestId('img') as HTMLImageElement).src).toContain('pokeball.png');
        });

        it('does not apply the flip CSS class initially', () => {
            const { getByTestId } = renderCard(pokemon, makeContext());
            expect(getByTestId('card').className).not.toContain('flip');
        });
    });

    describe('handleFlip', () => {
        it('flips the card and shows the pokemon image on click', () => {
            const ctx = makeContext();
            const { getByTestId } = renderCard(pokemon, ctx);

            fireEvent.click(getByTestId('card'));

            expect(getByTestId('card').className).toContain('flip');
            expect((getByTestId('img') as HTMLImageElement).src).toContain('pokemon_1.png');
            expect(ctx.selectPokemon).toHaveBeenCalledWith(pokemon);
        });

        it('does nothing when a pair is already being evaluated', () => {
            const ctx = makeContext({ pair_has_been_selected: true });
            const { getByTestId } = renderCard(pokemon, ctx);

            fireEvent.click(getByTestId('card'));

            expect(getByTestId('card').className).not.toContain('flip');
            expect(ctx.selectPokemon).not.toHaveBeenCalled();
        });

        it('does nothing when the card is already face-up (prevents double-selecting)', () => {
            const ctx = makeContext();
            const { getByTestId } = renderCard(pokemon, ctx);

            fireEvent.click(getByTestId('card')); // first click — flips
            fireEvent.click(getByTestId('card')); // second click — should be ignored

            expect(ctx.selectPokemon).toHaveBeenCalledTimes(1);
        });
    });

    describe('when in found_pokemons', () => {
        it('marks the card as permanently found and calls newRound', () => {
            const ctx = makeContext();
            const { getByTestId, rerender } = renderCard(pokemon, ctx);

            fireEvent.click(getByTestId('card'));

            rerender(
                <GameContext.Provider value={{ ...ctx, found_pokemons: [pokemon] }}>
                    <FlipCard pokemon={pokemon} />
                </GameContext.Provider>
            );

            expect(ctx.newRound).toHaveBeenCalled();
            expect((getByTestId('img') as HTMLImageElement).src).toContain('pokemon_1.png');
        });

        it('does not flip again once found (handleFlip is a no-op)', () => {
            const ctx = makeContext();
            const { getByTestId, rerender } = renderCard(pokemon, ctx);

            fireEvent.click(getByTestId('card'));

            rerender(
                <GameContext.Provider value={{ ...ctx, found_pokemons: [pokemon] }}>
                    <FlipCard pokemon={pokemon} />
                </GameContext.Provider>
            );

            vi.mocked(ctx.selectPokemon).mockClear();
            fireEvent.click(getByTestId('card'));
            expect(ctx.selectPokemon).not.toHaveBeenCalled();
        });
    });

    describe('when in incorrects', () => {
        beforeEach(() => vi.useFakeTimers());
        afterEach(() => vi.useRealTimers());

        it('hides the card after 600ms and calls newRound', () => {
            const ctx = makeContext();
            const { getByTestId, rerender } = renderCard(pokemon, ctx);

            fireEvent.click(getByTestId('card'));
            expect(getByTestId('card').className).toContain('flip');

            rerender(
                <GameContext.Provider value={{ ...ctx, incorrects: [pokemon] }}>
                    <FlipCard pokemon={pokemon} />
                </GameContext.Provider>
            );

            act(() => { vi.advanceTimersByTime(600); });

            expect(getByTestId('card').className).not.toContain('flip');
            expect((getByTestId('img') as HTMLImageElement).src).toContain('pokeball.png');
            expect(ctx.newRound).toHaveBeenCalled();
        });
    });
});
