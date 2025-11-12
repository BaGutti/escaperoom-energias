// Tipos de energías renovables
export type EnergyType =
  | 'solar'
  | 'eolica'
  | 'hidraulica'
  | 'geotermica'
  | 'biomasa'
  | 'undimotriz'
  | 'biogas';

// Tipo para las 3R
export type RecycleType = 'reducir' | 'reutilizar' | 'reciclar';

// Tipo para materiales reciclables
export type MaterialType = 'plastico' | 'vidrio' | 'papel' | 'metal' | 'organico';

// Estado del juego
export interface GameState {
  currentLevel: number;
  score: number;
  completedLevels: number[];
  playerName?: string;
  startTime: number;
  endTime?: number;
}

// Nivel del juego
export interface GameLevel {
  id: number;
  name: string;
  description: string;
  route: string;
  completed: boolean;
  score: number;
}

// Pregunta del quiz
export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  energyType: EnergyType;
}

// Item para el juego point & click
export interface ClickableItem {
  id: string;
  name: string;
  description: string;
  x: number;
  y: number;
  width: number;
  height: number;
  found: boolean;
  energyType?: EnergyType;
}

// Conexión de circuito
export interface CircuitConnection {
  id: string;
  sourceId: string;
  targetId: string;
  isCorrect: boolean;
}

// Item de reciclaje
export interface RecycleItem {
  id: string;
  name: string;
  type: MaterialType;
  recycleCategory: RecycleType;
  image?: string;
}

// Progreso del usuario
export interface UserProgress {
  completedLevels: number[];
  totalScore: number;
  achievements: string[];
  playTime: number;
}
