"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { completeLevel } from "@/lib/gameState";
import { getRandomQuestions } from "@/lib/quizData";
import type { QuizQuestion } from "@/types";

export default function QuizPage() {
  const router = useRouter();
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [timer, setTimer] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    // Cargar 10 preguntas aleatorias
    setQuestions(getRandomQuestions(10));
  }, []);

  useEffect(() => {
    if (questions.length > 0 && !isComplete) {
      const interval = setInterval(() => {
        setTimer(prev => prev + 1);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [questions, isComplete]);

  const currentQ = questions[currentQuestion];

  const handleAnswerSelect = (answerIndex: number) => {
    if (showFeedback) return;

    setSelectedAnswer(answerIndex);
    setShowFeedback(true);

    const isCorrect = answerIndex === currentQ.correctAnswer;

    if (isCorrect) {
      setCorrectAnswers(prev => prev + 1);
      // Puntos por respuesta correcta (más puntos si respondes rápido)
      const questionTime = timer / (currentQuestion + 1);
      const timeBonus = Math.max(0, 200 - Math.floor(questionTime * 10));
      setScore(prev => prev + 100 + timeBonus);
    }

    // Avanzar a la siguiente pregunta después de mostrar feedback
    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(prev => prev + 1);
        setSelectedAnswer(null);
        setShowFeedback(false);
      } else {
        // Quiz completado
        setIsComplete(true);
        completeLevel(1, score);
        setTimeout(() => {
          router.push('/game/circuit');
        }, 4000);
      }
    }, 3000);
  };

  const getOptionColor = (index: number) => {
    if (!showFeedback) {
      return selectedAnswer === index
        ? 'bg-arcane-copper border-arcane-neon-green'
        : 'bg-arcane-dark-purple border-arcane-copper hover:border-arcane-neon-blue';
    }

    if (index === currentQ.correctAnswer) {
      return 'bg-green-600 border-arcane-neon-green';
    }

    if (index === selectedAnswer && index !== currentQ.correctAnswer) {
      return 'bg-red-600 border-red-400';
    }

    return 'bg-arcane-dark-purple/50 border-gray-600';
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (questions.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-arcane-deep-purple to-black">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-arcane-neon-green border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-arcane-copper">Cargando preguntas telepáticas...</p>
        </div>
      </div>
    );
  }

  if (isComplete) {
    const percentage = Math.round((correctAnswers / questions.length) * 100);

    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-arcane-deep-purple to-black p-8">
        <div className="max-w-2xl w-full text-center">
          <h2 className="text-5xl font-bold text-arcane-neon-green glow-text mb-8 animate-pulse">
            🎉 ¡Quiz Completado!
          </h2>

          <div className="bg-arcane-deep-purple/70 border-4 border-arcane-copper rounded-lg p-8 mb-8">
            <div className="grid grid-cols-2 gap-6 mb-6">
              <div>
                <p className="text-gray-400 text-sm mb-2">Respuestas Correctas</p>
                <p className="text-4xl font-bold text-arcane-neon-green">
                  {correctAnswers} / {questions.length}
                </p>
              </div>
              <div>
                <p className="text-gray-400 text-sm mb-2">Precisión</p>
                <p className="text-4xl font-bold text-arcane-neon-blue">
                  {percentage}%
                </p>
              </div>
            </div>

            <div className="border-t border-arcane-copper pt-6">
              <p className="text-gray-400 text-sm mb-2">Puntuación Total</p>
              <p className="text-5xl font-bold text-arcane-copper">
                {score}
              </p>
            </div>

            <div className="mt-6">
              <p className="text-gray-400 text-sm mb-2">Tiempo</p>
              <p className="text-2xl font-bold text-white">
                {formatTime(timer)}
              </p>
            </div>
          </div>

          <div className="text-arcane-neon-green text-lg mb-4">
            {percentage >= 80 ? '¡Excelente! Las babosas están impresionadas.' :
             percentage >= 60 ? 'Bien hecho, has aprendido mucho.' :
             '¡Sigue así! Cada respuesta nos acerca a salvar el planeta.'}
          </div>

          <p className="text-gray-400">
            Avanzando al siguiente nivel...
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
      {/* HUD Superior */}
      <div className="max-w-4xl mx-auto mb-8">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-3xl font-bold text-arcane-neon-green glow-text">
              Quiz Telepático
            </h1>
            <p className="text-gray-400">Las babosas comparten su sabiduría</p>
          </div>

          <div className="flex gap-6">
            <div className="text-right">
              <p className="text-sm text-gray-400">Puntuación</p>
              <p className="text-2xl font-bold text-arcane-copper">{score}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-400">Tiempo</p>
              <p className="text-2xl font-bold text-arcane-neon-blue">{formatTime(timer)}</p>
            </div>
          </div>
        </div>

        {/* Progreso */}
        <div className="flex justify-between mb-2 text-sm text-gray-400">
          <span>Pregunta {currentQuestion + 1} de {questions.length}</span>
          <span>{correctAnswers} correctas</span>
        </div>
        <div className="w-full bg-arcane-dark-purple rounded-full h-3 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-arcane-neon-green to-arcane-neon-blue transition-all duration-500"
            style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Pregunta */}
      <div className="max-w-4xl mx-auto">
        <div className="bg-arcane-deep-purple/70 backdrop-blur-md border-4 border-arcane-copper rounded-lg p-8 mb-8 shadow-2xl">
          {/* Icono de babosa telepática */}
          <div className="text-center mb-6">
            <span className="text-6xl inline-block animate-float">🐌</span>
            <div className="text-sm text-arcane-neon-green mt-2 italic">
              *transmisión telepática activada*
            </div>
          </div>

          {/* Pregunta */}
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-8 text-center">
            {currentQ.question}
          </h2>

          {/* Opciones */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {currentQ.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                disabled={showFeedback}
                className={`p-6 rounded-lg border-2 transition-all duration-300 ${getOptionColor(index)} ${
                  !showFeedback ? 'hover:scale-105 cursor-pointer' : 'cursor-not-allowed'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl font-bold text-arcane-neon-green">
                    {String.fromCharCode(65 + index)}
                  </span>
                  <span className="text-lg text-white text-left">{option}</span>
                  {showFeedback && index === currentQ.correctAnswer && (
                    <span className="ml-auto text-2xl">✓</span>
                  )}
                  {showFeedback && index === selectedAnswer && index !== currentQ.correctAnswer && (
                    <span className="ml-auto text-2xl">✗</span>
                  )}
                </div>
              </button>
            ))}
          </div>

          {/* Explicación */}
          {showFeedback && (
            <div className="mt-6 p-6 bg-black/50 rounded-lg border-2 border-arcane-neon-green animate-fade-in">
              <h3 className="text-arcane-neon-green font-bold mb-2 text-lg">
                {selectedAnswer === currentQ.correctAnswer ? '✨ ¡Correcto!' : '💡 Explicación:'}
              </h3>
              <p className="text-gray-300 italic">
                {currentQ.explanation}
              </p>
            </div>
          )}
        </div>

        {/* Ayuda visual */}
        {!showFeedback && (
          <div className="text-center text-gray-500 text-sm animate-pulse">
            Selecciona una respuesta
          </div>
        )}
      </div>
    </div>
  );
}
