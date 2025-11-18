import { QuizQuestion } from '@/types';

export const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: '¿Qué energía proviene del "padre generoso" que nace cada mañana en el oriente?',
    options: [
      'Energía Eólica',
      'Energía Solar',
      'Energía Hidráulica',
      'Energía Geotérmica'
    ],
    correctAnswer: 1,
    explanation: 'La energía solar captura los rayos del sol con paneles fotovoltaicos, proporcionando energía limpia sin contaminar.',
    energyType: 'solar'
  },
  {
    id: 2,
    question: '¿Cómo se aprovecha la energía del "danzarín invisible" según las babosas?',
    options: [
      'Con turbinas hidroeléctricas',
      'Con paneles solares',
      'Con molinos de viento',
      'Con plantas geotérmicas'
    ],
    correctAnswer: 2,
    explanation: 'Los molinos de viento transforman la energía del viento en electricidad. El viento es libre, eterno y nunca se agota.',
    energyType: 'eolica'
  },
  {
    id: 3,
    question: '¿Qué energía viene de las "venas del mundo" que corren desde las montañas hasta el mar?',
    options: [
      'Energía Undimotriz',
      'Energía Hidráulica',
      'Energía Biomasa',
      'Energía Solar'
    ],
    correctAnswer: 1,
    explanation: 'La energía hidráulica aprovecha la fuerza de las corrientes de los ríos con turbinas para generar electricidad sin contaminar el agua.',
    energyType: 'hidraulica'
  },
  {
    id: 4,
    question: '¿Qué fuerza aprovecha la energía undimotriz mencionada por las babosas?',
    options: [
      'El calor interno de la Tierra',
      'La luz del sol',
      'Las olas y mareas del océano',
      'El viento de las montañas'
    ],
    correctAnswer: 2,
    explanation: 'La energía undimotriz aprovecha el poder de las olas y mareas del océano, esos latidos rítmicos del gran corazón marino.',
    energyType: 'undimotriz'
  },
  {
    id: 5,
    question: 'El "fuego que vive en las entrañas del mundo" se refiere a:',
    options: [
      'Energía Nuclear',
      'Energía Geotérmica',
      'Energía de Combustibles',
      'Energía Biomasa'
    ],
    correctAnswer: 1,
    explanation: 'La energía geotérmica aprovecha el calor natural del centro de la Tierra para generar vapor y electricidad sin quemar bosques.',
    energyType: 'geotermica'
  },
  {
    id: 6,
    question: '¿Qué son los desechos vegetales, madera muerta y residuos de cosechas según las babosas?',
    options: [
      'Basura sin valor',
      'Biomasa que puede generar energía',
      'Material para construcción',
      'Alimento para animales'
    ],
    correctAnswer: 1,
    explanation: 'La biomasa transforma desechos vegetales en energía útil. Es el círculo de la vida: lo que nace, muere y renace como fuerza.',
    energyType: 'biomasa'
  },
  {
    id: 7,
    question: '¿Qué gas "mágico" se produce de la descomposición de desperdicios orgánicos?',
    options: [
      'Oxígeno',
      'Hidrógeno',
      'Biogás',
      'Gas natural'
    ],
    correctAnswer: 2,
    explanation: 'El biogás se produce cuando los desperdicios orgánicos fermentan. Hasta la basura tiene un propósito noble si sabemos aprovecharla.',
    energyType: 'biogas'
  },
  {
    id: 8,
    question: 'La primera "R" que enseñaron las babosas a Harry es:',
    options: [
      'Reciclar',
      'Reducir',
      'Reutilizar',
      'Renovar'
    ],
    correctAnswer: 1,
    explanation: 'Reducir significa consumir menos y necesitar menos de lo superfluo. La avaricia de poseer más y más es el cáncer del planeta.',
    energyType: 'solar'
  },
  {
    id: 9,
    question: '¿Qué significa "Reutilizar" según las babosas?',
    options: [
      'Tirar todo a la basura',
      'Dar nueva vida a lo usado',
      'Comprar cosas nuevas',
      'Quemar los desechos'
    ],
    correctAnswer: 1,
    explanation: 'Reutilizar es dar nueva vida a lo usado. Una botella puede servir mil veces antes de descansar. La creatividad vence al desperdicio.',
    energyType: 'solar'
  },
  {
    id: 10,
    question: '¿Cuál es el principal beneficio de las energías renovables?',
    options: [
      'Son más baratas siempre',
      'No se agotan y no contaminan',
      'Son más fáciles de usar',
      'Hacen que llueva más'
    ],
    correctAnswer: 1,
    explanation: 'Las energías renovables no se agotan como los combustibles fósiles y generan mucha menos contaminación, ayudando a salvar el planeta.',
    energyType: 'solar'
  },
  {
    id: 11,
    question: '¿Por qué las babosas viven en un mundo color cobre y oxidado?',
    options: [
      'Es su color favorito',
      'Por las malas prácticas de los humanos con el planeta',
      'Por falta de agua',
      'Por un meteorito'
    ],
    correctAnswer: 1,
    explanation: 'La humanidad causó ese páramo desértico con sus malas prácticas ambientales, envenenando al planeta hasta su propia extinción.',
    energyType: 'solar'
  },
  {
    id: 12,
    question: '¿Qué convierte "lo viejo en nuevo" según la tercera R?',
    options: [
      'Reutilizar',
      'Reducir',
      'Reciclar',
      'Renovar'
    ],
    correctAnswer: 2,
    explanation: 'Reciclar transforma lo viejo en nuevo. El vidrio vuelve a ser vidrio, el metal vuelve a ser metal. Nada debe perderse para siempre.',
    energyType: 'solar'
  },
  {
    id: 13,
    question: '¿Cuál de estas NO es una energía renovable?',
    options: [
      'Energía Solar',
      'Energía del Petróleo',
      'Energía Eólica',
      'Energía Hidráulica'
    ],
    correctAnswer: 1,
    explanation: 'El petróleo es un combustible fósil que se agota y contamina. Las babosas llaman a esos recursos "la maldición del pasado".',
    energyType: 'solar'
  },
  {
    id: 14,
    question: '¿Dónde se instalan principalmente los paneles solares?',
    options: [
      'Bajo tierra',
      'En el fondo del mar',
      'En techos y campos abiertos',
      'Dentro de las casas'
    ],
    correctAnswer: 2,
    explanation: 'Los paneles solares necesitan luz directa del sol, por eso se instalan en lugares altos y despejados como techos y campos.',
    energyType: 'solar'
  },
  {
    id: 15,
    question: '¿Qué energía aprovecha las corrientes de agua de los ríos?',
    options: [
      'Energía Undimotriz',
      'Energía Hidráulica',
      'Energía Térmica',
      'Energía Nuclear'
    ],
    correctAnswer: 1,
    explanation: 'La energía hidráulica captura la fuerza del agua que fluye en ríos y represas, moviéndose eternamente desde las montañas.',
    energyType: 'hidraulica'
  },
  {
    id: 16,
    question: '¿Cuántas "R" enseñaron las babosas a Harry sobre el reciclaje?',
    options: [
      '2 Rs',
      '3 Rs',
      '4 Rs',
      '5 Rs'
    ],
    correctAnswer: 1,
    explanation: 'Las babosas enseñaron las 3 Rs sagradas: Reducir, Reutilizar y Reciclar. Tres pilares para sostener al mundo.',
    energyType: 'solar'
  },
  {
    id: 17,
    question: '¿Qué tipo de energía se genera en los géiseres y volcanes?',
    options: [
      'Energía Solar',
      'Energía Geotérmica',
      'Energía Eólica',
      'Energía Biomasa'
    ],
    correctAnswer: 1,
    explanation: 'Los géiseres y volcanes liberan el calor interior de la Tierra. La energía geotérmica canaliza ese poder antiguo sin dañar el suelo.',
    energyType: 'geotermica'
  },
  {
    id: 18,
    question: '¿Qué sucede si NO cuidamos el planeta según las babosas?',
    options: [
      'Nada malo',
      'Lloverá más',
      'Se convertirá en un páramo oxidado',
      'Habrá más bosques'
    ],
    correctAnswer: 2,
    explanation: 'Las babosas mostraron a Harry el futuro: un mundo gris, oxidado y deshabitado. Ese es el destino si ignoramos las advertencias.',
    energyType: 'solar'
  },
  {
    id: 19,
    question: '¿Cuál es la ventaja de los molinos de viento modernos?',
    options: [
      'No necesitan viento',
      'Generan electricidad sin contaminar',
      'Son muy baratos',
      'Ocupan poco espacio'
    ],
    correctAnswer: 1,
    explanation: 'Los molinos modernos atrapan la energía del viento y la convierten en electricidad limpia, sin humo negro ni cenizas.',
    energyType: 'eolica'
  },
  {
    id: 20,
    question: '¿Por qué la biomasa es considerada renovable?',
    options: [
      'Porque nunca se acaba',
      'Porque las plantas y cultivos vuelven a crecer',
      'Porque es gratis',
      'Porque contamina menos'
    ],
    correctAnswer: 1,
    explanation: 'La biomasa usa restos de plantas que cada año vuelven a crecer. Es un ciclo eterno: la vida que renace de la vida anterior.',
    energyType: 'biomasa'
  },
  {
    id: 21,
    question: '¿Qué hace el biogás con la basura orgánica?',
    options: [
      'La quema directamente',
      'La entierra',
      'La transforma en gas combustible',
      'La convierte en agua'
    ],
    correctAnswer: 2,
    explanation: 'El biogás fermenta la basura orgánica y libera un gas que puede usarse para cocinar o generar electricidad. Hasta la putrefacción tiene belleza.',
    energyType: 'biogas'
  },
  {
    id: 22,
    question: '¿Qué significa "reducir" en las 3 Rs?',
    options: [
      'Comprar más cosas pequeñas',
      'Consumir menos y generar menos basura',
      'Hacer ejercicio',
      'Recortar papeles'
    ],
    correctAnswer: 1,
    explanation: 'Reducir es la primera R y la más poderosa. Significa vivir con menos, necesitar menos, consumir menos. La sobriedad salva al mundo.',
    energyType: 'solar'
  },
  {
    id: 23,
    question: '¿Cuándo brillan más los paneles solares?',
    options: [
      'De noche',
      'En días nublados',
      'Al mediodía con sol directo',
      'En invierno'
    ],
    correctAnswer: 2,
    explanation: 'Los paneles solares beben la luz del sol. Cuanto más directa e intensa sea la luz, más energía capturan para alimentar al mundo.',
    energyType: 'solar'
  },
  {
    id: 24,
    question: '¿Qué problema causan los combustibles fósiles?',
    options: [
      'Nada malo',
      'Contaminan el aire y calientan el planeta',
      'Hacen mucho ruido',
      'Son muy pesados'
    ],
    correctAnswer: 1,
    explanation: 'Los combustibles fósiles envenenan el aire con humo tóxico y calientan el planeta. Son el veneno que bebió la civilización hasta morir.',
    energyType: 'solar'
  },
  {
    id: 25,
    question: '¿Qué animales mencionaron las babosas que ya no existen en su futuro?',
    options: [
      'Solo las babosas',
      'Las palomas y casi todos los animales',
      'Solo los peces',
      'Los dinosaurios'
    ],
    correctAnswer: 1,
    explanation: 'En la plaza donde Harry alimentaba palomas, ahora solo hay silencio. Los animales se extinguieron por la destrucción humana del hábitat.',
    energyType: 'solar'
  },
  {
    id: 26,
    question: '¿Qué color caracteriza al futuro distópico que visitó Harry?',
    options: [
      'Verde brillante',
      'Cobre y óxido',
      'Azul cielo',
      'Blanco puro'
    ],
    correctAnswer: 1,
    explanation: 'Todo lucía color cobre y herrumbre, como si el tiempo mismo se hubiera oxidado junto con el mundo moribundo.',
    energyType: 'solar'
  },
  {
    id: 27,
    question: '¿Qué energía aprovecha las mareas del océano?',
    options: [
      'Energía Hidráulica',
      'Energía Undimotriz',
      'Energía Solar',
      'Energía Eólica'
    ],
    correctAnswer: 1,
    explanation: 'La energía undimotriz captura el poder rítmico de las olas y mareas. El océano es un gigante que nunca duerme, siempre danzando.',
    energyType: 'undimotriz'
  },
  {
    id: 28,
    question: '¿Por qué las babosas sobrevivieron cuando los humanos no?',
    options: [
      'Eran más fuertes',
      'Se adaptaron al mundo contaminado',
      'Vivían bajo tierra',
      'Comían menos'
    ],
    correctAnswer: 1,
    explanation: 'Las babosas evolucionaron para sobrevivir en el mundo tóxico que dejaron los humanos. Son los herederos de un planeta enfermo.',
    energyType: 'solar'
  },
  {
    id: 29,
    question: '¿Cuál es la mejor forma de reutilizar una botella de plástico?',
    options: [
      'Tirarla a la basura',
      'Quemarla',
      'Usarla como maceta o recipiente',
      'Enterrarla'
    ],
    correctAnswer: 2,
    explanation: 'Reutilizar significa dar nueva vida. Una botella puede ser maceta, organizador, o mil cosas más antes de su último descanso.',
    energyType: 'solar'
  },
  {
    id: 30,
    question: '¿Qué mensaje final le dieron las babosas a Harry?',
    options: [
      'Que todo está perdido',
      'Que aún hay esperanza si actúa',
      'Que se quede en el futuro',
      'Que no diga nada'
    ],
    correctAnswer: 1,
    explanation: 'Las babosas dijeron: "Aún hay esperanza. Te enseñaremos cómo salvar el planeta". Harry tiene el poder de cambiar el futuro.',
    energyType: 'solar'
  }
];

// Función para obtener preguntas aleatorias
export const getRandomQuestions = (count: number = 10): QuizQuestion[] => {
  const shuffled = [...quizQuestions].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
};

// Función para obtener preguntas por tipo de energía
export const getQuestionsByEnergy = (energyType: string): QuizQuestion[] => {
  return quizQuestions.filter(q => q.energyType === energyType);
};
