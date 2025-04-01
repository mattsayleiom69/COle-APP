import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';
import useStore from '../store';

interface CategoryManagerProps {
  isOpen: boolean;
  onClose: () => void;
}

const CategoryManager: React.FC<CategoryManagerProps> = ({ isOpen, onClose }) => {
  const { categories, addCategory, setCurrentCategory } = useStore();
  const [newCategoryName, setNewCategoryName] = useState('');

  const handleAddCategory = () => {
    if (!newCategoryName.trim()) return;

    const newCategory = {
      id: crypto.randomUUID(),
      name: newCategoryName.trim(),
      tiles: [],
    };

    addCategory(newCategory);
    setNewCategoryName('');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold dark:text-white">Categories</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="space-y-4">
          <div className="flex gap-2">
            <input
              type="text"
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              className="flex-1 p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
              placeholder="New category name"
            />
            <button
              onClick={handleAddCategory}
              disabled={!newCategoryName.trim()}
              className="p-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => {
                  setCurrentCategory(category.id);
                  onClose();
                }}
                className="w-full p-3 text-left rounded hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                {category.name}
                <span className="text-sm text-gray-500 ml-2">
                  ({category.tiles.length} tiles)
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryManager;