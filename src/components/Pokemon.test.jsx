vi.mock('lib/PokemonAssets', () => ({ default: id => `pokemon_${id}.png` }));
vi.mock('ico/pokeball.png', () => ({ default: 'pokeball.png' }));

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { GameContext } from 'context/GameProvider';
import PokemonCard from 'components/Pokemon';
import Pokemon from 'lib/Pokemon';

const makeCtx = (overrides = {}) => ({
    selectPokemon: vi.fn(),
    newRound: vi.fn(),
    found_pokemons: [],
    incorrects: [],
    pair_has_been_selected: false,
    ...overrides,
});

function renderCard(pokemon, ctx = makeCtx()) {
    return render(
        <GameContext.Provider value={ctx}>
            <PokemonCard pokemon={pokemon} />
        </GameContext.Provider>
    );
}

describe('Pokemon (card component)', () => {
    const pokemon = new Pokemon(3);

    it('shows the pokeball (face-down) before any interaction', () => {
        renderCard(pokemon);
        expect(screen.getByRole('img')).toHaveAttribute('src', 'pokeball.png');
    });

    it('uses the pokemon name as the alt attribute', () => {
        renderCard(pokemon);
        expect(screen.getByAltText('pokemon_3')).toBeInTheDocument();
    });

    it('reveals the pokemon image and applies the flip class on click', () => {
        renderCard(pokemon);
        fireEvent.click(screen.getByRole('img'));
        const img = screen.getByRole('img');
        expect(img).toHaveAttribute('src', 'pokemon_3.png');
        expect(img).toHaveClass('flip');
    });

    it('calls selectPokemon with the pokemon instance on click', () => {
        const ctx = makeCtx();
        renderCard(pokemon, ctx);
        fireEvent.click(screen.getByRole('img'));
        expect(ctx.selectPokemon).toHaveBeenCalledWith(pokemon);
    });

    it('does not flip when a pair is already being evaluated', () => {
        const ctx = makeCtx({ pair_has_been_selected: true });
        renderCard(pokemon, ctx);
        fireEvent.click(screen.getByRole('img'));
        expect(screen.getByRole('img')).not.toHaveClass('flip');
        expect(ctx.selectPokemon).not.toHaveBeenCalled();
    });
});
