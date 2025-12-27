
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
  { id: '1', name: 'Centavo de Cobre', year: '1843', category: 'moneda', description: 'La primera moneda con el nombre de República de Venezuela.', imageUrl: 'https://images.unsplash.com/photo-1610375461246-83df859d849d?auto=format&fit=crop&w=200&h=200&q=80', unlocked: true },
  { id: '2', name: 'Estampa Patriota', year: '1859', category: 'estampa', description: 'Una de las primeras estampillas venezolanas.', imageUrl: 'https://images.unsplash.com/photo-1579546673283-93ad2917ec55?auto=format&fit=crop&w=200&h=200&q=80', unlocked: false },
  { id: '3', name: 'El Fuerte de Plata', year: '1879', category: 'moneda', description: 'Moneda clásica conocida por su gran tamaño y brillo.', imageUrl: 'https://images.unsplash.com/photo-1582139329536-e7284fece509?auto=format&fit=crop&w=200&h=200&q=80', unlocked: false },
  { id: '4', name: 'Correo del Orinoco', year: '1861', category: 'estampa', description: 'Conmemora la importancia del río Orinoco.', imageUrl: 'https://images.unsplash.com/photo-1517030330234-94c4fa948ebc?auto=format&fit=crop&w=200&h=200&q=80', unlocked: true },
];

export const ACHIEVEMENTS: Achievement[] = [
  { id: 'a1', title: 'Pequeño Historiador', description: 'Completa tu primer juego de memoria.', icon: '📜', unlocked: true },
  { id: 'a2', title: 'Coleccionista Junior', description: 'Desbloquea 5 artículos en el álbum.', icon: '📦', unlocked: false },
  { id: 'a3', title: 'Diseñador Maestro', description: 'Crea tu propio diseño de moneda.', icon: '🎨', unlocked: false },
];

export const AVATARS = [
  '🐶', '🐱', '🦁', '🐼', '🐨', '🐸', '🦄', '🤖'
];
