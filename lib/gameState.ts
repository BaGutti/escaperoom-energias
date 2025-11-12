import { GameState, UserProgress } from '@/types';

const STORAGE_KEY = 'babosas-futuro-game-state';

// Obtener estado del juego desde localStorage
export const getGameState = (): GameState | null => {
  if (typeof window === 'undefined') return null;

  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : null;
  } catch (error) {
    console.error('Error loading game state:', error);
    return null;
  }
};

// Guardar estado del juego
export const saveGameState = (state: GameState): void => {
  if (typeof window === 'undefined') return;

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (error) {
    console.error('Error saving game state:', error);
  }
};

// Inicializar nuevo juego
export const initializeGame = (): GameState => {
  const newState: GameState = {
    currentLevel: 0,
    score: 0,
    completedLevels: [],
    startTime: Date.now(),
  };

  saveGameState(newState);
  return newState;
};

// Actualizar nivel completado
export const completeLevel = (levelId: number, score: number): void => {
  const state = getGameState();
  if (!state) return;

  const updatedState: GameState = {
    ...state,
    currentLevel: levelId + 1,
    score: state.score + score,
    completedLevels: [...new Set([...state.completedLevels, levelId])],
  };

  saveGameState(updatedState);
};

// Finalizar juego
export const finishGame = (): void => {
  const state = getGameState();
  if (!state) return;

  const updatedState: GameState = {
    ...state,
    endTime: Date.now(),
  };

  saveGameState(updatedState);
};

// Reiniciar juego
export const resetGame = (): void => {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(STORAGE_KEY);
};

// Calcular tiempo de juego
export const getPlayTime = (): number => {
  const state = getGameState();
  if (!state) return 0;

  const endTime = state.endTime || Date.now();
  return Math.floor((endTime - state.startTime) / 1000); // en segundos
};

// Formatear tiempo
export const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};
