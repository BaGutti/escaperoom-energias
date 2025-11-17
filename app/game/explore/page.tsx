"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { completeLevel, isGameStarted } from "@/lib/gameState";

interface ClickableObject {
  id: string;
  name: string;
  description: string;
  x: number; // posición en porcentaje
  y: number; // posición en porcentaje
  size: number;
  found: boolean;
  energyType: string;
}

const objects: ClickableObject[] = [
  {
    id: "sol",
    name: "El Sol Radiante",
    description: "Un antiguo panel solar oxidado. Las babosas hablan del 'padre generoso' que brilla cada día...",
    x: 75,
    y: 15,
    size: 60,
    found: false,
    energyType: "solar"
  },
  {
    id: "molino",
    name: "Molino Olvidado",
    description: "Un molino de viento roto. Las babosas lo llaman 'el danzarín invisible'...",
    x: 25,
    y: 25,
    size: 70,
    found: false,
    energyType: "eolica"
  },
  {
    id: "rio",
    name: "Río Seco",
    description: "Las marcas de un antiguo río. Las 'venas del mundo' que alguna vez fluyeron con fuerza...",
    x: 50,
    y: 70,
    size: 50,
    found: false,
    energyType: "hidraulica"
  },
  {
    id: "geiser",
    name: "Grieta Humeante",
    description: "Vapor emergiendo del suelo. El 'fuego interno de la Tierra' aún late...",
    x: 15,
    y: 60,
    size: 45,
    found: false,
    energyType: "geotermica"
  },
  {
    id: "plantas",
    name: "Restos Vegetales",
    description: "Plantas secas acumuladas. 'Lo que nace, muere y renace como fuerza'...",
    x: 65,
    y: 55,
    size: 50,
    found: false,
    energyType: "biomasa"
  },
  {
    id: "oceano",
    name: "Costa Árida",
    description: "Marcas de olas antiguas. El 'corazón pulsante del océano' dormido...",
    x: 85,
    y: 65,
    size: 55,
    found: false,
    energyType: "undimotriz"
  },
  {
    id: "basura",
    name: "Montículo Orgánico",
    description: "Desechos en descomposición. 'El gas mágico del tesoro oculto'...",
    x: 40,
    y: 40,
    size: 45,
    found: false,
    energyType: "biogas"
  }
];

