import React from 'react';
import { DndContext, DragEndEvent, closestCenter } from '@dnd-kit/core';
import {
  SortableContext,
  rectSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Tile } from '../types';
import useStore from '../store';

interface TileProps {
  tile: Tile;
  onSelect: (tile: Tile) => void;
}

const SortableTile: React.FC<TileProps> = ({ tile, onSelect }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: tile.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="aspect-square bg-white rounded-lg shadow-md p-2 cursor-pointer hover:shadow-lg transition-shadow"
      onClick={() => onSelect(tile)}
    >
      <div className="h-full w-full flex flex-col items-center justify-center gap-2">
        <img
          src={tile.imageUrl}
          alt={tile.text}
          className="w-full h-3/4 object-contain rounded"
        />
        <span className="text-center font-medium">{tile.text}</span>
      </div>
    </div>
  );
};

const TileGrid: React.FC = () => {
  const { categories, currentCategory, settings } = useStore();
  const currentTiles = categories.find(
    (cat) => cat.id === currentCategory
  )?.tiles || [];

  const speak = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = settings.rate;
    utterance.pitch = settings.pitch;
    utterance.volume = settings.volume;
    if (settings.voice) {
      const voices = window.speechSynthesis.getVoices();
      const voice = voices.find((v) => v.name === settings.voice);
      if (voice) utterance.voice = voice;
    }
    window.speechSynthesis.speak(utterance);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    // Handle drag and drop reordering here
  };

  return (
    <DndContext onDragEnd={handleDragEnd} collisionDetection={closestCenter}>
      <div className="p-4">
        <SortableContext items={currentTiles} strategy={rectSortingStrategy}>
          <div
            className="grid gap-4"
            style={{
              gridTemplateColumns: `repeat(${settings.gridSize}, minmax(0, 1fr))`,
            }}
          >
            {currentTiles.map((tile) => (
              <SortableTile
                key={tile.id}
                tile={tile}
                onSelect={() => speak(tile.text)}
              />
            ))}
          </div>
        </SortableContext>
      </div>
    </DndContext>
  );
};

export default TileGrid;