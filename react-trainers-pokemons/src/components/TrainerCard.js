import React from 'react';
import TrainersPage from './pages/TrainersPage';

const TrainerCard = ({ trainer }) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white p-4 m-2">
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{trainer.name}</div>
        <p className="text-gray-700 text-base">ID: {trainer.id}</p>
        <p className="text-gray-700 text-base">Pokemons: {trainer.pokemonCount}</p>
      </div>
    </div>
  );
};

export default TrainerCard;