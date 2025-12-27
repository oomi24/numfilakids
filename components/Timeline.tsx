
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, History, Flag, Milestone, Book } from 'lucide-react';

const ERAS = [
  { year: '1811', title: 'Primera República', desc: 'Se emitieron los primeros vales de papel moneda en Venezuela.', icon: <Flag /> },
  { year: '1843', title: 'Monedas de Cobre', desc: 'Aparecen las famosas monedas con el busto de la Libertad.', icon: <Milestone /> },
  { year: '1879', title: 'Nace el Bolívar', desc: 'Se establece el Bolívar como unidad monetaria nacional.', icon: <History /> },
  { year: '1940', title: 'Creación del BCV', desc: 'Nace el Banco Central para organizar nuestra economía.', icon: <Book /> },
];

const Timeline: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [selectedIdx, setSelectedIdx] = useState(0);

  return (
    <div className="flex flex-col h-full gap-6">
      <div className="flex items-center gap-4">
        <button onClick={onBack} className="p-2 bg-blue-100 text-blue-800 rounded-xl">
          <ChevronLeft size={20} />
        </button>
        <h2 className="text-2xl font-kids font-bold text-blue-900">Nuestra Historia</h2>
      </div>

      <div className="flex-1 flex flex-col gap-8 py-4">
        {/* Storytelling card */}
        <motion.div 
          key={selectedIdx}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-6 rounded-3xl shadow-xl border-4 border-blue-800 relative overflow-hidden"
        >
          <div className="absolute top-[-20px] right-[-20px] w-32 h-32 bg-yellow-400/20 rounded-full blur-2xl" />
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-yellow-400 rounded-2xl text-yellow-900">
              {ERAS[selectedIdx].icon}
            </div>
            <div>
              <h3 className="text-2xl font-kids font-bold text-blue-900">{ERAS[selectedIdx].year}</h3>
              <p className="text-sm font-bold text-blue-600 uppercase tracking-widest">{ERAS[selectedIdx].title}</p>
            </div>
          </div>
          <p className="text-gray-700 leading-relaxed font-semibold">
            {ERAS[selectedIdx].desc}
          </p>
          <div className="mt-6 p-4 bg-gray-50 rounded-2xl text-xs text-gray-500 italic">
            Dato Curioso: En esta época se utilizaban elementos de la naturaleza como inspiración para los grabados.
          </div>
        </motion.div>

        {/* Timeline dots */}
        <div className="flex justify-between items-center relative px-4 mt-8">
          <div className="absolute h-1 bg-gray-200 left-8 right-8 top-1/2 -translate-y-1/2 z-0" />
          {ERAS.map((era, i) => (
            <button 
              key={era.year}
              onClick={() => setSelectedIdx(i)}
              className="relative z-10 flex flex-col items-center gap-2"
            >
              <motion.div 
                animate={{ 
                  scale: selectedIdx === i ? 1.5 : 1,
                  backgroundColor: selectedIdx === i ? '#F9E300' : '#E5E7EB',
                  borderColor: selectedIdx === i ? '#00247D' : '#D1D5DB'
                }}
                className="w-6 h-6 rounded-full border-4 transition-colors"
              />
              <span className={`text-[10px] font-bold ${selectedIdx === i ? 'text-blue-800' : 'text-gray-400'}`}>
                {era.year}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="bg-blue-800 text-white p-6 rounded-3xl flex items-center gap-4">
        <div className="text-4xl">👨‍🏫</div>
        <div>
          <p className="text-sm font-bold leading-tight">¿Sabías que la palabra "Bolívar" ha estado en nuestras monedas por más de 140 años?</p>
        </div>
      </div>
    </div>
  );
};

export default Timeline;
