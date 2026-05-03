vi.mock('lib/PokemonAssets', () => ({ default: (id: number) => `pokemon_${id}.png` }));

import { render, act } from '@testing-library/react';
import { GameContext } from 'context/GameProvider';
import type { GameContextValue } from 'context/GameProvider';
import Timer from 'components/Timer';

const makeCtx = (overrides: Partial<GameContextValue> = {}): GameContextValue => ({
    failGame: vi.fn(),
    game_over: false,
    ...overrides,
} as GameContextValue);

function renderTimer(ctx = makeCtx()) {
    return render(
        <GameContext.Provider value={ctx}>
            <Timer />
        </GameContext.Provider>
    );
}

beforeEach(() => vi.useFakeTimers());
afterEach(() => vi.useRealTimers());

describe('Timer', () => {
    it('renders the progress bar container', () => {
        const { container } = renderTimer();
        expect(container.querySelector('.progress-container')).toBeInTheDocument();
    });

    it('starts with the progress bar at 0% width', () => {
        const { container } = renderTimer();
        expect(container.querySelector('.progress-bar')).toHaveStyle('width: 0%');
    });

    it('advances the bar to 50% after 30 seconds', () => {
        const { container } = renderTimer();
        act(() => { vi.advanceTimersByTime(30 * 1000); });
        expect(container.querySelector('.progress-bar')).toHaveStyle('width: 50%');
    });

    it('stops advancing when game_over becomes true', () => {
        const ctx = makeCtx();
        const { container, rerender } = renderTimer(ctx);

        act(() => { vi.advanceTimersByTime(20 * 1000); });

        rerender(
            <GameContext.Provider value={{ ...ctx, game_over: true }}>
                <Timer />
            </GameContext.Provider>
        );

        const widthAfterStop = container.querySelector<HTMLElement>('.progress-bar')!.style.width;
        act(() => { vi.advanceTimersByTime(30 * 1000); });

        expect(container.querySelector<HTMLElement>('.progress-bar')!.style.width).toBe(widthAfterStop);
    });
});
