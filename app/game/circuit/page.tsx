"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  useSensor,
  useSensors,
  PointerSensor,
  closestCenter,
} from "@dnd-kit/core";
import { completeLevel, isGameStarted } from "@/lib/gameState";

interface EnergySource {
  id: string;
  name: string;
  icon: string;
  type: string;
}

interface Application {
  id: string;
  name: string;
  correctEnergy: string;
  icon: string;
  connected: boolean;
  connectedEnergy?: string;
}

// Función para mezclar un array (Fisher-Yates shuffle)
const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const baseEnergySources: EnergySource[] = [
  { id: "solar", name: "Energía Solar", icon: "☀️", type: "solar" },
  { id: "wind", name: "Energía Eólica", icon: "💨", type: "eolica" },
  { id: "hydro", name: "Energía Hidráulica", icon: "💧", type: "hidraulica" },
  { id: "geo", name: "Energía Geotérmica", icon: "🌋", type: "geotermica" },
  { id: "bio", name: "Biomasa", icon: "🌿", type: "biomasa" },
];

const baseApplications: Application[] = [
  { id: "app1", name: "Panel en Casa", correctEnergy: "solar", icon: "🏠", connected: false },
  { id: "app2", name: "Parque de Turbinas", correctEnergy: "wind", icon: "🏭", connected: false },
  { id: "app3", name: "Presa en el Río", correctEnergy: "hydro", icon: "🌊", connected: false },
  { id: "app4", name: "Planta Termal", correctEnergy: "geo", icon: "⚡", connected: false },
  { id: "app5", name: "Procesador Orgánico", correctEnergy: "bio", icon: "🔥", connected: false },
];

