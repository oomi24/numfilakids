
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, Download, Save, Palette, Layers, Star } from 'lucide-react';

interface DesignEditorProps {
  onBack: () => void;
  userId: string;
}

const COLORS = ['#F9E300', '#CF142B', '#00247D', '#4D6BC6', '#FFEF70', '#E5E7EB', '#059669', '#7C3AED'];
const SYMBOLS = ['🦅', '🇻🇪', '🌟', '🏛️', '🌿', '⛰️', '🚢', '🔥'];

const DesignEditor: React.FC<DesignEditorProps> = ({ onBack, userId }) => {
  const [selectedColor, setSelectedColor] = useState(COLORS[0]);
  const [selectedSymbol, setSelectedSymbol] = useState(SYMBOLS[0]);
  const [type, setType] = useState<'moneda' | 'estampa'>('moneda');
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaving(true);
    // Simulate saving delay
    setTimeout(() => {
      setSaving(false);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
      
      // We could store it in local storage here if we wanted to show a gallery later
      const savedDesigns = JSON.parse(localStorage.getItem('numisfila_designs') || '[]');
      savedDesigns.push({
        type,
        color: selectedColor,
        symbol: selectedSymbol,
        date: new Date().toISOString()
      });
      localStorage.setItem('numisfila_designs', JSON.stringify(savedDesigns.slice(-10))); // Keep last 10
    }, 1000);
  };

  return (
    <div className="flex flex-col h-full gap-6 pb-20">
      <div className="flex items-center gap-4">
        <button onClick={onBack} className="p-2 bg-blue-100 text-blue-800 rounded-xl">
          <ChevronLeft size={20} />
        </button>
        <h2 className="text-2xl font-kids font-bold text-blue-900">Taller de Diseño</h2>
      </div>

      {/* Preview Area */}
      <div className="flex-1 flex flex-col items-center justify-center bg-gray-100 rounded-3xl p-8 border-4 border-dashed border-gray-300 relative overflow-hidden">
        <div className="absolute top-4 left-4 flex gap-2">
            <button onClick={() => setType('moneda')} className={`px-4 py-2 rounded-xl font-bold text-xs transition-colors ${type === 'moneda' ? 'bg-blue-800 text-white' : 'bg-white text-gray-500'}`}>Moneda</button>
            <button onClick={() => setType('estampa')} className={`px-4 py-2 rounded-xl font-bold text-xs transition-colors ${type === 'estampa' ? 'bg-blue-800 text-white' : 'bg-white text-gray-500'}`}>Estampilla</button>
        </div>

        <motion.div 
          animate={{ rotate: type === 'moneda' ? 360 : 0 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className={`w-64 h-64 shadow-2xl flex items-center justify-center relative ${type === 'moneda' ? 'rounded-full border-8' : 'rounded-lg border-4 border-dashed'}`}
          style={{ 
            backgroundColor: selectedColor, 
            borderColor: type === 'moneda' ? '#94A3B8' : '#FFFFFF'
          }}
        >
          {type === 'moneda' && (
            <div className="absolute inset-0 rounded-full border-4 border-black/10 m-2" />
          )}
          <span className="text-8xl select-none">{selectedSymbol}</span>
          <div className="absolute bottom-4 font-kids font-bold text-white drop-shadow-lg text-lg uppercase">
            VENEZUELA
          </div>
          <div className="absolute top-10 right-10 opacity-20 rotate-12">
            <Star size={40} />
          </div>
        </motion.div>

        <div className="mt-8 text-xs font-bold text-gray-400 bg-white/50 px-4 py-1 rounded-full uppercase tracking-widest">
            Diseño Demo Educativo
        </div>
      </div>

      {/* Controls */}
      <div className="space-y-4">
        <div>
          <label className="text-sm font-bold text-blue-900 block mb-2 flex items-center gap-2">
            <Palette size={16} /> Color Base
          </label>
          <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
            {COLORS.map(c => (
              <button 
                key={c}
                onClick={() => setSelectedColor(c)}
                className={`w-10 h-10 rounded-full border-4 flex-shrink-0 transition-transform ${selectedColor === c ? 'scale-110 border-blue-900' : 'border-transparent'}`}
                style={{ backgroundColor: c }}
              />
            ))}
          </div>
        </div>

        <div>
          <label className="text-sm font-bold text-blue-900 block mb-2 flex items-center gap-2">
            <Layers size={16} /> Símbolo Central
          </label>
          <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
            {SYMBOLS.map(s => (
              <button 
                key={s}
                onClick={() => setSelectedSymbol(s)}
                className={`text-2xl p-2 bg-white rounded-xl border-2 flex-shrink-0 transition-all ${selectedSymbol === s ? 'border-blue-500 scale-110' : 'border-gray-100'}`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <div className="flex gap-4">
          <button 
            onClick={handleSave}
            disabled={saving}
            className={`flex-1 ${saved ? 'bg-green-500' : 'bg-blue-800'} text-white font-bold py-4 rounded-2xl shadow-lg flex items-center justify-center gap-2 transition-colors disabled:opacity-50`}
          >
            {saving ? 'Guardando...' : saved ? '¡Diseño Guardado!' : <><Save size={20} /> Guardar</>}
          </button>
          <button className="bg-yellow-400 text-yellow-900 p-4 rounded-2xl shadow-lg hover:bg-yellow-300">
            <Download size={24} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default DesignEditor;
