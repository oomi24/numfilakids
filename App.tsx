
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Home, 
  Gamepad2, 
  Library, 
  History, 
  Palette, 
  Trophy, 
  User as UserIcon,
  LogOut,
  ChevronLeft
} from 'lucide-react';
import { UserProfile, GameType } from './types';
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
    // Simulate loading
    setTimeout(() => setIsLoaded(true), 1000);
  }, []);

  const handleLogin = (profile: UserProfile) => {
    setUser(profile);
    setActiveView('dashboard');
  };

  const renderView = () => {
    if (!user) return <Login onLogin={handleLogin} />;

    switch (activeView) {
      case 'dashboard':
        return <Dashboard user={user} setView={setActiveView} />;
      case 'game-memory':
        return <MemoryGame onBack={() => setActiveView('dashboard')} />;
      case 'game-quiz':
        return <QuizGame onBack={() => setActiveView('dashboard')} />;
      case 'collection':
        return <VirtualAlbum onBack={() => setActiveView('dashboard')} />;
      case 'history':
        return <Timeline onBack={() => setActiveView('dashboard')} />;
      case 'design':
        return <DesignEditor onBack={() => setActiveView('dashboard')} />;
      default:
        return <Dashboard user={user} setView={setActiveView} />;
    }
  };

  if (!isLoaded) {
    return (
      <div className="h-screen w-screen flex flex-col items-center justify-center bg-white">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
          className="w-20 h-20 rounded-full border-8 border-yellow-400 border-t-blue-800"
        />
        <h2 className="mt-8 text-2xl font-bold text-blue-900 font-kids">Cargando NumisFila Kids...</h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col max-w-4xl mx-auto shadow-2xl bg-white overflow-hidden">
      {/* Header */}
      {user && (
        <header className="bg-blue-800 text-white p-4 flex justify-between items-center sticky top-0 z-50">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setActiveView('dashboard')}
              className="font-kids text-xl font-bold flex items-center gap-2"
            >
              <div className="bg-yellow-400 text-blue-900 rounded-full w-8 h-8 flex items-center justify-center">🇻🇪</div>
              NumisFila Kids
            </button>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-bold">{user.name}</p>
              <p className="text-xs text-yellow-300">Nivel {user.level} • {user.points} pts</p>
            </div>
            <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center text-2xl border-2 border-white">
              {user.avatar}
            </div>
          </div>
        </header>
      )}

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-4 pb-24 relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeView}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="h-full"
          >
            {renderView()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer Navigation (Mobile Sticky) */}
      {user && (
        <nav className="bg-white border-t border-gray-200 p-2 fixed bottom-0 left-0 right-0 max-w-4xl mx-auto flex justify-around items-center z-50">
          <NavButton icon={<Home size={24} />} label="Inicio" active={activeView === 'dashboard'} onClick={() => setActiveView('dashboard')} />
          <NavButton icon={<Library size={24} />} label="Álbum" active={activeView === 'collection'} onClick={() => setActiveView('collection')} />
          <NavButton icon={<History size={24} />} label="Historia" active={activeView === 'history'} onClick={() => setActiveView('history')} />
          <NavButton icon={<Palette size={24} />} label="Crear" active={activeView === 'design'} onClick={() => setActiveView('design')} />
        </nav>
      )}

      {/* Disclaimer Modal Overlay Logic could go here */}
      <div className="bg-gray-100 text-[10px] text-center p-1 text-gray-500">
        Demo Educativo • No contiene billetes reales • BCV Inspirado
      </div>
    </div>
  );
};

const NavButton: React.FC<{ icon: React.ReactNode, label: string, active: boolean, onClick: () => void }> = ({ icon, label, active, onClick }) => (
  <button 
    onClick={onClick}
    className={`flex flex-col items-center p-2 rounded-xl transition-colors ${active ? 'text-blue-800 bg-blue-50' : 'text-gray-400'}`}
  >
    {icon}
    <span className="text-[10px] mt-1 font-bold">{label}</span>
  </button>
);

export default App;