export default function CircuitPage() {
  const router = useRouter();
  // Mezclar arrays solo en el cliente, una vez durante el montaje inicial
  const [energySources] = useState<EnergySource[]>(() => shuffleArray(baseEnergySources));
  const [applications, setApplications] = useState<Application[]>(() => shuffleArray(baseApplications));
  const [activeId, setActiveId] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [timer, setTimer] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [feedback, setFeedback] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const correctConnections = applications.filter(
    app => app.connected && app.connectedEnergy === app.correctEnergy
  ).length;

  // Verificar si el juego está iniciado
  useEffect(() => {
    if (!isGameStarted()) {
      router.push('/');
    }
  }, [router]);

  useEffect(() => {
    if (!isComplete) {
      const interval = setInterval(() => {
        setTimer(prev => prev + 1);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [isComplete]);

  useEffect(() => {
    if (correctConnections === applications.length) {
      setIsComplete(true);
      // Calcular puntuación
      const baseScore = 1500;
      const attemptPenalty = attempts * 50;
      const timeBonus = Math.max(0, 300 - timer);
      const totalScore = Math.max(0, baseScore - attemptPenalty + timeBonus);

      setScore(totalScore);
      completeLevel(2, totalScore);

      setTimeout(() => {
        router.push('/game/recycle');
      }, 4000);
    }
  }, [correctConnections, applications.length, attempts, timer, isComplete, router]);

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveId(null);

    if (!over) return;

    const energyId = active.id as string;
    const appId = over.id as string;

    setAttempts(prev => prev + 1);

    setApplications(prevApps =>
      prevApps.map(app => {
        if (app.id === appId) {
          const isCorrect = app.correctEnergy === energyId;

          if (isCorrect) {
            setFeedback({ message: `¡Correcto! ${app.name} funciona con ${energySources.find(e => e.id === energyId)?.name}`, type: 'success' });
          } else {
            setFeedback({ message: `Incorrecto. ${app.name} necesita otro tipo de energía.`, type: 'error' });
          }

          setTimeout(() => setFeedback(null), 3000);

          return {
            ...app,
            connected: isCorrect,
            connectedEnergy: energyId,
          };
        }
        return app;
      })
    );
  };

  const handleReset = () => {
    setApplications(shuffleArray(baseApplications));
    setAttempts(0);
    setScore(0);
    setTimer(0);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const activeEnergy = energySources.find(e => e.id === activeId);

  if (isComplete) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-arcane-deep-purple to-black p-8">
        <div className="max-w-2xl w-full text-center">
          <h2 className="text-5xl font-bold text-arcane-neon-green glow-text mb-8 animate-pulse">
            🎉 ¡Circuito Completado!
          </h2>

          <div className="bg-arcane-deep-purple/70 border-4 border-arcane-copper rounded-lg p-8 mb-8">
            <p className="text-2xl text-white mb-6">
              Has conectado todas las fuentes de energía correctamente
            </p>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-gray-400 text-sm mb-2">Intentos</p>
                <p className="text-4xl font-bold text-arcane-neon-blue">{attempts}</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm mb-2">Tiempo</p>
                <p className="text-4xl font-bold text-arcane-copper">{formatTime(timer)}</p>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-arcane-copper">
              <p className="text-gray-400 text-sm mb-2">Puntuación Final</p>
              <p className="text-5xl font-bold text-arcane-neon-green">{score}</p>
            </div>
          </div>

          <p className="text-lg text-arcane-neon-blue mb-4">
            ¡Has aprendido a conectar las energías renovables!
          </p>
          <p className="text-gray-400">
            Avanzando a la pantalla final...
          </p>
          <div className="mt-4">
            <div className="w-16 h-16 border-4 border-arcane-neon-green border-t-transparent rounded-full animate-spin mx-auto"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-arcane-deep-purple via-arcane-dark-purple to-black p-8">
      {/* HUD */}
      <div className="max-w-6xl mx-auto mb-8">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-3xl font-bold text-arcane-neon-green glow-text">
              Construye el Circuito Energético
            </h1>
            <p className="text-gray-400">Arrastra las energías a sus aplicaciones correctas</p>
          </div>

          <div className="flex gap-6">
            <div className="text-right">
              <p className="text-sm text-gray-400">Conexiones</p>
              <p className="text-2xl font-bold text-arcane-neon-green">
                {correctConnections} / {applications.length}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-400">Intentos</p>
              <p className="text-2xl font-bold text-arcane-copper">{attempts}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-400">Tiempo</p>
              <p className="text-2xl font-bold text-arcane-neon-blue">{formatTime(timer)}</p>
            </div>
          </div>
        </div>

        {/* Progreso */}
        <div className="w-full bg-arcane-dark-purple rounded-full h-3 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-arcane-neon-green to-arcane-neon-blue transition-all duration-500"
            style={{ width: `${(correctConnections / applications.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Feedback */}
      {feedback && (
        <div className="max-w-6xl mx-auto mb-4">
          <div className={`p-4 rounded-lg border-2 ${
            feedback.type === 'success'
              ? 'bg-green-600/20 border-green-400'
              : 'bg-red-600/20 border-red-400'
          } animate-fade-in`}>
            <p className="text-white text-center font-semibold">{feedback.message}</p>
          </div>
        </div>
      )}

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Fuentes de Energía */}
          <div>
            <h2 className="text-2xl font-bold text-arcane-copper mb-4">
              ⚡ Fuentes de Energía
            </h2>
            <div className="space-y-4">
              {energySources.map(energy => (
                <DraggableEnergy key={energy.id} energy={energy} />
              ))}
            </div>

            <button
              onClick={handleReset}
              className="mt-6 w-full px-4 py-3 bg-arcane-rust/50 hover:bg-arcane-rust text-white rounded-lg transition-all border-2 border-arcane-copper"
            >
              🔄 Reiniciar Circuito
            </button>
          </div>

          {/* Aplicaciones */}
          <div>
            <h2 className="text-2xl font-bold text-arcane-neon-blue mb-4">
              🔌 Aplicaciones
            </h2>
            <div className="space-y-4">
              {applications.map(app => (
                <DroppableApplication key={app.id} application={app} />
              ))}
            </div>
          </div>
        </div>

        <DragOverlay>
          {activeEnergy ? (
            <div className="px-6 py-4 bg-arcane-neon-green text-black rounded-lg font-bold shadow-2xl opacity-90">
              <span className="text-2xl mr-2">{activeEnergy.icon}</span>
              {activeEnergy.name}
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>

      {/* Instrucciones */}
      <div className="max-w-6xl mx-auto mt-8 text-center">
        <p className="text-gray-500 text-sm">
          💡 Tip: Arrastra cada fuente de energía al dispositivo que mejor funcione con ella
        </p>
      </div>
    </div>
  );
}

// Componente Draggable
function DraggableEnergy({ energy }: { energy: EnergySource }) {
  const {useDraggable} = require('@dnd-kit/core');
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: energy.id,
  });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={`px-6 py-4 bg-arcane-deep-purple border-2 border-arcane-copper rounded-lg cursor-grab active:cursor-grabbing hover:bg-arcane-copper/20 transition-all ${
        isDragging ? 'opacity-50' : 'opacity-100'
      }`}
    >
      <div className="flex items-center gap-3">
        <span className="text-3xl">{energy.icon}</span>
        <span className="text-white font-semibold">{energy.name}</span>
      </div>
    </div>
  );
}

// Componente Droppable
function DroppableApplication({ application }: { application: Application }) {
  const {useDroppable} = require('@dnd-kit/core');
  const { setNodeRef, isOver } = useDroppable({
    id: application.id,
  });

  return (
    <div
      ref={setNodeRef}
      className={`px-6 py-4 border-2 rounded-lg transition-all ${
        application.connected
          ? 'bg-green-600/30 border-green-400 glow-border'
          : isOver
          ? 'bg-arcane-neon-blue/20 border-arcane-neon-blue'
          : 'bg-arcane-dark-purple/50 border-arcane-ash'
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-3xl">{application.icon}</span>
          <span className="text-white font-semibold">{application.name}</span>
        </div>
        {application.connected && (
          <span className="text-2xl text-green-400">✓</span>
        )}
      </div>
    </div>
  );
}
