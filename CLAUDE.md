# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

"Babosas del Futuro" is an educational escape room web application built with Next.js that teaches students (6th-7th grade) about renewable energy and recycling. The narrative follows Harry, who falls through a sewer into a dystopian future where sentient glowing slugs teach him how to save the planet.

**Tech Stack:**
- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS (custom Arcane-inspired theme)
- @dnd-kit (drag-and-drop functionality)

## Development Commands

```bash
# Install dependencies
npm install

# Run development server (localhost:3000)
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm lint
```

## Architecture

### Game Flow
The application follows a linear progression through routes:
1. `/` - Landing page with game introduction
2. `/intro` - Animated story sequence (7 parts, auto-advancing)
3. `/game/explore` - Level 1: Point-and-click exploration game
4. `/game/quiz` - Level 2: Telepathic quiz with randomized questions
5. `/game/circuit` - Level 3: Drag-and-drop energy connection puzzle
6. `/game/complete` - Certificate generation and game summary

### State Management
Game state is managed through localStorage using `lib/gameState.ts`:
- **Storage Key:** `babosas-futuro-game-state`
- **State Schema:** `GameState` interface from `types/index.ts`
- **Key Functions:**
  - `initializeGame()` - Called at `/intro`, creates new game session
  - `completeLevel(levelId, score)` - Updates progress after each level
  - `finishGame()` - Marks completion timestamp
  - `resetGame()` - Clears localStorage for replay

**Critical:** Always use these state management functions rather than directly manipulating localStorage.

### Type System
All types are centralized in `types/index.ts`:
- `EnergyType` - 7 renewable energy categories
- `RecycleType` - The 3Rs (reducir, reutilizar, reciclar)
- `GameState` - Player progress tracking
- `QuizQuestion` - Quiz structure with energy type tagging
- `ClickableItem`, `CircuitConnection`, `RecycleItem` - Game mechanics

### Quiz System
Questions are managed in `lib/quizData.ts`:
- 12 total questions covering renewable energy and recycling
- `getRandomQuestions(count)` - Returns shuffled subset (default: 10)
- `getQuestionsByEnergy(energyType)` - Filters by energy category
- Each question includes `explanation` shown as feedback
- Questions are tagged with `energyType` for thematic organization

### Theming
Custom Tailwind theme extends base config with "Arcane" color palette:
- Copper/rust tones for dystopian aesthetic
- Neon green/blue for futuristic accents
- Deep purple backgrounds
- Custom utilities: `glow-text`, `glow-border`
- Animations: `animate-float`, `animate-pulse-slow`

## Level Implementation Details

### Level 1: Explore (`/game/explore`)
- 7 clickable objects scattered across viewport (positioned with x/y percentages)
- Objects are semi-transparent until hovered
- Modal displays item details when clicked
- Scoring: Base 1000 + time bonus (max 300 points)
- Completion triggers automatic navigation after 5 seconds

### Level 2: Quiz (`/game/quiz`)
- Loads 10 random questions from pool of 12
- 3-second feedback delay before auto-advancing
- Scoring: 100 base + time bonus per question (max 200 bonus)
- Shows correct answer with explanation regardless of user selection
- Color-coded feedback: green for correct, red for incorrect

### Level 3: Circuit (`/game/circuit`)
- Drag energy sources to matching applications
- Uses @dnd-kit with `PointerSensor` (8px activation distance)
- Incorrect connections show feedback but don't lock
- Only correct connections persist visually (green glow)
- Scoring: 1500 base - (50 × attempts) + time bonus (max 300)
- Calls `finishGame()` to record completion timestamp

## Key Conventions

### Navigation
- Use Next.js `useRouter()` from `next/navigation` (not `next/router`)
- All transitions include loading states and delays for UX polish
- Avoid navigation during modal display states

### Styling
- All pages use gradient backgrounds: `from-arcane-deep-purple to-black`
- Consistent HUD pattern across game levels (top bar with stats)
- Progress bars use copper-to-neon-green gradients
- Button hover states include `hover:scale-105` transforms

### User Experience
- Auto-advancing story/completion screens (2-5 second delays)
- Skip functionality disabled for first 2 seconds
- Modal close timers to prevent accidental dismissal
- Loading spinners use `border-arcane-neon-green border-t-transparent animate-spin`

### Client Components
All interactive pages use `"use client"` directive due to:
- State management with `useState`
- Navigation with `useRouter`
- Effects with `useEffect`
- Event handlers

## Deployment

Configured for Netlify:
- `netlify.toml` specifies build command and Next.js plugin
- Node version locked to 18
- Output directory: `.next`
- SPA-style redirect rule for client-side routing

## Educational Content

The game teaches:
- **7 Renewable Energy Types:** Solar, Wind (Eólica), Hydroelectric (Hidráulica), Geothermal (Geotérmica), Biomass (Biomasa), Wave (Undimotriz), Biogas
- **3Rs of Recycling:** Reduce (Reducir), Reuse (Reutilizar), Recycle (Reciclar)
- **Environmental Consequence:** Dystopian future as cautionary tale

Content is in Spanish with poetic slug narration style ("padre generoso" for sun, "danzarín invisible" for wind).

## Common Tasks

### Adding a New Quiz Question
1. Add question object to `quizQuestions` array in `lib/quizData.ts`
2. Ensure `correctAnswer` is 0-indexed
3. Tag with appropriate `energyType`
4. Include detailed `explanation` for educational value

### Modifying Game Scoring
Scoring logic is distributed across three level files:
- `app/game/explore/page.tsx:114-116`
- `app/game/quiz/page.tsx:45-51`
- `app/game/circuit/page.tsx:85-90`

Each follows pattern: `baseScore + bonuses - penalties`

### Changing Level Progression
Update these auto-navigation triggers:
- `app/intro/page.tsx:74` - To explore level
- `app/game/explore/page.tsx:121` - To quiz level
- `app/game/quiz/page.tsx:64` - To circuit level
- `app/game/circuit/page.tsx:95` - To complete screen

### Adjusting Timers
Key timeout values:
- Story advancement: 4000ms (`app/intro/page.tsx:68`)
- Modal auto-close: 5000ms (`app/game/explore/page.tsx:134`)
- Feedback display: 3000ms (`app/game/quiz/page.tsx:67`)
- Completion delay: 4000ms (quiz/circuit completion screens)
