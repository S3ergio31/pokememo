# Pokememo — CLAUDE.md

## Project Overview

Pokememo is a browser-based Pokémon memory card game built entirely in the frontend. Players flip cards to find matching Pokémon pairs within a 60-second time limit. If all 11 pairs are found before time runs out, the player enters their name on the leaderboard.

## Tech Stack

| Layer | Technology |
|---|---|
| UI | React 19 (latest) |
| Language | TypeScript |
| Bundler | Vite |
| State | Context API + useReducer |
| Styles | Component-scoped CSS (no framework) |
| Persistence | localStorage (via RecordsRepository) |
| Testing | Vitest + React Testing Library |
| Deploy | Vercel |
| PWA | Service Worker + Workbox |

> **Migration in progress:** The project is being migrated from React 17 + CRA + JavaScript to React 19 + Vite + TypeScript.

## Game Rules

- Board: 22 cards = 11 unique Pokémon × 2
- Time limit: 60 seconds (progress bar in header)
- Win condition: find all 11 pairs before time expires
- Lose condition: timer reaches 0
- **Score:** players only enter the leaderboard if they win (find all pairs)
- Score metric: number of rounds (lower = better)
- Leaderboard: top 10 scores stored in localStorage

## Architecture

```
src/
├── components/       # Presentational components (no business logic)
│   ├── Body.tsx
│   ├── Button.tsx
│   ├── Dashboard.tsx  # Renders the card grid
│   ├── Header.tsx     # Game info + timer
│   ├── Modal.tsx      # ReactDOM.createPortal overlay
│   ├── NewRecord.tsx  # Name input for high score
│   ├── Pokemon.tsx    # Individual flip card
│   ├── Records.tsx    # Leaderboard table
│   └── Timer.tsx      # Progress bar
│
├── context/
│   └── GameProvider.tsx  # React Context wrapping entire app
│
├── hooks/
│   ├── useGame.ts        # Wraps useReducer, returns state + actions
│   ├── usePokemonFlip.ts # Per-card flip animation logic
│   └── useProgress.ts    # 60s countdown, calls failGame() on expiry
│
├── state/
│   ├── actions.ts    # Action creators
│   ├── reducer.ts    # Reducer + initialGameState
│   └── gameStore.ts  # Computed/derived state
│
├── lib/
│   ├── Pokemon.ts           # Pokemon class model
│   ├── PokemonAssets.ts     # Dynamic image loader
│   ├── PokemonsGenerator.ts # Builds shuffled 22-card deck
│   └── RecordsRepository.ts # localStorage CRUD, max 10 records
│
├── css/              # Component-scoped CSS files
└── ico/              # Sprites: 50 pokémon PNGs + pokeball + logo
```

## State Shape (reducer.ts)

```typescript
interface GameState {
  round: number;
  pokemons: CardEntry[];        // full shuffled deck (22 cards)
  selected_pokemons: Pokemon[]; // currently face-up (max 2)
  found_pokemons: Pokemon[];    // matched pairs
  incorrects: Pokemon[];        // mismatched pair (auto-flipped after 600ms)
  win: boolean;
  fail: boolean;
  game_over: boolean;           // win || fail
}
```

## Key Flows

**Card flip:** click → `usePokemonFlip` → `selectPokemon(pokemon)` → reducer → `gameStore` computes match/mismatch → `usePokemonFlip` useEffects react to state changes (auto-hide incorrects after 600ms).

**Timer:** `useProgress` hook counts 0→100% over 60s, calls `failGame()` on completion, stops on `game_over`.

**Leaderboard:** `RecordsRepository.save({record, player})` — only called on win. Stores max 10 records sorted by rounds ascending. Removes the lowest score when full.

## Development Commands

```bash
yarn dev        # Start Vite dev server
yarn build      # TypeScript check + production build
yarn preview    # Preview production build locally
yarn test       # Run Vitest in watch mode
yarn test:run   # Run tests once (CI)
yarn typecheck  # tsc --noEmit
```

## Testing Guidelines

- Framework: Vitest + React Testing Library
- Test files alongside source: `Pokemon.test.tsx`, `useProgress.test.ts`, etc.
- Test game mechanics: card matching, timer expiry, leaderboard persistence
- Test components: render, user interactions (click to flip), modal visibility
- Do NOT test implementation details (state shape internals)
- Use `localStorage` mock for `RecordsRepository` tests

## Pokémon Assets

- 50 Pokémon sprites available at `src/ico/pokemons/` (numbered 1–50)
- Each game randomly picks 11 unique Pokémon from the 50 available
- Card back image: `src/ico/pokeball.png`
- Assets are loaded dynamically via `PokemonAssets.ts`

## UI Design Goals

The interface must feel professional and modern — not a generic CRA template. Key principles:

- **Visual identity:** dark background (deep navy or near-black), Pokémon-red (`#CC0000`) as the primary accent, clean typography
- **Cards:** smooth 3D flip animation, subtle hover lift/glow effect, clear visual distinction between face-down, face-up, and matched states
- **Layout:** centered, responsive grid that works on mobile and desktop; cards scale gracefully
- **Timer:** visually prominent progress bar with color shift (green → yellow → red) as time runs out
- **Leaderboard/modal:** polished overlay with glassmorphism or frosted-card aesthetic
- **Micro-interactions:** satisfying feedback on match (brief success glow) and mismatch (subtle shake)
- **No stock-looking UI** — avoid default browser styles, plain tables, or unstyled buttons

When implementing UI changes, prioritize feel and visual polish over adding new features.

## Code Conventions

- TypeScript strict mode enabled
- No comments unless the WHY is non-obvious
- No CSS-in-JS — component-scoped `.css` files only
- State mutations only through reducer actions, never directly
- Derived/computed values go in `gameStore.ts`, not the reducer
- Components are purely presentational — no business logic inside JSX files
