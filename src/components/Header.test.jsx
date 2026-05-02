jest.mock('lib/PokemonAssets', () => id => `pokemon_${id}.png`);
jest.mock('ico/logo.png', () => 'logo.png');

import React from 'react';
import { render, screen } from '@testing-library/react';
import { GameContext } from 'context/GameProvider';
import Header from 'components/Header';

const makeCtx = (round = 0) => ({
    round,
    failGame: jest.fn(),
    game_over: false,
});

beforeEach(() => jest.useFakeTimers());
afterEach(() => jest.useRealTimers());

describe('Header', () => {
    it('renders the logo image', () => {
        render(
            <GameContext.Provider value={makeCtx()}>
                <Header />
            </GameContext.Provider>
        );
        expect(screen.getByAltText('logo')).toBeInTheDocument();
    });

    it('displays the current round from context', () => {
        render(
            <GameContext.Provider value={makeCtx(7)}>
                <Header />
            </GameContext.Provider>
        );
        expect(screen.getByText(/7/)).toBeInTheDocument();
    });

    it('renders the timer progress bar', () => {
        const { container } = render(
            <GameContext.Provider value={makeCtx()}>
                <Header />
            </GameContext.Provider>
        );
        expect(container.querySelector('.progress-container')).toBeInTheDocument();
    });
});
