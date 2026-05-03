vi.mock('lib/PokemonAssets', () => ({ default: (id: number) => `pokemon_${id}.png` }));
vi.mock('ico/pokeball.png', () => ({ default: 'pokeball.png' }));

import { render, screen, fireEvent } from '@testing-library/react';
import { GameContext } from 'context/GameProvider';
import type { GameContextValue } from 'context/GameProvider';
import PokemonCard from 'components/Pokemon';
import Pokemon from 'lib/Pokemon';

const makeCtx = (overrides: Partial<GameContextValue> = {}): GameContextValue => ({
    selectPokemon: vi.fn(),
    newRound: vi.fn(),
    found_pokemons: [],
    incorrects: [],
    pair_has_been_selected: false,
    ...overrides,
} as GameContextValue);

function renderCard(pokemon: Pokemon, ctx = makeCtx()) {
    return render(
        <GameContext.Provider value={ctx}>
            <PokemonCard pokemon={pokemon} />
        </GameContext.Provider>
    );
}

describe('Pokemon (card component)', () => {
    const pokemon = new Pokemon(3);

    it('renders face-down initially (no flipped class on card)', () => {
        const { container } = renderCard(pokemon);
        expect(container.querySelector('.pokemon-card')).not.toHaveClass('flipped');
    });

    it('uses the pokemon name as the alt attribute on the back face', () => {
        renderCard(pokemon);
        expect(screen.getByAltText('pokemon_3')).toBeInTheDocument();
    });

    it('applies the flipped class on click', () => {
        const { container } = renderCard(pokemon);
        fireEvent.click(container.querySelector('.pokemon-card')!);
        expect(container.querySelector('.pokemon-card')).toHaveClass('flipped');
    });

    it('calls selectPokemon with the pokemon instance on click', () => {
        const ctx = makeCtx();
        const { container } = renderCard(pokemon, ctx);
        fireEvent.click(container.querySelector('.pokemon-card')!);
        expect(ctx.selectPokemon).toHaveBeenCalledWith(pokemon);
    });

    it('does not flip when a pair is already being evaluated', () => {
        const ctx = makeCtx({ pair_has_been_selected: true });
        const { container } = renderCard(pokemon, ctx);
        fireEvent.click(container.querySelector('.pokemon-card')!);
        expect(container.querySelector('.pokemon-card')).not.toHaveClass('flipped');
        expect(ctx.selectPokemon).not.toHaveBeenCalled();
    });
});
