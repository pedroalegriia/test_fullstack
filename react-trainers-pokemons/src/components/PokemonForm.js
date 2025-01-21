import React, { useState } from 'react';

const PokemonForm = ({ onSubmit }) => {
  const [pokemonData, setPokemonData] = useState({
    name: '',
    sprite: '',
    base_experience: '',
    types: '',
    abilities: ''
  });

  const handleChange = (e) => {
    setPokemonData({ ...pokemonData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(pokemonData);
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-gray-100 rounded shadow-lg">
      <div className="mb-4">
        <label className="block text-sm font-bold mb-2">Name</label>
        <input 
          type="text" 
          name="name" 
          value={pokemonData.name} 
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-bold mb-2">Sprite</label>
        <input 
          type="text" 
          name="sprite" 
          value={pokemonData.sprite} 
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-bold mb-2">Base Experience</label>
        <input 
          type="number" 
          name="base_experience" 
          value={pokemonData.base_experience} 
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-bold mb-2">Types</label>
        <input 
          type="text" 
          name="types" 
          value={pokemonData.types} 
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-bold mb-2">Abilities</label>
        <input 
          type="text" 
          name="abilities" 
          value={pokemonData.abilities} 
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded"
        />
      </div>
      <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">Submit</button>
    </form>
  );
};

export default PokemonForm;