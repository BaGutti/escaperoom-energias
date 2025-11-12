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
