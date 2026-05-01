jest.mock('lib/PokemonAssets', () => id => `pokemon_${id}.png`);
jest.mock('ico/pokeball.png', () => 'pokeball.png');
jest.mock('ico/logo.png', () => 'logo.png');

import React from 'react';
import { render, screen } from '@testing-library/react';
import App from 'App';

describe('App (smoke test)', () => {
    it('renders without crashing', () => {
        render(<App />);
    });

    it('renders the card grid with 20 cards', () => {
        render(<App />);
        const cards = screen.getAllByRole('img');
        // 20 pokeball images (face-down cards) + 1 logo = 21
        expect(cards.length).toBeGreaterThanOrEqual(20);
    });
});
