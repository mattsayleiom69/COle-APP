import React, { useState } from 'react';
import { Settings, Grid, ImagePlus, Menu } from 'lucide-react';
import TileGrid from './components/TileGrid';
import useStore from './store';

function App() {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const { settings, updateSettings } = useStore();

  return (
    <div className={`min-h-screen ${settings.theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
      <header className="bg-indigo-500 text-white p-4 shadow-lg">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Cole AAC</h1>
          <div className="flex gap-4">
            <button
              className="p-2 hover:bg-indigo-600 rounded-full transition-colors"
              onClick={() => setSettingsOpen(true)}
            >
              <Settings className="w-6 h-6" />
            </button>
            <button className="p-2 hover:bg-indigo-600 rounded-full transition-colors">
              <ImagePlus className="w-6 h-6" />
            </button>
            <button className="p-2 hover:bg-indigo-600 rounded-full transition-colors">
              <Grid className="w-6 h-6" />
            </button>
            <button className="p-2 hover:bg-indigo-600 rounded-full transition-colors">
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto py-8">
        <TileGrid />
      </main>

      {/* Settings Modal would go here */}
    </div>
  );
}

export default App;