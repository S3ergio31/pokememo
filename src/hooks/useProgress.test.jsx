vi.mock('lib/PokemonAssets', () => ({ default: id => `pokemon_${id}.png` }));

import React from 'react';
import { render, act } from '@testing-library/react';
import { GameContext } from 'context/GameProvider';
import useProgress from 'hooks/useProgress';

function ProgressDisplay() {
    const progress = useProgress();
    return <div data-testid="progress">{progress}</div>;
}

function renderProgress(contextValue) {
    return render(
        <GameContext.Provider value={contextValue}>
            <ProgressDisplay />
        </GameContext.Provider>
    );
}

const makeContext = (overrides = {}) => ({
    failGame: vi.fn(),
    game_over: false,
    ...overrides,
});

beforeEach(() => vi.useFakeTimers());
afterEach(() => vi.useRealTimers());

describe('useProgress', () => {
    it('starts at 0', () => {
        const { getByTestId } = renderProgress(makeContext());
        expect(getByTestId('progress').textContent).toBe('0');
    });

    it('reaches 50% after 30 seconds', () => {
        const { getByTestId } = renderProgress(makeContext());
        act(() => { vi.advanceTimersByTime(30 * 1000); });
        expect(getByTestId('progress').textContent).toBe('50');
    });

    it('reaches near-full progress just before expiry (59 seconds)', () => {
        // At 60s the hook resets elapseTime to 0 and calls failGame, so measuring
        // at 59s (≈98%) is the reliable way to assert the counter advances correctly.
        const { getByTestId } = renderProgress(makeContext());
        act(() => { vi.advanceTimersByTime(59 * 1000); });
        expect(Number(getByTestId('progress').textContent)).toBeGreaterThan(95);
    });

    it('calls failGame when the timer expires', () => {
        const ctx = makeContext();
        renderProgress(ctx);
        act(() => { vi.advanceTimersByTime(60 * 1000); });
        expect(ctx.failGame).toHaveBeenCalledTimes(1);
    });

    it('stops ticking and does not call failGame again when game_over is true', () => {
        const ctx = makeContext();
        const { rerender } = renderProgress(ctx);

        act(() => { vi.advanceTimersByTime(30 * 1000); });

        rerender(
            <GameContext.Provider value={{ ...ctx, game_over: true }}>
                <ProgressDisplay />
            </GameContext.Provider>
        );

        act(() => { vi.advanceTimersByTime(60 * 1000); });
        expect(ctx.failGame).not.toHaveBeenCalled();
    });
});
