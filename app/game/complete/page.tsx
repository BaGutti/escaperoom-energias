"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { getGameState, formatTime, getPlayTime, resetGame, isGameStarted } from "@/lib/gameState";

export default function CompletePage() {
  const router = useRouter();
  const [gameState, setGameState] = useState<any>(null);
  const [playerName, setPlayerName] = useState("");
  const [nameSubmitted, setNameSubmitted] = useState(false);
  const certificateRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Verificar si llegó por navegación válida o es una recarga
    if (!isGameStarted()) {
      router.push('/');
      return;
    }
    const state = getGameState();
    if (!state) {
      router.push('/');
      return;
    }
    setGameState(state);
  }, [router]);

  const playTime = getPlayTime();

  const handleNameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (playerName.trim()) {
      setNameSubmitted(true);
    }
  };

  const handleDownloadCertificate = () => {
    // Crear un canvas temporal para generar la imagen
    if (certificateRef.current) {
      // Por ahora, simplemente abrimos la ventana de impresión
      window.print();
    }
  };

  const handlePlayAgain = () => {
    resetGame();
    router.push('/');
  };

  if (!gameState) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-arcane-deep-purple to-black">
        <div className="w-16 h-16 border-4 border-arcane-neon-green border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!nameSubmitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-arcane-deep-purple to-black p-8">
        <div className="max-w-4xl w-full">
          {/* 1. Final del cuento - Portal */}
          <div className="mb-8 relative w-full h-96 rounded-lg overflow-hidden shadow-2xl border-4 border-arcane-neon-green bg-black">
            <Image
              src="/images/babosas-cansadas.png"
              alt="Babosas creando el portal con su último aliento"
              fill
              className="object-contain"
              priority
              unoptimized
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex flex-col items-center justify-end p-8 pointer-events-none">
              <div className="text-center">
                <p className="text-2xl md:text-3xl font-bold text-arcane-neon-green glow-text mb-4">
                  "Vuelve a tu tiempo, guardián del futuro"
                </p>
                <p className="text-lg text-gray-300 italic mb-2">
                  Las babosas, con su último aliento de vida, crearon un portal luminoso...
                </p>
                <p className="text-md text-arcane-copper">
                  Te entregaron el conocimiento para salvar el planeta desde el pasado.
                </p>
              </div>
            </div>
          </div>

          {/* 2. El pergamino transformándose */}
          <div className="mb-8 relative w-full max-w-2xl mx-auto h-64 rounded-lg overflow-hidden shadow-2xl border-4 border-arcane-copper">
            <Image
              src="/images/pergaminoafolleto.png"
              alt="El conocimiento ancestral transformándose"
              fill
              className="object-contain bg-black"
              unoptimized
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-4 text-center">
              <p className="text-lg text-arcane-neon-blue font-bold">
                El conocimiento antiguo se transforma en tecnología del futuro
              </p>
            </div>
          </div>

          {/* 3. Formulario de nombre */}
          <div className="bg-arcane-deep-purple/70 border-4 border-arcane-copper rounded-lg p-8 text-center">
            <h2 className="text-3xl font-bold text-arcane-neon-green glow-text mb-4">
              🎉 ¡Has completado tu misión!
            </h2>
            <p className="text-gray-300 mb-6">
              Ahora posees el conocimiento para cambiar el futuro. Ingresa tu nombre para recibir tu certificado:
            </p>

            <form onSubmit={handleNameSubmit}>
              <input
                type="text"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                placeholder="Tu nombre completo"
                className="w-full px-4 py-3 bg-arcane-dark-purple border-2 border-arcane-copper rounded-lg text-white text-center text-lg mb-4 focus:outline-none focus:border-arcane-neon-green"
                maxLength={50}
                required
              />

              <button
                type="submit"
                className="w-full px-6 py-3 bg-gradient-to-r from-arcane-copper to-arcane-rust text-white font-bold rounded-lg hover:scale-105 transition-all"
              >
                Generar Certificado
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-arcane-deep-purple via-arcane-dark-purple to-black p-8">
      <div className="max-w-6xl mx-auto">
        {/* Celebración */}
        <div className="text-center mb-8">
          <h1 className="text-6xl font-bold text-arcane-neon-green glow-text mb-4 animate-pulse">
            🎊 ¡MISIÓN CUMPLIDA! 🎊
          </h1>
          <p className="text-2xl text-arcane-copper mb-2">
            Has completado el viaje de Harry
          </p>
          <p className="text-lg text-gray-400">
            Ahora tienes el conocimiento para salvar el futuro
          </p>
        </div>

        {/* Estadísticas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-arcane-deep-purple/70 border-2 border-arcane-neon-green rounded-lg p-6 text-center">
            <p className="text-gray-400 mb-2">Puntuación Total</p>
            <p className="text-5xl font-bold text-arcane-neon-green">{gameState.score}</p>
          </div>

          <div className="bg-arcane-deep-purple/70 border-2 border-arcane-neon-blue rounded-lg p-6 text-center">
            <p className="text-gray-400 mb-2">Tiempo Total</p>
            <p className="text-5xl font-bold text-arcane-neon-blue">{formatTime(playTime)}</p>
          </div>

          <div className="bg-arcane-deep-purple/70 border-2 border-arcane-copper rounded-lg p-6 text-center">
            <p className="text-gray-400 mb-2">Niveles Completados</p>
            <p className="text-5xl font-bold text-arcane-copper">{gameState.completedLevels.length}/3</p>
          </div>
        </div>

        {/* Certificado */}
        <div ref={certificateRef} className="mb-8">
          <div className="relative bg-gradient-to-br from-arcane-copper via-arcane-rust to-arcane-oxidized border-8 border-arcane-neon-green rounded-lg p-12 text-center shadow-2xl overflow-hidden">
            {/* Imagen de fondo del certificado */}
            <div className="absolute inset-0 opacity-20">
              <Image
                src="/images/FinalJuego-certificado.png"
                alt="Fondo del certificado"
                fill
                className="object-cover"
                unoptimized
              />
            </div>
            <div className="relative bg-black/30 rounded-lg p-8">
              <h2 className="text-4xl font-bold text-arcane-neon-green glow-text mb-6">
                ✨ CERTIFICADO DE GUARDIÁN DEL FUTURO ✨
              </h2>

              <p className="text-xl text-white mb-4">
                Se otorga el presente certificado a:
              </p>

              <p className="text-5xl font-bold text-arcane-neon-green glow-text my-6">
                {playerName}
              </p>

              <p className="text-lg text-gray-300 mb-6">
                Por completar exitosamente el viaje de Harry a través del tiempo,
                aprendiendo sobre energías renovables y comprometiéndose a salvar
                nuestro planeta para que las babosas del futuro vivan en paz.
              </p>

              <div className="grid grid-cols-2 gap-6 text-left mb-6 max-w-2xl mx-auto">
                <div>
                  <p className="text-sm text-gray-400">Energías Dominadas:</p>
                  <ul className="text-sm text-white space-y-1">
                    <li>☀️ Solar</li>
                    <li>💨 Eólica</li>
                    <li>💧 Hidráulica</li>
                    <li>🌋 Geotérmica</li>
                  </ul>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Conocimientos Adquiridos:</p>
                  <ul className="text-sm text-white space-y-1">
                    <li>🌿 Biomasa</li>
                    <li>🌊 Undimotriz</li>
                    <li>♻️ Las 3R</li>
                    <li>🔄 Reciclaje</li>
                  </ul>
                </div>
              </div>

              <div className="border-t-2 border-arcane-copper pt-6 mt-6">
                <p className="text-sm text-gray-400 mb-2">
                  Fecha de Completado: {new Date().toLocaleDateString('es-ES')}
                </p>
                <p className="text-xs text-gray-500">
                  Babosas del Futuro - Escape Room Educativo
                </p>
              </div>

              <div className="mt-8 text-center italic text-arcane-neon-blue">
                <p>"Desde ahora, las babosas tienen un aliado: {playerName.split(' ')[0]}"</p>
                <p className="text-6xl mt-4">🐌</p>
              </div>
            </div>
          </div>
        </div>

        {/* El despertar - Harry como ingeniero */}
        <div className="mb-8 relative w-full max-w-4xl mx-auto h-96 rounded-lg overflow-hidden shadow-2xl border-4 border-arcane-neon-blue">
          <Image
            src="/images/harrySalidaAlcantarilla.png"
            alt="Harry despierta como ingeniero del futuro"
            fill
            className="object-cover"
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent flex items-end justify-center p-8">
            <div className="text-center">
              <p className="text-3xl md:text-4xl font-bold text-arcane-neon-green glow-text mb-2">
                THE AWAKENING
              </p>
              <p className="text-xl text-gray-300">
                Harry despertó en su tiempo... pero ya no era el mismo
              </p>
            </div>
          </div>
        </div>

        {/* El futuro que creó */}
        <div className="mb-8 relative w-full max-w-4xl mx-auto h-96 rounded-lg overflow-hidden shadow-2xl border-4 border-arcane-neon-green">
          <Image
            src="/images/plazaPalomas.png"
            alt="El futuro verde que Harry ayudó a crear"
            fill
            className="object-cover"
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent flex items-end justify-center p-8">
            <div className="text-center">
              <p className="text-3xl md:text-4xl font-bold text-arcane-neon-green glow-text mb-2">
                A NEW HOPE FOR THE PLANET
              </p>
              <p className="text-xl text-gray-300 mb-2">
                Con su conocimiento, Harry dedicó su vida a las energías renovables
              </p>
              <p className="text-lg text-arcane-copper italic">
                Y la humanidad nunca conoció ese futuro distópico...
              </p>
            </div>
          </div>
        </div>

        {/* Botones de Acción */}
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <button
            onClick={handleDownloadCertificate}
            className="px-8 py-4 bg-gradient-to-r from-arcane-neon-green to-arcane-neon-blue text-black font-bold rounded-lg hover:scale-105 transition-all shadow-lg"
          >
            📥 Descargar/Imprimir Certificado
          </button>

          <button
            onClick={handlePlayAgain}
            className="px-8 py-4 bg-gradient-to-r from-arcane-copper to-arcane-rust text-white font-bold rounded-lg hover:scale-105 transition-all shadow-lg"
          >
            🔄 Jugar de Nuevo
          </button>
        </div>

        {/* Mensaje Final */}
        <div className="mt-12 bg-arcane-deep-purple/50 border-2 border-arcane-copper rounded-lg p-6 text-center">
          <h3 className="text-2xl font-bold text-arcane-neon-green mb-4">
            📚 ¿Qué sigue?
          </h3>
          <p className="text-gray-300 mb-4">
            Ahora que conoces las energías renovables, ¡es tu turno de hacer la diferencia!
          </p>
          <ul className="text-left max-w-2xl mx-auto text-gray-400 space-y-2">
            <li>✓ Comparte lo aprendido con tu familia y amigos</li>
            <li>✓ Practica las 3R: Reducir, Reutilizar, Reciclar</li>
            <li>✓ Investiga proyectos de energía renovable en tu comunidad</li>
            <li>✓ Sé consciente del consumo de energía</li>
            <li>✓ ¡Cada pequeña acción cuenta para salvar el planeta!</li>
          </ul>
        </div>
      </div>

      {/* Estilos de impresión */}
      <style jsx>{`
        @media print {
          body {
            background: white;
          }
          .no-print {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
}
