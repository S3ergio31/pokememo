vi.mock('lib/PokemonAssets', () => ({ default: (id: number) => `pokemon_${id}.png` }));
vi.mock('ico/pokeball.png', () => ({ default: 'pokeball.png' }));

import { render, screen } from '@testing-library/react';
import { GameContext } from 'context/GameProvider';
import type { GameContextValue } from 'context/GameProvider';
import Dashboard from 'components/Dashboard';
import Pokemon from 'lib/Pokemon';
import type { CardEntry } from 'lib/PokemonsGenerator';

const makeCtx = (pokemons: CardEntry[] = []): GameContextValue => ({
    pokemons,
    selectPokemon: vi.fn(),
    newRound: vi.fn(),
    found_pokemons: [],
    incorrects: [],
    pair_has_been_selected: false,
} as unknown as GameContextValue);

describe('Dashboard', () => {
    it('renders one card per pokemon in the deck', () => {
        const pokemons = [
            { key: 0, value: new Pokemon(1) },
            { key: 1, value: new Pokemon(2) },
            { key: 2, value: new Pokemon(3) },
        ];
        render(
            <GameContext.Provider value={makeCtx(pokemons)}>
                <Dashboard />
            </GameContext.Provider>
        );
        expect(screen.getAllByRole('img')).toHaveLength(3);
    });

    it('renders nothing when the deck is empty', () => {
        render(
            <GameContext.Provider value={makeCtx([])}>
                <Dashboard />
            </GameContext.Provider>
        );
        expect(screen.queryByRole('img')).not.toBeInTheDocument();
    });

    it('each card starts face-down showing the pokeball', () => {
        const pokemons = [
            { key: 0, value: new Pokemon(1) },
            { key: 1, value: new Pokemon(2) },
        ];
        render(
            <GameContext.Provider value={makeCtx(pokemons)}>
                <Dashboard />
            </GameContext.Provider>
        );
        screen.getAllByRole('img').forEach(img =>
            expect(img).toHaveAttribute('src', 'pokeball.png')
        );
    });
});
