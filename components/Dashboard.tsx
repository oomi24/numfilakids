
import React from 'react';
import { motion } from 'framer-motion';
// Added History to imports to fix name collision with global DOM History interface
import { Gamepad2, BookOpen, Palette, Trophy, Map, History } from 'lucide-react';
import { UserProfile } from '../types';
import { ACHIEVEMENTS } from '../constants';

interface DashboardProps {
  user: UserProfile;
  setView: (view: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ user, setView }) => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Welcome & Progress */}
      <section className="bg-gradient-to-r from-blue-800 to-blue-600 rounded-3xl p-6 text-white shadow-lg">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-kids font-bold">¡Hola, {user.name}! 👋</h2>
            <p className="opacity-90">¿Qué quieres descubrir hoy?</p>
          </div>
          <div className="bg-white/20 p-2 rounded-xl backdrop-blur-md">
            <p className="text-xs font-bold uppercase tracking-wider">Puntos</p>
            <p className="text-2xl font-bold text-yellow-300">{user.points}</p>
          </div>
        </div>
        
        <div className="mt-6">
          <div className="flex justify-between text-xs mb-1 font-bold">
            <span>Nivel {user.level}</span>
            <span>Próximo: {user.level + 1}</span>
          </div>
          <div className="h-4 bg-white/20 rounded-full overflow-hidden border border-white/30">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: '45%' }}
              className="h-full bg-yellow-400 shadow-[0_0_10px_rgba(255,239,112,0.8)]"
            />
          </div>
        </div>
      </section>

      {/* Main Grid */}
      <section className="grid grid-cols-2 gap-4">
        <MenuCard 
          title="Memoria" 
          icon={<Gamepad2 size={32} />} 
          color="bg-red-500" 
          onClick={() => setView('game-memory')}
        />
        <MenuCard 
          title="Quiz Histórico" 
          icon={<BookOpen size={32} />} 
          color="bg-yellow-500" 
          onClick={() => setView('game-quiz')}
        />
        <MenuCard 
          title="Mi Álbum" 
          icon={<Trophy size={32} />} 
          color="bg-blue-500" 
          onClick={() => setView('collection')}
        />
        <MenuCard 
          title="Diseñar" 
          icon={<Palette size={32} />} 
          color="bg-green-500" 
          onClick={() => setView('design')}
        />
      </section>

      {/* Mini Stats/Achievements */}
      <section>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-kids font-bold text-blue-900">Mis Logros</h3>
          <button className="text-blue-600 text-sm font-bold">Ver todos</button>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-2 no-scrollbar">
          {ACHIEVEMENTS.map(ach => (
            <div 
              key={ach.id}
              className={`flex-shrink-0 w-24 p-3 rounded-2xl border-2 flex flex-col items-center text-center transition-all ${ach.unlocked ? 'bg-white border-yellow-400' : 'bg-gray-100 border-gray-200 grayscale opacity-50'}`}
            >
              <span className="text-3xl mb-1">{ach.icon}</span>
              <span className="text-[10px] font-bold leading-tight">{ach.title}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Educational Banner */}
      <button 
        onClick={() => setView('history')}
        className="w-full bg-yellow-100 border-2 border-yellow-400 rounded-3xl p-6 flex items-center gap-4 text-left group overflow-hidden relative"
      >
        <div className="bg-yellow-400 p-3 rounded-2xl text-yellow-900 z-10">
          <Map size={32} />
        </div>
        <div className="z-10">
          <h4 className="font-kids text-lg font-bold text-yellow-900">Línea de Tiempo</h4>
          <p className="text-yellow-800 text-sm">Viaja por la historia de Venezuela.</p>
        </div>
        <div className="absolute right-[-10px] top-[-10px] text-yellow-200 group-hover:rotate-12 transition-transform">
          {/* History icon from lucide-react */}
          <History size={100} />
        </div>
      </button>
    </div>
  );
};

const MenuCard: React.FC<{ title: string, icon: React.ReactNode, color: string, onClick: () => void }> = ({ title, icon, color, onClick }) => (
  <button 
    onClick={onClick}
    className={`${color} text-white p-6 rounded-3xl shadow-lg flex flex-col items-center justify-center gap-3 transform transition-transform hover:scale-105 active:scale-95`}
  >
    {icon}
    <span className="font-kids font-bold text-lg">{title}</span>
  </button>
);

export default Dashboard;
