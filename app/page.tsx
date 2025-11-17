"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 relative overflow-hidden">
      {/* Efecto de partículas de fondo */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-20 w-2 h-2 bg-arcane-neon-green rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-40 w-3 h-3 bg-arcane-neon-blue rounded-full animate-pulse delay-100"></div>
        <div className="absolute bottom-20 left-1/3 w-2 h-2 bg-arcane-copper rounded-full animate-pulse delay-200"></div>
        <div className="absolute bottom-40 right-1/4 w-3 h-3 bg-arcane-neon-green rounded-full animate-pulse delay-300"></div>
      </div>

      {/* Contenido principal */}
      <div className="z-10 max-w-4xl mx-auto text-center">
        {/* Título principal */}
        <h1 className="text-6xl md:text-8xl font-bold mb-6 glow-text animate-pulse-slow">
          BABOSAS DEL FUTURO
        </h1>

        {/* Subtítulo */}
        <p className="text-xl md:text-2xl text-arcane-copper mb-8 font-semibold">
          Un viaje a través del tiempo para salvar el planeta
        </p>

        {/* Imagen de babosas */}
        <div className="mb-8 relative w-full max-w-2xl mx-auto h-64 md:h-80 rounded-lg overflow-hidden shadow-2xl border-2 border-arcane-neon-green animate-pulse-slow">
          <Image
            src="/images/babosas-luminosas.png"
            alt="Babosas luminosas del futuro"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        </div>

        {/* Descripción */}
        <div className="bg-arcane-deep-purple/50 backdrop-blur-sm border-2 border-arcane-copper rounded-lg p-8 mb-12 max-w-2xl mx-auto">
          <p className="text-lg text-gray-300 mb-4">
            Acompaña a Harry en su increíble aventura a través de la alcantarilla del tiempo,
            donde conocerá a las babosas del futuro y aprenderá sobre energías renovables
            y cómo salvar nuestro planeta.
          </p>
          <p className="text-md text-arcane-neon-green font-semibold">
            ¿Estás listo para cambiar el futuro?
          </p>
        </div>

        {/* Botón de inicio */}
        <Link href="/intro">
          <button
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className={`
              px-12 py-4 text-2xl font-bold rounded-lg
              transition-all duration-300 transform
              ${isHovered ? 'scale-110 glow-border' : 'scale-100'}
              bg-gradient-to-r from-arcane-copper to-arcane-rust
              hover:from-arcane-rust hover:to-arcane-copper
              text-white shadow-2xl
            `}
          >
            COMENZAR AVENTURA
          </button>
        </Link>

        {/* Info adicional */}
        <div className="mt-12 text-sm text-gray-400">
          <p>🎮 3 niveles educativos | ⏱️ Aproximadamente 15-20 minutos</p>
          <p className="mt-2">Recomendado para estudiantes de 6° y 7° grado</p>
        </div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-4 text-center text-xs text-gray-500">
        <p>Escape Room Educativo - Energías Renovables & Reciclaje</p>
      </div>
    </div>
  );
}
