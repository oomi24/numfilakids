
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Home, 
  Library, 
  History, 
  Palette
} from 'lucide-react';
import { UserProfile } from './types';
import Dashboard from './components/Dashboard';
import MemoryGame from './components/games/MemoryGame';
import QuizGame from './components/games/QuizGame';
import VirtualAlbum from './components/VirtualAlbum';
import DesignEditor from './components/DesignEditor';
import Timeline from './components/Timeline';
import Login from './components/Login';

const App: React.FC = () => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [activeView, setActiveView] = useState<string>('dashboard');
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem('numisfila_user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        console.error("Error cargando usuario", e);
      }
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem('numisfila_user', JSON.stringify(user));
    }
  }, [user]);

  const handleStart = (name: string, avatar: string) => {
    const newUser: UserProfile = {
      name,
      age: 8,
      avatar,
      points: 100,
      level: 1
    };
    setUser(newUser);
  };

  const handleReset = () => {
    if (confirm('¿Quieres borrar tu progreso y empezar de nuevo?')) {
      localStorage.removeItem('numisfila_user');
      setUser(null);
      setActiveView('dashboard');
    }
  };

  const handleUpdatePoints = (newPoints: number) => {
    if (!user) return;
    const totalPoints = user.points + newPoints;
    const newLevel = Math.floor(totalPoints / 500) + 1;
    setUser({ ...user, points: totalPoints, level: newLevel });
  };

  const renderView = () => {
    if (!user) return <Login onLogin={handleStart} />;

    switch (activeView) {
      case 'dashboard':
        return <Dashboard user={user} setView={setActiveView} handleLogout={handleReset} />;
      case 'game-memory':
        return <MemoryGame onBack={() => setActiveView('dashboard')} onWin={() => handleUpdatePoints(150)} />;
      case 'game-quiz':
        return <QuizGame onBack={() => setActiveView('dashboard')} onScore={(score) => handleUpdatePoints(score * 50)} />;
      case 'collection':
        return <VirtualAlbum onBack={() => setActiveView('dashboard')} />;
      case 'history':
        return <Timeline onBack={() => setActiveView('dashboard')} />;
      case 'design':
        return <DesignEditor onBack={() => setActiveView('dashboard')} userId="local-user" />;
      default:
        return <Dashboard user={user} setView={setActiveView} handleLogout={handleReset} />;
    }
  };

  if (!isLoaded) {
    return (
      <div className="h-screen w-screen flex flex-col items-center justify-center bg-white">
        <div className="w-16 h-16 rounded-full border-4 border-yellow-400 border-t-blue-800 animate-spin" />
        <h2 className="mt-8 text-2xl font-bold text-blue-900 font-kids">Cargando NumisFila...</h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col max-w-4xl mx-auto shadow-2xl bg-white overflow-hidden relative border-x border-gray-100">
      {user && (
        <header className="bg-blue-800 text-white p-4 flex justify-between items-center sticky top-0 z-50 shadow-md">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setActiveView('dashboard')}
              className="font-kids text-xl font-bold flex items-center gap-2"
            >
              <div className="bg-yellow-400 text-blue-900 rounded-full w-8 h-8 flex items-center justify-center text-sm">🇻🇪</div>
              <span className="hidden sm:inline">NumisFila Kids</span>
            </button>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-bold leading-none">{user.name}</p>
              <p className="text-[10px] text-yellow-300 font-bold uppercase tracking-wider">Nivel {user.level} • {user.points} pts</p>
            </div>
            <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center text-2xl border-2 border-white shadow-inner">
              {user.avatar}
            </div>
          </div>
        </header>
      )}

      <main className="flex-1 overflow-y-auto p-4 pb-24 relative bg-[#F5F7FA]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeView + (user?.name || 'none')}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="h-full"
          >
            {renderView()}
          </motion.div>
        </AnimatePresence>
      </main>

      {user && (
        <nav className="bg-white border-t border-gray-200 p-2 fixed bottom-0 left-0 right-0 max-w-4xl mx-auto flex justify-around items-center z-50 shadow-[0_-4px_10px_rgba(0,0,0,0.05)]">
          <NavButton icon={<Home size={22} />} label="Inicio" active={activeView === 'dashboard'} onClick={() => setActiveView('dashboard')} />
          <NavButton icon={<Library size={22} />} label="Álbum" active={activeView === 'collection'} onClick={() => setActiveView('collection')} />
          <NavButton icon={<History size={22} />} label="Historia" active={activeView === 'history'} onClick={() => setActiveView('history')} />
          <NavButton icon={<Palette size={22} />} label="Crear" active={activeView === 'design'} onClick={() => setActiveView('design')} />
        </nav>
      )}

      <div className="bg-white text-[9px] text-center p-1 text-gray-400 border-t border-gray-50 uppercase tracking-widest font-bold">
        BCV Demo Educativo • Sin Fines de Lucro
      </div>
    </div>
  );
};

const NavButton: React.FC<{ icon: React.ReactNode, label: string, active: boolean, onClick: () => void }> = ({ icon, label, active, onClick }) => (
  <button 
    onClick={onClick}
    className={`flex flex-col items-center p-2 rounded-2xl transition-all ${active ? 'text-blue-800 bg-blue-50 scale-105' : 'text-gray-400 hover:text-blue-400'}`}
  >
    {icon}
    <span className="text-[10px] mt-1 font-bold">{label}</span>
  </button>
);

export default App;
