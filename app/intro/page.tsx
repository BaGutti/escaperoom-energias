"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { initializeGame } from "@/lib/gameState";

const storyParts = [
  {
    id: 1,
    text: "Era un día como tantos otros, de esos en que el mes de junio viste de oro las hojas de los árboles...",
    subtext: "Harry caminaba distraído, sumido en sus pensamientos.",
    image: null,
    duration: 6000 // 6 segundos - introducción simple
  },
  {
    id: 2,
    text: "¡TRAS! ¡CRAC! ¡CATAPLUM!",
    subtext: "Un tremendo estruendo sacudió el mundo bajo sus pies. El suelo se abrió cual boca hambrienta...",
    image: null,
    duration: 7000 // 7 segundos - texto más largo
  },
  {
    id: 3,
    text: "Harry cayó por la alcantarilla",
    subtext: "Cuando tocó el suelo, no sintió dolor alguno. Alzó la vista y lo que vio le heló la sangre...",
    image: "/images/harry-cayendo.png",
    duration: 9000 // 9 segundos - tiene imagen dramática
  },
  {
    id: 4,
    text: "Estaba en su ciudad, pero una ciudad que no era.",
    subtext: "Todo lucía un color de óxido y herrumbre, como si el tiempo mismo se hubiera oxidado junto con el mundo.",
    image: "/images/ciudad-oxidada.png",
    duration: 9000 // 9 segundos - imagen + texto largo
  },
  {
    id: 5,
    text: "En la plaza donde solía alimentar palomas...",
    subtext: "Descubrió criaturas que jamás había contemplado: ¡Babosas luminosas reunidas en asamblea!",
    image: "/images/babosas-luminosas.png",
    duration: 9000 // 9 segundos - imagen importante + texto
  },
  {
    id: 6,
    text: "Las babosas le revelaron una terrible verdad:",
    subtext: "Este no era un mundo nuevo, sino el futuro que aguardaba a la humanidad...",
    image: null,
    duration: 7000 // 7 segundos - revelación importante
  },
  {
    id: 7,
    text: '"La humanidad causó este páramo desértico con sus malas prácticas."',
    subtext: "Pero aún hay esperanza. Te enseñaremos cómo salvar el planeta...",
    image: null,
    duration: 8000 // 8 segundos - mensaje final importante
  }
];

export default function IntroPage() {
  const router = useRouter();
  const [currentPart, setCurrentPart] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [canSkip, setCanSkip] = useState(false);

  useEffect(() => {
    // Inicializar el juego cuando empieza
    initializeGame();

    // Permitir skip después de 2 segundos
    const skipTimer = setTimeout(() => setCanSkip(true), 2000);
    return () => clearTimeout(skipTimer);
  }, []);

  useEffect(() => {
    if (currentPart < storyParts.length) {
      const currentDuration = storyParts[currentPart].duration;
      const timer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(() => {
          setCurrentPart(prev => prev + 1);
          setIsVisible(true);
        }, 500);
      }, currentDuration);

      return () => clearTimeout(timer);
    } else {
      // Historia terminada, ir al primer juego
      setTimeout(() => {
        router.push('/game/explore');
      }, 2000);
    }
  }, [currentPart, router]);

  const handleSkip = () => {
    if (canSkip) {
      router.push('/game/explore');
    }
  };

  const currentStory = storyParts[currentPart];

  if (currentPart >= storyParts.length) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-arcane-deep-purple to-black">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-arcane-neon-green glow-text mb-4">
            Tu aventura comienza ahora...
          </h2>
          <div className="animate-pulse">
            <div className="w-16 h-16 border-4 border-arcane-neon-green border-t-transparent rounded-full animate-spin mx-auto"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-gradient-to-b from-arcane-deep-purple via-arcane-dark-purple to-black relative overflow-hidden">
      {/* Efectos de fondo */}
      <div className="absolute inset-0 opacity-10">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-arcane-neon-green rounded-full"
            style={{
              width: Math.random() * 4 + 2 + 'px',
              height: Math.random() * 4 + 2 + 'px',
              top: Math.random() * 100 + '%',
              left: Math.random() * 100 + '%',
              animation: `pulse ${Math.random() * 3 + 2}s infinite`
            }}
          />
        ))}
      </div>

      {/* Contador de progreso */}
      <div className="absolute top-8 left-0 right-0 px-8">
        <div className="max-w-2xl mx-auto">
          <div className="flex justify-between mb-2 text-sm text-arcane-copper">
            <span>Parte {currentPart + 1} de {storyParts.length}</span>
            <span>{Math.round(((currentPart + 1) / storyParts.length) * 100)}%</span>
          </div>
          <div className="w-full bg-arcane-dark-purple rounded-full h-2 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-arcane-copper to-arcane-neon-green transition-all duration-500"
              style={{ width: `${((currentPart + 1) / storyParts.length) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Contenido principal */}
      <div className={`max-w-4xl mx-auto text-center z-10 transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
        {/* Imagen si existe */}
        {currentStory.image && (
          <div className="mb-8 relative w-full h-64 md:h-96 rounded-lg overflow-hidden shadow-2xl border-2 border-arcane-copper">
            <Image
              src={currentStory.image}
              alt={currentStory.text}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-arcane-deep-purple/80 via-transparent to-transparent" />
          </div>
        )}

        <div className="bg-arcane-deep-purple/70 backdrop-blur-md border-2 border-arcane-copper rounded-lg p-12 shadow-2xl">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-arcane-neon-green glow-text">
            {currentStory.text}
          </h2>
          <p className="text-xl md:text-2xl text-gray-300 italic">
            {currentStory.subtext}
          </p>
        </div>

        {/* Indicador de auto-avance */}
        <div className="mt-8 text-sm text-gray-400 animate-pulse">
          <p>La historia continúa automáticamente...</p>
        </div>
      </div>

      {/* Botón de Skip */}
      {canSkip && (
        <button
          onClick={handleSkip}
          className="absolute bottom-8 right-8 px-6 py-3 bg-arcane-rust/50 hover:bg-arcane-rust text-white rounded-lg transition-all duration-300 border-2 border-arcane-copper hover:glow-border"
        >
          Saltar Intro →
        </button>
      )}

      {/* Efecto de viñeta */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-radial from-transparent via-transparent to-black opacity-50" />
    </div>
  );
}
