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
  clearSession();
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

// Verificar si el juego está iniciado (usa timestamp para detectar navegación reciente)
export const isGameStarted = (): boolean => {
  if (typeof window === 'undefined') return false;

  const state = getGameState();
  if (!state || !state.startTime) return false;

  // Verificar timestamp de navegación (debe ser reciente, < 3 segundos)
  const navTimestamp = sessionStorage.getItem('babosas-nav-timestamp');
  if (!navTimestamp) return false;

  const timeSinceNav = Date.now() - parseInt(navTimestamp, 10);
  return timeSinceNav < 3000; // 3 segundos de margen
};

// Marcar navegación reciente (llamar antes de router.push)
export const markSessionActive = (): void => {
  if (typeof window === 'undefined') return;
  sessionStorage.setItem('babosas-nav-timestamp', Date.now().toString());
};

// Limpiar sesión
export const clearSession = (): void => {
  if (typeof window === 'undefined') return;
  sessionStorage.removeItem('babosas-nav-timestamp');
};
