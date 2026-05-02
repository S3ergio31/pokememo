# Pokememo

A browser-based Pokémon memory card game. Flip cards to find all 11 matching pairs before the 60-second timer runs out. Winners enter their name on the leaderboard.

## Tech stack

| Layer | Technology |
|---|---|
| UI | React 19 |
| Bundler | Vite 7 |
| State | Context API + useReducer |
| Styles | Component-scoped CSS |
| Persistence | localStorage |
| Testing | Vitest + React Testing Library |
| Deploy | Vercel |

## Requirements

- Node.js 25.9.0 (see `.nvmrc`)

```bash
nvm install   # reads version from .nvmrc
```

## Development

```bash
npm install          # install dependencies
npm run dev          # start dev server at http://localhost:5173
npm run build        # type-check + production build
npm run preview      # preview production build locally
npm test             # run tests in watch mode
npm run test:run     # run tests once (CI)
npm run typecheck    # tsc --noEmit
```

## Game rules

- Board: 22 cards — 11 unique Pokémon × 2
- Time limit: 60 seconds
- Win: find all 11 pairs before time runs out
- Lose: timer reaches 0
- Score: number of rounds (lower = better); only winners enter the leaderboard
- Leaderboard: top 10 scores, stored in localStorage

## Project structure

```
src/
├── components/       # Presentational components (no business logic)
│   ├── Body.tsx
│   ├── Button.tsx
│   ├── Dashboard.tsx  # Card grid
│   ├── Header.tsx     # Game info + timer
│   ├── Modal.tsx      # Portal overlay
│   ├── NewRecord.tsx  # Name input for high score
│   ├── Pokemon.tsx    # Flip card
│   ├── Records.tsx    # Leaderboard table
│   └── Timer.tsx      # Progress bar
│
├── context/
│   └── GameProvider.tsx  # React Context wrapping the app
│
├── hooks/
│   ├── useGame.ts        # Wraps useReducer, exposes state + actions
│   ├── usePokemonFlip.ts # Per-card flip animation
│   └── useProgress.ts    # 60s countdown, calls failGame() on expiry
│
├── state/
│   ├── actions.ts    # Action creators
│   ├── reducer.ts    # Reducer + initial state
│   └── gameStore.ts  # Derived/computed state
│
└── lib/
    ├── Pokemon.ts           # Pokemon model
    ├── PokemonAssets.ts     # Dynamic image loader (import.meta.glob)
    ├── PokemonsGenerator.ts # Builds shuffled 22-card deck
    └── RecordsRepository.ts # localStorage CRUD, max 10 records
```

## Testing

92 tests across all game logic, hooks, and components.

```bash
npm run test:run
```

Tests live alongside their source files (`*.test.tsx` / `*.test.ts`).
