
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { UserProfile } from '../types';
import { AVATARS } from '../constants';

interface LoginProps {
  onLogin: (profile: UserProfile) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [name, setName] = useState('');
  const [age, setAge] = useState(8);
  const [selectedAvatar, setSelectedAvatar] = useState(AVATARS[0]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onLogin({
        name,
        age,
        avatar: selectedAvatar,
        points: 100,
        level: 1
      });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-4">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8 border-4 border-blue-800"
      >
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-blue-800 mb-2">¡Bienvenido!</h1>
          <p className="text-gray-600">Explora la historia de nuestra moneda</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2 font-kids">¿Cómo te llamas?</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Tu nombre aquí"
              className="w-full p-4 rounded-2xl border-2 border-gray-200 focus:border-blue-500 outline-none text-lg"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2 font-kids">Tu Avatar</label>
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
            ¡Empezar Aventura!
          </button>
        </form>
      </motion.div>
      <p className="mt-8 text-xs text-gray-400 text-center">
        *Esta es una aplicación demo educativa.<br/>Todos los datos se guardan localmente para el propósito del demo.
      </p>
    </div>
  );
};

export default Login;
