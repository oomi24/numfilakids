
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, RotateCcw } from 'lucide-react';

const SYMBOLS = ['🪙', '📜', '🏛️', '⚔️', '🦅', '🇻🇪', '🌟', '🛡️'];

interface Card {
  id: number;
  symbol: string;
  isFlipped: boolean;
  isMatched: boolean;
}

interface MemoryGameProps {
  onBack: () => void;
}

const MemoryGame: React.FC<MemoryGameProps> = ({ onBack }) => {
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [matches, setMatches] = useState(0);
  const [showWin, setShowWin] = useState(false);

  const initGame = () => {
    const deck: Card[] = [...SYMBOLS, ...SYMBOLS]
      .sort(() => Math.random() - 0.5)
      .map((symbol, index) => ({
        id: index,
        symbol,
        isFlipped: false,
        isMatched: false
      }));
    setCards(deck);
    setFlippedCards([]);
    setMoves(0);
    setMatches(0);
    setShowWin(false);
  };

  useEffect(() => {
    initGame();
  }, []);

  const handleCardClick = (id: number) => {
    if (flippedCards.length === 2 || cards[id].isFlipped || cards[id].isMatched) return;

    const newCards = [...cards];
    newCards[id].isFlipped = true;
    setCards(newCards);

    const newFlipped = [...flippedCards, id];
    setFlippedCards(newFlipped);

    if (newFlipped.length === 2) {
      setMoves(m => m + 1);
      const [firstId, secondId] = newFlipped;
      if (cards[firstId].symbol === cards[secondId].symbol) {
        newCards[firstId].isMatched = true;
        newCards[secondId].isMatched = true;
        setCards(newCards);
        setFlippedCards([]);
        setMatches(m => m + 1);
        if (matches + 1 === SYMBOLS.length) {
          setTimeout(() => setShowWin(true), 500);
        }
      } else {
        setTimeout(() => {
          newCards[firstId].isFlipped = false;
          newCards[secondId].isFlipped = false;
          setCards(newCards);
          setFlippedCards([]);
        }, 1000);
      }
    }
  };

  return (
    <div className="flex flex-col h-full gap-4">
      <div className="flex items-center justify-between">
        <button onClick={onBack} className="p-2 bg-blue-100 text-blue-800 rounded-xl flex items-center gap-1 font-bold">
          <ChevronLeft size={20} /> Atrás
        </button>
        <div className="bg-white px-4 py-2 rounded-xl shadow-sm border-2 border-blue-800 flex gap-4 text-sm font-bold">
          <span className="text-blue-800">Parejas: {matches}/{SYMBOLS.length}</span>
          <span className="text-gray-500">Movimientos: {moves}</span>
        </div>
        <button onClick={initGame} className="p-2 bg-yellow-400 text-yellow-900 rounded-xl">
          <RotateCcw size={20} />
        </button>
      </div>

      <div className="flex-1 grid grid-cols-4 gap-2 py-4">
        {cards.map((card) => (
          <motion.div
            key={card.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="perspective-1000"
            onClick={() => handleCardClick(card.id)}
          >
            <div className={`relative w-full aspect-square transition-transform duration-500 transform-style-3d ${card.isFlipped || card.isMatched ? 'rotate-y-180' : ''}`}>
              {/* Back of Card */}
              <div className="absolute inset-0 bg-blue-800 rounded-2xl flex items-center justify-center border-2 border-white shadow-md backface-hidden">
                <span className="text-white font-bold text-2xl">?</span>
              </div>
              {/* Front of Card */}
              <div className={`absolute inset-0 bg-white rounded-2xl flex items-center justify-center border-2 border-blue-800 shadow-md rotate-y-180 backface-hidden ${card.isMatched ? 'opacity-50' : ''}`}>
                <span className="text-4xl">{card.symbol}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {showWin && (
          <motion.div 
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="absolute inset-0 z-50 flex items-center justify-center p-6 bg-blue-900/40 backdrop-blur-sm"
          >
            <div className="bg-white rounded-3xl p-8 text-center shadow-2xl border-4 border-yellow-400">
              <span className="text-6xl mb-4 block">🏆</span>
              <h2 className="text-3xl font-kids font-bold text-blue-900 mb-2">¡Increíble!</h2>
              <p className="text-gray-600 mb-6">Has encontrado todos los símbolos históricos en {moves} movimientos.</p>
              <div className="flex flex-col gap-2">
                <button 
                  onClick={initGame}
                  className="w-full bg-blue-800 text-white font-bold py-3 rounded-2xl"
                >
                  Jugar de Nuevo
                </button>
                <button 
                  onClick={onBack}
                  className="w-full text-blue-800 font-bold py-3"
                >
                  Volver al Inicio
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .perspective-1000 { perspective: 1000px; }
        .transform-style-3d { transform-style: preserve-3d; }
        .backface-hidden { backface-visibility: hidden; }
        .rotate-y-180 { transform: rotateY(180deg); }
      `}</style>
    </div>
  );
};

export default MemoryGame;
