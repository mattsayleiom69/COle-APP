import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Category, Settings, Tile } from '../types';

interface State {
  categories: Category[];
  currentCategory: string;
  settings: Settings;
  addCategory: (category: Category) => void;
  addTile: (categoryId: string, tile: Tile) => void;
  updateTile: (categoryId: string, tile: Tile) => void;
  deleteTile: (categoryId: string, tileId: string) => void;
  setCurrentCategory: (categoryId: string) => void;
  updateSettings: (settings: Partial<Settings>) => void;
}

const useStore = create<State>()(
  persist(
    (set) => ({
      categories: [],
      currentCategory: 'default',
      settings: {
        voice: '',
        rate: 1,
        pitch: 1,
        volume: 1,
        gridSize: 4,
        theme: 'light',
        fontSize: 'medium',
      },
      addCategory: (category) =>
        set((state) => ({
          categories: [...state.categories, category],
        })),
      addTile: (categoryId, tile) =>
        set((state) => ({
          categories: state.categories.map((cat) =>
            cat.id === categoryId
              ? { ...cat, tiles: [...cat.tiles, tile] }
              : cat
          ),
        })),
      updateTile: (categoryId, tile) =>
        set((state) => ({
          categories: state.categories.map((cat) =>
            cat.id === categoryId
              ? {
                  ...cat,
                  tiles: cat.tiles.map((t) =>
                    t.id === tile.id ? tile : t
                  ),
                }
              : cat
          ),
        })),
      deleteTile: (categoryId, tileId) =>
        set((state) => ({
          categories: state.categories.map((cat) =>
            cat.id === categoryId
              ? {
                  ...cat,
                  tiles: cat.tiles.filter((t) => t.id !== tileId),
                }
              : cat
          ),
        })),
      setCurrentCategory: (categoryId) =>
        set({ currentCategory: categoryId }),
      updateSettings: (newSettings) =>
        set((state) => ({
          settings: { ...state.settings, ...newSettings },
        })),
    }),
    {
      name: 'aac-storage',
    }
  )
);

export default useStore;