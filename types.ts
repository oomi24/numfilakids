
export interface UserProfile {
  name: string;
  age: number;
  avatar: string;
  points: number;
  level: number;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
}

export interface CollectibleItem {
  id: string;
  name: string;
  year: string;
  category: 'moneda' | 'estampa';
  description: string;
  imageUrl: string;
  unlocked: boolean;
}

export enum GameType {
  MEMORY = 'MEMORY',
  QUIZ = 'QUIZ',
  ALBUM = 'ALBUM',
  DESIGNER = 'DESIGNER',
  TIMELINE = 'TIMELINE'
}
