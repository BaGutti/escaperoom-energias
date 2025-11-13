"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import { completeLevel, finishGame } from "@/lib/gameState";

interface FallingItem {
  id: string;
  name: string;
  type: 'plastico' | 'vidrio' | 'papel' | 'metal' | 'organico';
  icon: string;
  x: number; // posición horizontal
  y: number; // posición vertical
  speed: number;
  category: 'reducir' | 'reutilizar' | 'reciclar';
}

interface Container {
  id: string;
  type: 'plastico' | 'vidrio' | 'papel' | 'metal' | 'organico';
  name: string;
  icon: string;
  color: string;
  count: number;
}

const itemTemplates = [
  // Plástico
  { name: "Botella PET", type: 'plastico' as const, icon: "🍼", category: 'reciclar' as const },
  { name: "Bolsa Plástica", type: 'plastico' as const, icon: "🛍️", category: 'reducir' as const },
  { name: "Envase Yogurt", type: 'plastico' as const, icon: "🥤", category: 'reutilizar' as const },

  // Vidrio
  { name: "Botella Vidrio", type: 'vidrio' as const, icon: "🍾", category: 'reciclar' as const },
  { name: "Frasco", type: 'vidrio' as const, icon: "🫙", category: 'reutilizar' as const },

  // Papel
  { name: "Periódico", type: 'papel' as const, icon: "📰", category: 'reciclar' as const },
  { name: "Caja Cartón", type: 'papel' as const, icon: "📦", category: 'reutilizar' as const },
  { name: "Papel Sucio", type: 'papel' as const, icon: "🧻", category: 'reducir' as const },

  // Metal
  { name: "Lata Aluminio", type: 'metal' as const, icon: "🥫", category: 'reciclar' as const },
  { name: "Tapas Metal", type: 'metal' as const, icon: "⚙️", category: 'reutilizar' as const },

  // Orgánico
  { name: "Cáscara Fruta", type: 'organico' as const, icon: "🍌", category: 'reciclar' as const },
  { name: "Restos Comida", type: 'organico' as const, icon: "🥗", category: 'reducir' as const },
];

const containers: Container[] = [
  { id: 'plastico', type: 'plastico', name: 'Plástico', icon: '♻️', color: 'bg-yellow-600', count: 0 },
  { id: 'vidrio', type: 'vidrio', name: 'Vidrio', icon: '🔵', color: 'bg-green-600', count: 0 },
  { id: 'papel', type: 'papel', name: 'Papel', icon: '📄', color: 'bg-blue-600', count: 0 },
  { id: 'metal', type: 'metal', name: 'Metal', icon: '⚪', color: 'bg-gray-600', count: 0 },
  { id: 'organico', type: 'organico', name: 'Orgánico', icon: '🟤', color: 'bg-amber-800', count: 0 },
];

