
import React from 'react';
import { Coins, Mail, Map, Palette, History, Award, BookOpen } from 'lucide-react';
import { CollectibleItem, Achievement } from './types';

export const COLORS = {
  blue: '#00247D',
  red: '#CF142B',
  yellow: '#F9E300',
  lightBlue: '#4D6BC6',
  lightRed: '#FF6B7E',
  lightYellow: '#FFEF70',
  white: '#FFFFFF',
  gray: '#F5F7FA'
};

export const INITIAL_ITEMS: CollectibleItem[] = [
  { id: '1', name: 'Centavo de Cobre', year: '1843', category: 'moneda', description: 'La primera moneda con el nombre de República de Venezuela.', imageUrl: 'https://picsum.photos/seed/coin1/200/200', unlocked: true },
  { id: '2', name: 'Estampa Patriota', year: '1859', category: 'estampa', description: 'Una de las primeras estampillas venezolanas.', imageUrl: 'https://picsum.photos/seed/stamp1/200/200', unlocked: false },
  { id: '3', name: 'El Fuerte de Plata', year: '1879', category: 'moneda', description: 'Moneda clásica conocida por su gran tamaño y brillo.', imageUrl: 'https://picsum.photos/seed/coin2/200/200', unlocked: false },
  { id: '4', name: 'Correo del Orinoco', year: '1861', category: 'estampa', description: 'Conmemora la importancia del río Orinoco.', imageUrl: 'https://picsum.photos/seed/stamp2/200/200', unlocked: true },
];

export const ACHIEVEMENTS: Achievement[] = [
  { id: 'a1', title: 'Pequeño Historiador', description: 'Completa tu primer juego de memoria.', icon: '📜', unlocked: true },
  { id: 'a2', title: 'Coleccionista Junior', description: 'Desbloquea 5 artículos en el álbum.', icon: '📦', unlocked: false },
  { id: 'a3', title: 'Diseñador Maestro', description: 'Crea tu propio diseño de moneda.', icon: '🎨', unlocked: false },
];

export const AVATARS = [
  '🐶', '🐱', '🦁', '🐼', '🐨', '🐸', '🦄', '🤖'
];
