jest.mock('lib/PokemonAssets', () => id => `pokemon_${id}.png`);

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { GameContext } from 'context/GameProvider';
import NewRecord from 'components/NewRecord';

// NewRecord renders Modal which portals to #root
let root;
beforeEach(() => {
    root = document.createElement('div');
    root.id = 'root';
    document.body.appendChild(root);
});
afterEach(() => root.remove());

const makeCtx = () => ({ addRecord: jest.fn() });

function renderNewRecord(ctx = makeCtx()) {
    return { ctx, ...render(
        <GameContext.Provider value={ctx}>
            <NewRecord />
        </GameContext.Provider>
    )};
}

describe('NewRecord', () => {
    it('renders an input for the player name', () => {
        renderNewRecord();
        expect(screen.getByPlaceholderText(/enter your name/i)).toBeInTheDocument();
    });

    it('updates the input value as the user types', () => {
        renderNewRecord();
        const input = screen.getByPlaceholderText(/enter your name/i);
        fireEvent.change(input, { target: { value: 'Ash' } });
        expect(input.value).toBe('Ash');
    });

    it('calls addRecord with the typed name when Accept is clicked', () => {
        const { ctx } = renderNewRecord();
        fireEvent.change(screen.getByPlaceholderText(/enter your name/i), {
            target: { value: 'Misty' },
        });
        fireEvent.click(screen.getByText('Accept'));
        expect(ctx.addRecord).toHaveBeenCalledWith('Misty');
    });

    it('calls addRecord with empty string if name is not filled in', () => {
        const { ctx } = renderNewRecord();
        fireEvent.click(screen.getByText('Accept'));
        expect(ctx.addRecord).toHaveBeenCalledWith('');
    });
});