export default function RecyclePage() {
  const router = useRouter();
  const [items, setItems] = useState<FallingItem[]>([]);
  const [containerCounts, setContainerCounts] = useState<Container[]>(containers);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [timer, setTimer] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [difficulty, setDifficulty] = useState(1);
  const [feedback, setFeedback] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const gameAreaRef = useRef<HTMLDivElement>(null);
  const nextItemId = useRef(0);

  // Generar nuevos items
  const spawnItem = useCallback(() => {
    if (isPaused || isGameOver) return;

    const template = itemTemplates[Math.floor(Math.random() * itemTemplates.length)];
    const newItem: FallingItem = {
      id: `item-${nextItemId.current++}`,
      name: template.name,
      type: template.type,
      icon: template.icon,
      category: template.category,
      x: Math.random() * 80 + 10, // Entre 10% y 90%
      y: 0,
      speed: 0.5 + (difficulty * 0.3),
    };

    setItems(prev => [...prev, newItem]);
  }, [isPaused, isGameOver, difficulty]);

  // Timer y spawn de items
  useEffect(() => {
    if (isGameOver || isPaused) return;

    const timerInterval = setInterval(() => {
      setTimer(prev => prev + 1);
    }, 1000);

    const spawnInterval = setInterval(() => {
      spawnItem();
    }, 2000 - (difficulty * 200)); // Más rápido con mayor dificultad

    return () => {
      clearInterval(timerInterval);
      clearInterval(spawnInterval);
    };
  }, [isGameOver, isPaused, spawnItem, difficulty]);

  // Mover items hacia abajo
  useEffect(() => {
    if (isGameOver || isPaused) return;

    const moveInterval = setInterval(() => {
      setItems(prevItems => {
        const updatedItems = prevItems.map(item => ({
          ...item,
          y: item.y + item.speed
        }));

        // Eliminar items que llegaron al fondo y quitar vida
        const itemsReachedBottom = updatedItems.filter(item => item.y >= 85);
        if (itemsReachedBottom.length > 0) {
          setLives(prev => Math.max(0, prev - itemsReachedBottom.length));
          setFeedback({ message: `¡Perdiste ${itemsReachedBottom.length} vida(s)!`, type: 'error' });
          setTimeout(() => setFeedback(null), 2000);
        }

        return updatedItems.filter(item => item.y < 85);
      });
    }, 50);

    return () => clearInterval(moveInterval);
  }, [isGameOver, isPaused]);

  // Aumentar dificultad cada 30 segundos
  useEffect(() => {
    if (timer > 0 && timer % 30 === 0 && difficulty < 5) {
      setDifficulty(prev => prev + 1);
      setFeedback({ message: `¡Nivel ${difficulty + 1}! Velocidad aumentada`, type: 'success' });
      setTimeout(() => setFeedback(null), 2000);
    }
  }, [timer, difficulty]);

  // Game Over
  useEffect(() => {
    if (lives <= 0 && !isGameOver) {
      setIsGameOver(true);

      // Calcular puntuación final
      const timeBonus = timer * 10;
      const finalScore = score + timeBonus;

      completeLevel(3, finalScore);
      finishGame(); // Marcar el juego como finalizado

      setTimeout(() => {
        router.push('/game/complete');
      }, 5000);
    }
  }, [lives, isGameOver, score, timer, router]);

  const handleItemClick = (item: FallingItem, containerType: string) => {
    if (item.type === containerType) {
      // Correcto
      setScore(prev => prev + (50 * difficulty));
      setContainerCounts(prev =>
        prev.map(c => c.type === containerType ? { ...c, count: c.count + 1 } : c)
      );
      setFeedback({ message: `¡Correcto! +${50 * difficulty} puntos`, type: 'success' });

      // Remover item
      setItems(prev => prev.filter(i => i.id !== item.id));
    } else {
      // Incorrecto
      setLives(prev => Math.max(0, prev - 1));
      setScore(prev => Math.max(0, prev - 25));
      setFeedback({ message: '¡Incorrecto! -25 puntos y -1 vida', type: 'error' });

      // Remover item
      setItems(prev => prev.filter(i => i.id !== item.id));
    }

    setTimeout(() => setFeedback(null), 2000);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (isGameOver) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-arcane-deep-purple to-black p-8">
        <div className="max-w-2xl w-full text-center">
          <h2 className="text-5xl font-bold text-arcane-neon-green glow-text mb-8 animate-pulse">
            {lives > 0 ? '🎉 ¡Juego Completado!' : '💀 Game Over'}
          </h2>

          <div className="bg-arcane-deep-purple/70 border-4 border-arcane-copper rounded-lg p-8 mb-8">
            <p className="text-2xl text-white mb-6">
              {lives > 0
                ? '¡Has aprendido a clasificar correctamente!'
                : 'Pero has aprendido mucho sobre reciclaje'}
            </p>

            <div className="grid grid-cols-2 gap-6 mb-6">
              <div>
                <p className="text-gray-400 text-sm mb-2">Puntuación Final</p>
                <p className="text-4xl font-bold text-arcane-neon-green">{score}</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm mb-2">Tiempo Jugado</p>
                <p className="text-4xl font-bold text-arcane-neon-blue">{formatTime(timer)}</p>
              </div>
            </div>

            <div className="border-t border-arcane-copper pt-6">
              <p className="text-gray-400 text-sm mb-2">Items Clasificados</p>
              <div className="flex justify-center gap-4 flex-wrap">
                {containerCounts.map(container => (
                  <div key={container.id} className="text-center">
                    <span className="text-2xl">{container.icon}</span>
                    <p className="text-white font-bold">{container.count}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <p className="text-lg text-arcane-neon-blue mb-4">
            ¡Has completado todos los desafíos!
          </p>
          <p className="text-gray-400">
            Avanzando al certificado final...
          </p>
          <div className="mt-4">
            <div className="w-16 h-16 border-4 border-arcane-neon-green border-t-transparent rounded-full animate-spin mx-auto"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-arcane-deep-purple via-arcane-dark-purple to-black p-4">
      {/* HUD */}
      <div className="max-w-7xl mx-auto mb-4">
        <div className="flex justify-between items-center mb-2">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-arcane-neon-green glow-text">
              Clasifica para Salvar el Futuro
            </h1>
            <p className="text-sm text-gray-400">¡Clasifica los residuos antes de que caigan!</p>
          </div>

          <button
            onClick={() => setIsPaused(!isPaused)}
            className="px-4 py-2 bg-arcane-copper/50 hover:bg-arcane-copper rounded-lg transition-all"
          >
            {isPaused ? '▶️ Reanudar' : '⏸️ Pausar'}
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          <div className="bg-arcane-deep-purple/50 rounded-lg p-3 text-center">
            <p className="text-gray-400 text-xs mb-1">Puntuación</p>
            <p className="text-2xl font-bold text-arcane-neon-green">{score}</p>
          </div>

          <div className="bg-arcane-deep-purple/50 rounded-lg p-3 text-center">
            <p className="text-gray-400 text-xs mb-1">Vidas</p>
            <p className="text-2xl font-bold text-red-500">
              {'❤️'.repeat(lives)}
            </p>
          </div>

          <div className="bg-arcane-deep-purple/50 rounded-lg p-3 text-center">
            <p className="text-gray-400 text-xs mb-1">Tiempo</p>
            <p className="text-2xl font-bold text-arcane-neon-blue">{formatTime(timer)}</p>
          </div>

          <div className="bg-arcane-deep-purple/50 rounded-lg p-3 text-center">
            <p className="text-gray-400 text-xs mb-1">Nivel</p>
            <p className="text-2xl font-bold text-arcane-copper">{difficulty}</p>
          </div>
        </div>
      </div>

      {/* Feedback */}
      {feedback && (
        <div className="max-w-7xl mx-auto mb-4">
          <div className={`p-3 rounded-lg border-2 text-center font-bold ${
            feedback.type === 'success'
              ? 'bg-green-600/20 border-green-400 text-green-400'
              : 'bg-red-600/20 border-red-400 text-red-400'
          }`}>
            {feedback.message}
          </div>
        </div>
      )}

      {/* Game Area */}
      <div className="max-w-7xl mx-auto">
        <div
          ref={gameAreaRef}
          className="relative bg-arcane-rust/20 border-4 border-arcane-copper rounded-lg overflow-hidden"
          style={{ height: '60vh', minHeight: '400px' }}
        >
          {/* Falling Items */}
          {items.map(item => (
            <div
              key={item.id}
              className="absolute transition-none cursor-pointer hover:scale-110"
              style={{
                left: `${item.x}%`,
                top: `${item.y}%`,
                transform: 'translate(-50%, -50%)'
              }}
            >
              <div className="bg-white rounded-lg p-3 shadow-2xl border-2 border-arcane-copper">
                <div className="text-4xl">{item.icon}</div>
                <div className="text-xs font-bold mt-1 text-black">{item.name}</div>
              </div>
            </div>
          ))}

          {/* Paused overlay */}
          {isPaused && (
            <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
              <div className="text-center">
                <p className="text-5xl font-bold text-white mb-4">⏸️ PAUSA</p>
                <p className="text-xl text-gray-300">Haz clic en Reanudar para continuar</p>
              </div>
            </div>
          )}
        </div>

        {/* Containers */}
        <div className="grid grid-cols-5 gap-2 mt-4">
          {containerCounts.map(container => (
            <div
              key={container.id}
              className={`${container.color} rounded-lg p-4 text-center cursor-pointer hover:opacity-80 transition-all border-2 border-white/30`}
              onDragOver={(e) => e.preventDefault()}
            >
              <div className="text-3xl mb-2">{container.icon}</div>
              <div className="text-white font-bold text-sm">{container.name}</div>
              <div className="text-white text-xs mt-1">({container.count})</div>

              {/* Click zones for items */}
              <div className="mt-2 space-y-1">
                {items.filter(item => item.y > 70).slice(0, 3).map(item => (
                  <button
                    key={item.id}
                    onClick={() => handleItemClick(item, container.type)}
                    className="w-full bg-white/20 hover:bg-white/40 rounded px-2 py-1 text-xs text-white transition-all"
                  >
                    Clasificar aquí
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Instructions */}
        <div className="mt-4 bg-arcane-deep-purple/50 rounded-lg p-4 text-center text-sm text-gray-300">
          <p>💡 <strong>Cómo jugar:</strong> Observa los objetos que caen y clasifícalos en el contenedor correcto antes de que lleguen al fondo. ¡Cada error te quita una vida!</p>
        </div>
      </div>
    </div>
  );
}
