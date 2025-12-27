
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, CheckCircle2, XCircle } from 'lucide-react';

const QUESTIONS = [
  {
    question: "¿Cuál es el nombre de la unidad monetaria actual de Venezuela?",
    options: ["Dólar", "Peso", "Bolívar", "Oro"],
    correct: 2
  },
  {
    question: "¿En qué año se fundó el Banco Central de Venezuela?",
    options: ["1811", "1940", "1999", "1879"],
    correct: 1
  },
  {
    question: "¿Cómo se llama la colección de estampillas?",
    options: ["Numismática", "Filatelia", "Arqueología", "Pintura"],
    correct: 1
  }
];

interface QuizGameProps {
  onBack: () => void;
  onScore: (score: number) => void;
}

const QuizGame: React.FC<QuizGameProps> = ({ onBack, onScore }) => {
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const handleSelect = (idx: number) => {
    if (selected !== null) return;
    setSelected(idx);
    const isCorrect = idx === QUESTIONS[currentQ].correct;
    if (isCorrect) {
      setScore(s => s + 1);
    }

    setTimeout(() => {
      if (currentQ < QUESTIONS.length - 1) {
        setCurrentQ(q => q + 1);
        setSelected(null);
      } else {
        setFinished(true);
        onScore(score + (isCorrect ? 1 : 0));
      }
    }, 1500);
  };

  return (
    <div className="flex flex-col h-full gap-6">
      <div className="flex items-center gap-4">
        <button onClick={onBack} className="p-2 bg-blue-100 text-blue-800 rounded-xl">
          <ChevronLeft size={20} />
        </button>
        <h2 className="text-2xl font-kids font-bold text-blue-900">Quiz Histórico</h2>
      </div>

      {!finished ? (
        <div className="flex-1 space-y-6">
          <div className="bg-white p-6 rounded-3xl shadow-lg border-2 border-blue-100">
            <div className="flex justify-between items-center mb-4">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Pregunta {currentQ + 1}/{QUESTIONS.length}</span>
              <div className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs font-bold">⭐ {score * 50} pts</div>
            </div>
            <h3 className="text-xl font-kids font-bold text-blue-900 leading-tight">
              {QUESTIONS[currentQ].question}
            </h3>
          </div>

          <div className="space-y-3">
            {QUESTIONS[currentQ].options.map((opt, i) => (
              <button
                key={i}
                onClick={() => handleSelect(i)}
                className={`w-full p-4 rounded-2xl text-left font-bold transition-all border-2 flex justify-between items-center ${
                  selected === null 
                    ? 'bg-white border-gray-100 hover:border-blue-300' 
                    : selected === i 
                      ? i === QUESTIONS[currentQ].correct ? 'bg-green-50 border-green-500 text-green-700' : 'bg-red-50 border-red-500 text-red-700'
                      : i === QUESTIONS[currentQ].correct ? 'bg-green-50 border-green-500 text-green-700' : 'bg-white border-gray-100 opacity-50'
                }`}
              >
                {opt}
                {selected === i && (
                   i === QUESTIONS[currentQ].correct ? <CheckCircle2 /> : <XCircle />
                )}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center text-center p-8 bg-white rounded-3xl shadow-xl border-4 border-yellow-400">
          <span className="text-7xl mb-4">📜</span>
          <h3 className="text-3xl font-kids font-bold text-blue-900 mb-2">¡Misión Cumplida!</h3>
          <p className="text-gray-600 mb-6">Has respondido correctamente {score} de {QUESTIONS.length} preguntas.</p>
          <div className="bg-blue-50 w-full p-4 rounded-2xl mb-8">
            <p className="text-xs font-bold text-blue-400 uppercase">Puntos Ganados</p>
            <p className="text-4xl font-bold text-blue-800">+{score * 50}</p>
          </div>
          <button 
            onClick={onBack}
            className="w-full bg-blue-800 text-white font-bold py-4 rounded-2xl"
          >
            Volver al Panel
          </button>
        </div>
      )}
    </div>
  );
};

export default QuizGame;
