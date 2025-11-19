"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { completeLevel, isGameStarted, markSessionActive } from "@/lib/gameState";

interface Cell {
  letter: string;
  row: number;
  col: number;
}

interface Word {
  word: string;
  found: boolean;
  cells: Cell[];
}

const WORD_POOL = [
  "SOLAR", "EOLICA", "HIDRAULICA", "GEOTERMICA", "BIOMASA", "UNDIMOTRIZ", "BIOGAS",
  "REDUCIR", "REUTILIZAR", "RECICLAR", "PLANETA", "ENERGIA", "VERDE", "FUTURO",
  "LIMPIA", "VIENTO", "AGUA", "SOL", "TIERRA", "BABOSAS", "HARRY"
];

const GRID_SIZE = 15;

export default function WordSearchPage() {
  const router = useRouter();
  const [grid, setGrid] = useState<string[][]>([]);
  const [words, setWords] = useState<Word[]>([]);
  const [selectedCells, setSelectedCells] = useState<Cell[]>([]);
  const [foundWords, setFoundWords] = useState<string[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [timer, setTimer] = useState(0);
  const [score, setScore] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  // Verificar si el juego está iniciado
  useEffect(() => {
    if (!isGameStarted()) {
      router.push('/');
    }
  }, [router]);

  // Timer
  useEffect(() => {
    if (!isComplete) {
      const interval = setInterval(() => {
        setTimer(prev => prev + 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isComplete]);

  // Generar sopa de letras
  const generateWordSearch = useCallback(() => {
    // Seleccionar 8-12 palabras aleatorias
    const numWords = Math.floor(Math.random() * 5) + 8; // 8-12 palabras
    const selectedWords = [...WORD_POOL]
      .sort(() => Math.random() - 0.5)
      .slice(0, numWords);

    const newGrid: string[][] = Array(GRID_SIZE).fill(null).map(() =>
      Array(GRID_SIZE).fill('')
    );

    const placedWords: Word[] = [];

    // Intentar colocar cada palabra
    selectedWords.forEach(word => {
      let placed = false;
      let attempts = 0;
      const maxAttempts = 100;

      while (!placed && attempts < maxAttempts) {
        attempts++;
        const direction = Math.floor(Math.random() * 4); // 0: horizontal, 1: vertical, 2: diagonal ↘, 3: diagonal ↙
        const row = Math.floor(Math.random() * GRID_SIZE);
        const col = Math.floor(Math.random() * GRID_SIZE);

        if (canPlaceWord(newGrid, word, row, col, direction)) {
          const cells = placeWord(newGrid, word, row, col, direction);
          placedWords.push({ word, found: false, cells });
          placed = true;
        }
      }
    });

    // Rellenar celdas vacías con letras aleatorias
    for (let i = 0; i < GRID_SIZE; i++) {
      for (let j = 0; j < GRID_SIZE; j++) {
        if (newGrid[i][j] === '') {
          newGrid[i][j] = String.fromCharCode(65 + Math.floor(Math.random() * 26));
        }
      }
    }

    setGrid(newGrid);
    setWords(placedWords);
  }, []);

  const canPlaceWord = (grid: string[][], word: string, row: number, col: number, direction: number): boolean => {
    const len = word.length;

    // Verificar límites
    if (direction === 0 && col + len > GRID_SIZE) return false; // horizontal
    if (direction === 1 && row + len > GRID_SIZE) return false; // vertical
    if (direction === 2 && (row + len > GRID_SIZE || col + len > GRID_SIZE)) return false; // diagonal ↘
    if (direction === 3 && (row + len > GRID_SIZE || col - len + 1 < 0)) return false; // diagonal ↙

    // Verificar conflictos
    for (let i = 0; i < len; i++) {
      let r = row;
      let c = col;

      if (direction === 0) c += i; // horizontal
      else if (direction === 1) r += i; // vertical
      else if (direction === 2) { r += i; c += i; } // diagonal ↘
      else if (direction === 3) { r += i; c -= i; } // diagonal ↙

      if (grid[r][c] !== '' && grid[r][c] !== word[i]) {
        return false;
      }
    }

    return true;
  };

  const placeWord = (grid: string[][], word: string, row: number, col: number, direction: number): Cell[] => {
    const cells: Cell[] = [];

    for (let i = 0; i < word.length; i++) {
      let r = row;
      let c = col;

      if (direction === 0) c += i;
      else if (direction === 1) r += i;
      else if (direction === 2) { r += i; c += i; }
      else if (direction === 3) { r += i; c -= i; }

      grid[r][c] = word[i];
      cells.push({ letter: word[i], row: r, col: c });
    }

    return cells;
  };

  useEffect(() => {
    generateWordSearch();
  }, [generateWordSearch]);

  // Manejo de selección de celdas
  const handleCellMouseDown = (row: number, col: number) => {
    setIsDragging(true);
    setSelectedCells([{ letter: grid[row][col], row, col }]);
  };

  const handleCellMouseEnter = (row: number, col: number) => {
    if (isDragging) {
      const lastCell = selectedCells[selectedCells.length - 1];
      // Verificar que sea adyacente o en línea
      if (isValidSelection(lastCell, { letter: grid[row][col], row, col })) {
        setSelectedCells(prev => [...prev, { letter: grid[row][col], row, col }]);
      }
    }
  };

  const handleMouseUp = () => {
    if (isDragging && selectedCells.length > 1) {
      checkWord();
    }
    setIsDragging(false);
    setSelectedCells([]);
  };

  const isValidSelection = (cell1: Cell, cell2: Cell): boolean => {
    const rowDiff = Math.abs(cell2.row - cell1.row);
    const colDiff = Math.abs(cell2.col - cell1.col);
    return (rowDiff <= 1 && colDiff <= 1) && !(rowDiff === 0 && colDiff === 0);
  };

  const checkWord = () => {
    const selectedWord = selectedCells.map(c => c.letter).join('');
    const reversedWord = selectedWord.split('').reverse().join('');

    const foundWord = words.find(w =>
      (w.word === selectedWord || w.word === reversedWord) && !w.found
    );

    if (foundWord) {
      setFoundWords(prev => [...prev, foundWord.word]);
      setWords(prev => prev.map(w =>
        w.word === foundWord.word ? { ...w, found: true } : w
      ));
      setScore(prev => prev + foundWord.word.length * 10);
    }
  };

  const isCellSelected = (row: number, col: number): boolean => {
    return selectedCells.some(c => c.row === row && c.col === col);
  };

  const isCellInFoundWord = (row: number, col: number): boolean => {
    return words.some(w =>
      w.found && w.cells.some(c => c.row === row && c.col === col)
    );
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Completar nivel
  useEffect(() => {
    if (words.length > 0 && words.every(w => w.found) && !isComplete) {
      setIsComplete(true);
      const timeBonus = Math.max(0, 300 - timer) * 2;
      const finalScore = score + timeBonus;
      completeLevel(4, finalScore);

      setTimeout(() => {
        markSessionActive();
        router.push('/game/recycle');
      }, 4000);
    }
  }, [words, isComplete, score, timer, router]);

  if (isComplete) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-arcane-deep-purple to-black p-8">
        <div className="max-w-2xl w-full text-center">
          <h2 className="text-5xl font-bold text-arcane-neon-green glow-text mb-8 animate-pulse">
            🎉 ¡Sopa Completada!
          </h2>

          <div className="bg-arcane-deep-purple/70 border-4 border-arcane-copper rounded-lg p-8 mb-8">
            <p className="text-2xl text-white mb-6">
              ¡Encontraste todas las palabras sobre energías renovables!
            </p>

            <div className="grid grid-cols-2 gap-6 mb-6">
              <div>
                <p className="text-gray-400 mb-2">Puntuación Final</p>
                <p className="text-4xl font-bold text-arcane-neon-green">{score}</p>
              </div>
              <div>
                <p className="text-gray-400 mb-2">Tiempo</p>
                <p className="text-4xl font-bold text-arcane-neon-blue">{formatTime(timer)}</p>
              </div>
            </div>

            <p className="text-gray-400 text-sm">
              Continuando a la pantalla final...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-arcane-deep-purple to-black p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* HUD */}
        <div className="bg-arcane-dark-purple border-2 border-arcane-copper rounded-lg p-4 mb-6">
          <div className="mb-3">
            <h2 className="text-xl md:text-2xl font-bold text-arcane-neon-green">🔍 Sopa de Letras Telepática</h2>
            <p className="text-xs md:text-sm text-gray-400">Encuentra las palabras sobre energías renovables</p>
          </div>
          <div className="flex gap-4 md:gap-6 justify-around md:justify-end">
            <div className="text-center">
              <p className="text-xs md:text-sm text-gray-400">Tiempo</p>
              <p className="text-lg md:text-xl font-bold text-arcane-neon-blue">{formatTime(timer)}</p>
            </div>
            <div className="text-center">
              <p className="text-xs md:text-sm text-gray-400">Puntos</p>
              <p className="text-lg md:text-xl font-bold text-arcane-neon-green">{score}</p>
            </div>
            <div className="text-center">
              <p className="text-xs md:text-sm text-gray-400">Palabras</p>
              <p className="text-lg md:text-xl font-bold text-arcane-copper">{foundWords.length}/{words.length}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
          {/* Sopa de letras */}
          <div className="lg:col-span-2">
            <div
              className="bg-arcane-dark-purple border-2 border-arcane-copper rounded-lg p-3 md:p-6 select-none touch-manipulation"
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
            >
              <div className="grid gap-0.5 md:gap-1" style={{ gridTemplateColumns: `repeat(${GRID_SIZE}, minmax(0, 1fr))` }}>
                {grid.map((row, i) =>
                  row.map((letter, j) => (
                    <div
                      key={`${i}-${j}`}
                      onMouseDown={() => handleCellMouseDown(i, j)}
                      onMouseEnter={() => handleCellMouseEnter(i, j)}
                      onTouchStart={() => handleCellMouseDown(i, j)}
                      onTouchMove={(e) => {
                        const touch = e.touches[0];
                        const element = document.elementFromPoint(touch.clientX, touch.clientY);
                        if (element && element.getAttribute('data-row')) {
                          const row = parseInt(element.getAttribute('data-row') || '0');
                          const col = parseInt(element.getAttribute('data-col') || '0');
                          handleCellMouseEnter(row, col);
                        }
                      }}
                      onTouchEnd={handleMouseUp}
                      data-row={i}
                      data-col={j}
                      className={`
                        aspect-square flex items-center justify-center text-[10px] sm:text-xs md:text-sm font-bold
                        border border-arcane-copper/30 rounded cursor-pointer transition-all touch-manipulation
                        ${isCellInFoundWord(i, j) ? 'bg-arcane-neon-green text-black' : 'bg-arcane-deep-purple text-white'}
                        ${isCellSelected(i, j) ? 'bg-arcane-neon-blue text-black scale-110' : ''}
                        hover:bg-arcane-copper/20 active:bg-arcane-copper/30
                      `}
                    >
                      {letter}
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className="mt-4 bg-arcane-deep-purple/50 rounded-lg p-3 md:p-4 text-center text-xs md:text-sm text-gray-300">
              <p className="mb-2">💡 <strong>Cómo jugar:</strong></p>
              <p>Arrastra sobre las letras para formar palabras (horizontal, vertical o diagonal)</p>
            </div>
          </div>

          {/* Lista de palabras */}
          <div className="bg-arcane-dark-purple border-2 border-arcane-copper rounded-lg p-4 md:p-6">
            <h3 className="text-lg md:text-xl font-bold text-arcane-neon-green mb-4">Palabras a Encontrar:</h3>
            <div className="space-y-2 max-h-[400px] md:max-h-96 overflow-y-auto">
              {words.map((w, idx) => (
                <div
                  key={idx}
                  className={`
                    p-2 md:p-3 rounded border-2 transition-all
                    ${w.found
                      ? 'bg-arcane-neon-green text-black border-arcane-neon-green line-through'
                      : 'bg-arcane-deep-purple text-white border-arcane-copper/50'
                    }
                  `}
                >
                  <p className="font-bold text-sm md:text-base">{w.word}</p>
                  <p className="text-xs opacity-70">{w.word.length} letras</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