export default function ExplorePage() {
  const router = useRouter();
  const [items, setItems] = useState(objects);
  const [selectedItem, setSelectedItem] = useState<ClickableObject | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [timer, setTimer] = useState(0);
  const [modalTimeout, setModalTimeout] = useState<NodeJS.Timeout | null>(null);

  const foundCount = items.filter(item => item.found).length;
  const totalCount = items.length;
  const isComplete = foundCount === totalCount;

  // Verificar si el juego está iniciado
  useEffect(() => {
    if (!isGameStarted()) {
      router.push('/');
    }
  }, [router]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(prev => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Limpiar timeout al desmontar componente
  useEffect(() => {
    return () => {
      if (modalTimeout) {
        clearTimeout(modalTimeout);
      }
    };
  }, [modalTimeout]);

  useEffect(() => {
    if (isComplete && !selectedItem) {
      // Solo avanzar cuando se haya cerrado el último modal
      // Calcular puntuación basada en tiempo
      const baseScore = 1000;
      const timeBonus = Math.max(0, 300 - timer); // Bonus por velocidad
      const totalScore = baseScore + timeBonus;

      completeLevel(0, totalScore);

      setTimeout(() => {
        router.push('/game/quiz');
      }, 5000); // Aumentado a 5 segundos
    }
  }, [isComplete, selectedItem, router, timer]);

  const closeModal = () => {
    if (modalTimeout) {
      clearTimeout(modalTimeout);
      setModalTimeout(null);
    }
    setSelectedItem(null);
  };

  const handleClick = (clickedItem: ClickableObject) => {
    if (!clickedItem.found) {
      // Limpiar cualquier timeout anterior
      if (modalTimeout) {
        clearTimeout(modalTimeout);
      }

      setItems(prevItems =>
        prevItems.map(item =>
          item.id === clickedItem.id ? { ...item, found: true } : item
        )
      );
      setSelectedItem(clickedItem);

      // Crear nuevo timeout y guardar su referencia
      const newTimeout = setTimeout(() => {
        setSelectedItem(null);
        setModalTimeout(null);
      }, 7000); // 7 segundos para que los niños lean con calma

      setModalTimeout(newTimeout);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-arcane-rust via-arcane-dark-copper to-arcane-deep-purple relative overflow-hidden">
      {/* HUD Superior */}
      <div className="absolute top-0 left-0 right-0 bg-black/50 backdrop-blur-sm p-4 z-20">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-arcane-neon-green glow-text">
              El Mundo de las Babosas
            </h1>
            <p className="text-sm text-gray-300">Explora la ciudad oxidada</p>
          </div>

          <div className="flex gap-6 items-center">
            <div className="text-right">
              <p className="text-sm text-gray-400">Objetos Encontrados</p>
              <p className="text-2xl font-bold text-arcane-copper">
                {foundCount} / {totalCount}
              </p>
            </div>

            <div className="text-right">
              <p className="text-sm text-gray-400">Tiempo</p>
              <p className="text-2xl font-bold text-arcane-neon-blue">
                {formatTime(timer)}
              </p>
            </div>

            <button
              onClick={() => setShowHint(!showHint)}
              className="px-4 py-2 bg-arcane-copper/50 hover:bg-arcane-copper rounded-lg transition-all"
            >
              💡 Pista
            </button>
          </div>
        </div>

        {/* Barra de progreso */}
        <div className="max-w-7xl mx-auto mt-3">
          <div className="w-full bg-arcane-dark-purple rounded-full h-3 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-arcane-neon-green to-arcane-neon-blue transition-all duration-500"
              style={{ width: `${(foundCount / totalCount) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Panel de Pista */}
      {showHint && (
        <div className="absolute top-24 right-4 bg-black/90 border-2 border-arcane-neon-green rounded-lg p-4 max-w-sm z-20 animate-pulse">
          <h3 className="text-arcane-neon-green font-bold mb-2">💡 Pista:</h3>
          <p className="text-white text-sm">
            Busca objetos que brillan sutilmente. Cada uno representa una fuente de energía renovable.
            ¡Hay {totalCount - foundCount} objetos por descubrir!
          </p>
        </div>
      )}

      {/* Escena de exploración */}
      <div className="relative w-full h-screen pt-32">
        {/* Representación de la ciudad oxidada */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-full h-full max-w-6xl">
            {/* Objetos clickeables - ahora más sutiles */}
            {items.map((item) => (
              <button
                key={item.id}
                onClick={() => handleClick(item)}
                disabled={item.found}
                className={`absolute transition-all duration-300 group ${
                  item.found
                    ? 'opacity-20 cursor-not-allowed'
                    : 'opacity-60 hover:opacity-100 cursor-pointer'
                }`}
                style={{
                  left: `${item.x}%`,
                  top: `${item.y}%`,
                  width: `${item.size}px`,
                  height: `${item.size}px`,
                  transform: 'translate(-50%, -50%)'
                }}
              >
                <div className={`w-full h-full rounded-lg backdrop-blur-sm ${
                  item.found
                    ? 'bg-gray-800/30 border-2 border-gray-700'
                    : 'bg-arcane-copper/10 border-2 border-arcane-copper/30 group-hover:border-arcane-neon-green group-hover:bg-arcane-neon-green/20 group-hover:shadow-lg group-hover:shadow-arcane-neon-green/50'
                } flex items-center justify-center text-xl transition-all duration-300`}>
                  {item.found ? (
                    <span className="text-gray-500">✓</span>
                  ) : (
                    <span className="opacity-0 group-hover:opacity-100 text-arcane-neon-green transition-opacity">
                      🔍
                    </span>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Texto descriptivo de fondo */}
        <div className="absolute bottom-20 left-0 right-0 text-center text-gray-400 text-sm px-4">
          <p className="italic">
            "Todo lucía un color de óxido y herrumbre, como si el tiempo mismo se hubiera oxidado junto con el mundo..."
          </p>
        </div>
      </div>

      {/* Modal de item descubierto */}
      {selectedItem && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 animate-fade-in">
          <div className="bg-gradient-to-b from-arcane-deep-purple to-black border-4 border-arcane-neon-green rounded-lg p-8 max-w-lg mx-4 glow-border relative">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-400 hover:text-white text-2xl"
            >
              ×
            </button>
            <h2 className="text-3xl font-bold text-arcane-neon-green glow-text mb-4">
              ✨ ¡Descubriste algo!
            </h2>
            <h3 className="text-2xl font-bold text-arcane-copper mb-3">
              {selectedItem.name}
            </h3>
            <p className="text-lg text-gray-300 italic mb-4">
              {selectedItem.description}
            </p>
            <div className="mt-6 text-center">
              <span className="inline-block px-4 py-2 bg-arcane-copper rounded-full text-white font-semibold mb-4">
                Energía: {selectedItem.energyType.toUpperCase()}
              </span>
            </div>
            <p className="text-sm text-gray-500 text-center mt-4">
              Clic en X o espera para continuar...
            </p>
          </div>
        </div>
      )}

      {/* Pantalla de completado - solo mostrar cuando el modal esté cerrado */}
      {isComplete && !selectedItem && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50">
          <div className="text-center">
            <h2 className="text-5xl font-bold text-arcane-neon-green glow-text mb-6 animate-pulse">
              🎉 ¡Nivel Completado!
            </h2>
            <p className="text-2xl text-arcane-copper mb-4">
              Has descubierto las {totalCount} fuentes de energía renovable
            </p>
            <p className="text-xl text-gray-300 mb-8">
              Tiempo: {formatTime(timer)}
            </p>
            <div className="text-lg text-arcane-neon-blue">
              Preparando siguiente nivel...
            </div>
            <div className="mt-4">
              <div className="w-16 h-16 border-4 border-arcane-neon-green border-t-transparent rounded-full animate-spin mx-auto"></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
