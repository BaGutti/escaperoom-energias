# 🐌 Babosas del Futuro - Escape Room Educativo

Un escape room interactivo educativo sobre energías renovables y reciclaje, basado en la historia de Harry y las babosas del futuro.

## 📖 Descripción

Este proyecto es un escape room digital diseñado para estudiantes de 6° y 7° grado de bachillerato en Colombia. A través de una narrativa inmersiva, los estudiantes aprenden sobre energías renovables y la importancia del reciclaje mientras ayudan a Harry a salvar el futuro.

### Historia
Harry cae por una alcantarilla y viaja al futuro, donde encuentra un mundo oxidado y desértico. Allí conoce a unas babosas luminosas que le enseñan sobre energías renovables y cómo las malas prácticas humanas destruyeron el planeta. Con este conocimiento, Harry regresa a su tiempo con la misión de salvar el futuro.

## 🎮 Niveles del Juego

### MVP (Versión 1.0)
1. **El Mundo de las Babosas** (Point & Click)
   - Exploración de la ciudad oxidada
   - Descubrimiento de 7 fuentes de energía renovable
   - Sistema de puntuación basado en tiempo

2. **Quiz Telepático de las Babosas**
   - 10 preguntas sobre energías renovables
   - Feedback educativo en cada respuesta
   - Sistema de puntuación con bonos por velocidad

3. **Construye el Circuito Energético** (Drag & Drop)
   - Conectar fuentes de energía con sus aplicaciones
   - Sistema de validación en tiempo real
   - Puntuación basada en intentos y tiempo

### Fase 2 (Próximamente)
4. **Clasifica para Salvar el Futuro** (Timing Game)
   - Clasificación de residuos en tiempo real
   - Mecánica estilo "falling objects"
   - Enfoque en las 3R (Reducir, Reutilizar, Reciclar)

## 🛠️ Tecnologías Utilizadas

- **Framework:** Next.js 15 (App Router)
- **Lenguaje:** TypeScript
- **Estilos:** Tailwind CSS
- **Interactividad:** @dnd-kit/core (Drag & Drop)
- **Despliegue:** Netlify
- **Base de Datos:** Supabase (próximamente para logs)

## 🎨 Diseño Visual

El juego utiliza una paleta de colores inspirada en la serie Arcane:
- **Tonos oxidados:** Cobre (#B87333), Rust (#A0522D)
- **Acentos neón:** Verde (#39FF14), Azul (#00D9FF)
- **Fondos oscuros:** Morado profundo (#1A0F25, #2D1B3D)

## 🚀 Instalación y Ejecución

### Prerequisitos
- Node.js 18+
- npm o yarn

### Pasos

1. Clonar el repositorio:
```bash
git clone https://github.com/BaGutti/escaperoom-energias.git
cd escaperoom-energias
```

2. Instalar dependencias:
```bash
npm install
```

3. Ejecutar en desarrollo:
```bash
npm run dev
```

4. Abrir en el navegador:
```
http://localhost:3000
```

## 📦 Scripts Disponibles

- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Genera build de producción
- `npm start` - Inicia el servidor de producción
- `npm run lint` - Ejecuta el linter

## 🌍 Deploy en Netlify

### Configuración

1. Conectar el repositorio de GitHub con Netlify
2. Configurar build settings:
   - **Build command:** `npm run build`
   - **Publish directory:** `.next`
3. Deploy automático en cada push a `main`

## 📚 Contenido Educativo

### Energías Renovables Cubiertas

1. **☀️ Energía Solar** - El "padre generoso"
2. **💨 Energía Eólica** - El "danzarín invisible"
3. **💧 Energía Hidráulica** - Las "venas del mundo"
4. **🌋 Energía Geotérmica** - El "fuego interno"
5. **🌿 Biomasa** - El "círculo de la vida"
6. **🌊 Energía Undimotriz** - El "corazón pulsante"
7. **♻️ Biogás** - El "tesoro oculto"

### Conceptos de Reciclaje

- **Reducir:** Consumir menos recursos
- **Reutilizar:** Dar nueva vida a los objetos
- **Reciclar:** Transformar materiales usados

## 👥 Público Objetivo

- **Edad:** 11-13 años (6° y 7° grado)
- **Duración:** 15-20 minutos
- **Jugadores simultáneos:** Hasta 20 personas
- **Contexto:** Proyecto educativo universitario

## 🎯 Objetivos de Aprendizaje

1. Identificar diferentes tipos de energías renovables
2. Comprender cómo funcionan las energías limpias
3. Reconocer la importancia del reciclaje
4. Aplicar las 3R en la vida cotidiana
5. Desarrollar conciencia ambiental

## 📝 Estructura del Proyecto

```
escaperoom-energias/
├── app/
│   ├── game/
│   │   ├── explore/     # Juego 1: Point & Click
│   │   ├── quiz/        # Juego 2: Quiz
│   │   ├── circuit/     # Juego 3: Drag & Drop
│   │   └── complete/    # Pantalla final
│   ├── intro/           # Historia introductoria
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/          # Componentes reutilizables
├── lib/
│   ├── gameState.ts    # Manejo de estado del juego
│   └── quizData.ts     # Datos de preguntas
├── types/
│   └── index.ts        # Definiciones de TypeScript
└── public/
    ├── images/
    └── sounds/
```

## 🔮 Roadmap

### Versión 1.0 (MVP) ✅
- [x] Sistema base de Next.js
- [x] Tres juegos principales
- [x] Sistema de puntuación
- [x] Certificado descargable

### Versión 1.1 (En desarrollo)
- [ ] Juego de clasificación de reciclaje
- [ ] Integración con Supabase
- [ ] Panel de administrador
- [ ] Sistema de autenticación con PIN

### Versión 2.0 (Futuro)
- [ ] Modo multijugador en tiempo real
- [ ] Leaderboard global
- [ ] Más niveles educativos
- [ ] Versión móvil optimizada
- [ ] Soporte multiidioma

## 👨‍💻 Autor

**Proyecto de Prácticas Universitarias - Licenciatura**

Desarrollado por el equipo con apoyo de IA (Claude) para la implementación técnica.

## 📄 Licencia

Este proyecto es de uso educativo.

## 🙏 Agradecimientos

- A las babosas del futuro por su sabiduría 🐌
- A todos los estudiantes que aprenderán sobre energías renovables
- A la comunidad de Next.js y React

---

**¿Listo para salvar el futuro? ¡Comienza tu aventura ahora!** 🌍💚
