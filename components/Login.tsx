
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { AVATARS } from '../constants';

interface LoginProps {
  onLogin: (name: string, avatar: string) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [name, setName] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState(AVATARS[0]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    onLogin(name.trim(), selectedAvatar);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-4">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8 border-4 border-blue-800"
      >
        <div className="text-center mb-8">
          <div className="inline-block bg-yellow-400 p-4 rounded-full mb-4 text-4xl shadow-md">
            🪙
          </div>
          <h1 className="text-4xl font-bold text-blue-800 mb-2">¡Hola Amiguito!</h1>
          <p className="text-gray-600 font-bold">¡Vamos a explorar la historia de Venezuela!</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2 font-kids">¿Cuál es tu nombre?</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Tu nombre aquí"
              className="w-full p-4 rounded-2xl border-2 border-gray-200 focus:border-blue-500 outline-none text-lg font-bold"
              required
              autoComplete="off"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2 font-kids">Elige tu Avatar</label>
            <div className="grid grid-cols-4 gap-2">
              {AVATARS.map(a => (
                <button
                  key={a}
                  type="button"
                  onClick={() => setSelectedAvatar(a)}
                  className={`text-3xl p-2 rounded-xl border-2 transition-all ${selectedAvatar === a ? 'border-blue-500 bg-blue-50 scale-110' : 'border-gray-100 hover:border-gray-300'}`}
                >
                  {a}
                </button>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-800 text-white font-bold py-4 rounded-2xl text-xl shadow-lg hover:bg-blue-700 transition-colors transform active:scale-95"
          >
            ¡Empezar Aventura! 🚀
          </button>
        </form>
      </motion.div>
      <p className="mt-8 text-xs text-gray-400 text-center max-w-xs mx-auto">
        *Esta es una versión demo interactiva. Tu progreso se guarda solo en este navegador.
      </p>
    </div>
  );
};

export default Login;
