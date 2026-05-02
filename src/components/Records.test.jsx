jest.mock('lib/PokemonAssets', () => id => `pokemon_${id}.png`);

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { GameContext } from 'context/GameProvider';
import Records from 'components/Records';

// Records renders Modal (and possibly NewRecord) which portal to #root
let root;
beforeEach(() => {
    root = document.createElement('div');
    root.id = 'root';
    document.body.appendChild(root);
});
afterEach(() => root.remove());

const makeCtx = (overrides = {}) => ({
    game_over: false,
    win: false,
    records: [],
    resetGame: jest.fn(),
    new_record: null,
    new_record_saved: false,
    addRecord: jest.fn(), // consumed by NewRecord when rendered
    ...overrides,
});

describe('Records', () => {
    it('renders nothing when the game is not over', () => {
        render(
            <GameContext.Provider value={makeCtx({ game_over: false })}>
                <Records />
            </GameContext.Provider>
        );
        expect(screen.queryByText('Best records')).not.toBeInTheDocument();
    });

    it('shows the leaderboard modal when the game ends', () => {
        render(
            <GameContext.Provider value={makeCtx({ game_over: true })}>
                <Records />
            </GameContext.Provider>
        );
        expect(screen.getByText('Best records')).toBeInTheDocument();
    });

    it('renders each entry with position, player name and rounds', () => {
        const records = [
            { player: 'Alice', rounds: 3 },
            { player: 'Bob', rounds: 7 },
        ];
        render(
            <GameContext.Provider value={makeCtx({ game_over: true, records })}>
                <Records />
            </GameContext.Provider>
        );
        expect(screen.getByText('Alice')).toBeInTheDocument();
        expect(screen.getByText('Bob')).toBeInTheDocument();
        expect(screen.getByText('3')).toBeInTheDocument();
        expect(screen.getByText('7')).toBeInTheDocument();
        // Positions
        expect(screen.getByText('1')).toBeInTheDocument();
        expect(screen.getByText('2')).toBeInTheDocument();
    });

    it('calls resetGame when Accept is clicked on the leaderboard', () => {
        const ctx = makeCtx({ game_over: true });
        render(
            <GameContext.Provider value={ctx}>
                <Records />
            </GameContext.Provider>
        );
        fireEvent.click(screen.getByText('Accept'));
        expect(ctx.resetGame).toHaveBeenCalledTimes(1);
    });

    it('shows NewRecord instead of leaderboard when the player earns a new record', () => {
        render(
            <GameContext.Provider value={makeCtx({
                win: true,
                new_record: { rounds: 5 },
                new_record_saved: false,
            })}>
                <Records />
            </GameContext.Provider>
        );
        expect(screen.getByPlaceholderText(/enter your name/i)).toBeInTheDocument();
        expect(screen.queryByText('Best records')).not.toBeInTheDocument();
    });

    it('shows the leaderboard (not NewRecord) once the record has been saved', () => {
        render(
            <GameContext.Provider value={makeCtx({
                game_over: true,
                win: true,
                new_record: { rounds: 5 },
                new_record_saved: true,
            })}>
                <Records />
            </GameContext.Provider>
        );
        expect(screen.getByText('Best records')).toBeInTheDocument();
        expect(screen.queryByPlaceholderText(/enter your name/i)).not.toBeInTheDocument();
    });
});
