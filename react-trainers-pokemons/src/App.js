import React, { useState } from "react";
import TrainersPage from "./pages/TrainersPage";  
import PokemonsPage from "./pages/PokemonsPage"; 

function App() {
  const [activeTab, setActiveTab] = useState('pokemons'); 

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="App">
      <div className="flex space-x-4 border-b-2 border-gray-300 mb-4">
        <button
          onClick={() => handleTabChange('pokemons')}
          className={`py-2 px-4 text-sm font-medium focus:outline-none ${
            activeTab === 'pokemons'
              ? 'border-b-2 border-blue-500 text-blue-500'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Pokemons
        </button>
        <button
          onClick={() => handleTabChange('trainers')}
          className={`py-2 px-4 text-sm font-medium focus:outline-none ${
            activeTab === 'trainers'
              ? 'border-b-2 border-blue-500 text-blue-500'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Trainers
        </button>
      </div>
      {activeTab === 'pokemons' && <PokemonsPage />}
      {activeTab === 'trainers' && <TrainersPage />}
    </div>
  );
}

export default App;