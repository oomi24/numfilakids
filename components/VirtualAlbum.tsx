
import React from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, Info, Search } from 'lucide-react';
import { INITIAL_ITEMS } from '../constants';

interface VirtualAlbumProps {
  onBack: () => void;
}

const VirtualAlbum: React.FC<VirtualAlbumProps> = ({ onBack }) => {
  return (
    <div className="flex flex-col h-full gap-6">
      <div className="flex items-center gap-4">
        <button onClick={onBack} className="p-2 bg-blue-100 text-blue-800 rounded-xl">
          <ChevronLeft size={20} />
        </button>
        <h2 className="text-2xl font-kids font-bold text-blue-900">Mi Álbum Histórico</h2>
      </div>

      <div className="bg-blue-50 rounded-2xl p-4 flex items-center gap-3">
        <Search className="text-blue-400" />
        <input 
          placeholder="Buscar moneda o estampa..." 
          className="bg-transparent outline-none flex-1 text-sm font-bold"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {INITIAL_ITEMS.map((item) => (
          <motion.div 
            key={item.id}
            whileHover={{ y: -5 }}
            className={`relative p-4 rounded-3xl border-2 transition-all ${item.unlocked ? 'bg-white border-blue-800 shadow-lg' : 'bg-gray-100 border-gray-200 grayscale'}`}
          >
            <div className="flex gap-4">
              <div className="w-20 h-20 rounded-2xl overflow-hidden bg-gray-200 flex-shrink-0">
                <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
                {!item.unlocked && (
                  <div className="absolute inset-0 bg-black/10 flex items-center justify-center">
                    <span className="text-2xl">🔒</span>
                  </div>
                )}
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <h4 className="font-bold text-blue-900">{item.name}</h4>
                  <span className="text-[10px] font-bold uppercase tracking-widest bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">
                    {item.category}
                  </span>
                </div>
                <p className="text-xs text-gray-500 font-bold mb-2">{item.year}</p>
                <p className="text-[10px] leading-tight text-gray-600 line-clamp-2">
                  {item.unlocked ? item.description : 'Juega más para descubrir la historia de esta pieza.'}
                </p>
              </div>
            </div>
            {item.unlocked && (
              <button className="mt-3 w-full flex items-center justify-center gap-1 text-[10px] font-bold text-blue-600 border border-blue-100 py-1 rounded-lg">
                <Info size={12} /> Más detalles
              </button>
            )}
            <div className="absolute top-2 right-2 flex gap-1">
              <div className="text-[8px] font-bold bg-yellow-400 px-1 rounded text-blue-900">DEMO</div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-auto p-4 bg-yellow-100 rounded-2xl border-2 border-yellow-400 text-center">
        <p className="text-xs font-bold text-yellow-900 mb-1">PRO TIP</p>
        <p className="text-[10px] text-yellow-800">¡Completa todos los juegos de memoria para desbloquear piezas raras!</p>
      </div>
    </div>
  );
};

export default VirtualAlbum;
