export interface Tile {
  id: string;
  imageUrl: string;
  text: string;
  category: string;
}

export interface Category {
  id: string;
  name: string;
  tiles: Tile[];
}

export interface Settings {
  voice: string;
  rate: number;
  pitch: number;
  volume: number;
  gridSize: number;
  theme: 'light' | 'dark';
  fontSize: 'small' | 'medium' | 'large';
}