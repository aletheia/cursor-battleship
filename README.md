# Battleship Game

A classic battleship game built with Next.js 15, featuring an intelligent computer opponent and full internationalization support.

## Features

- **Classic Battleship Gameplay**: Play the traditional naval combat strategy game
- **Smart AI Opponent**: Computer opponent with hunting and targeting algorithms
- **Two-Phase Gameplay**:
  - Setup Phase: Place your ships on a 10x10 grid
  - Battle Phase: Take turns attacking and defending
- **Fleet Management**: Command 5 ships (Carrier, Battleship, Cruiser, Submarine, Destroyer)
- **Internationalization**: Full support for English and Italian
- **Modern UI**: Clean, responsive interface built with Tailwind CSS
- **Real-time Feedback**: Visual indicators for hits, misses, and sunk ships

## Getting Started

### Prerequisites

- Node.js 18+ 
- pnpm (or npm/yarn)

### Installation

Install dependencies:

```bash
pnpm install
```

Run the development server:

```bash
pnpm dev
```

Open [https://localhost:3000](https://localhost:3000) with your browser to play (note: HTTPS with self-signed certificate).

## How to Play

1. **Setup Phase**: 
   - Select a ship from the fleet list
   - Choose horizontal or vertical orientation
   - Click on the grid to place your ship
   - Repeat until all 5 ships are placed
   - Click "Start Battle" when ready

2. **Battle Phase**:
   - Click any cell on the computer's grid to attack
   - The computer will automatically counter-attack
   - Continue until all enemy ships are destroyed or all your ships are sunk

## Game Rules

- **Grid**: 10x10 battlefield
- **Fleet**:
  - Carrier: 5 cells
  - Battleship: 4 cells
  - Cruiser: 3 cells
  - Submarine: 3 cells
  - Destroyer: 2 cells
- Ships cannot overlap or be placed diagonally
- First player to sink all opponent ships wins

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Internationalization**: next-intl
- **Font**: Inter (Google Fonts)
- **Package Manager**: pnpm

## Project Structure

```
cursor-battleship/
├── app/
│   ├── layout.tsx    # Root layout with i18n provider
│   ├── page.tsx      # Battleship game component
│   └── globals.css   # Global styles
├── messages/
│   ├── en.json       # English translations
│   └── it.json       # Italian translations
├── i18n.ts           # i18n configuration
└── .cursor/          # Cursor IDE rules and commands
    ├── rules/        # Development guidelines
    └── commands/     # Custom commands
```

## Development

The game is built as a client-side React component with:
- State management using React hooks
- Typed interfaces for game entities
- AI algorithms for computer opponent behavior
- Localized strings via next-intl

## Internationalization

Switch between English and Italian using the language toggle. All game text, including ship names, messages, and UI labels, are fully translated.

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [next-intl Documentation](https://next-intl.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)
