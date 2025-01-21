import React, { useState, useEffect } from "react";
import PokeApiService from "../api/PokeApiService";

const PokemonsPage = () => {
  const [pokemons, setPokemons] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [totalCount, setTotalCount] = useState(0); 
  const [totalPages, setTotalPages] = useState(0); 

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const response = await PokeApiService.getPokemons(limit, page, search);
        setPokemons(response.data.pokemons);
        setTotalCount(response.data.totalCount);
        setTotalPages(Math.ceil(response.data.totalCount / limit));
      } catch (error) {
        console.error("Error fetching pokemons:", error);
      }
    };

    fetchPokemons();
  }, [limit, page, search]);

  const generatePDF = async () => {
    try {
      const response = await PokeApiService.generatePDF(limit, page, search);
      const blob = new Blob([response.data], { type: "application/pdf" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "pokemons_list.pdf";
      link.click();
    } catch (error) {
      console.error("Error generating PDF", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Pokemons List</h1>

      {/* Entrada de búsqueda */}
      <div className="mb-4">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search Pokemons"
          className="border p-2 rounded"
        />
      </div>

      <button
        onClick={generatePDF}
        className="bg-blue-500 text-white py-2 px-4 rounded mb-4"
      >
        Generate PDF
      </button>

      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Name</th>
            <th className="py-2 px-4 border-b">URL</th>
          </tr>
        </thead>
        <tbody>
          {pokemons.map((pokemon, index) => (
            <tr key={index}>
              <td className="py-2 px-4 border-b">{pokemon.name}</td>
              <td className="py-2 px-4 border-b">{pokemon.url}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-4 flex items-center justify-between">
        <button
          onClick={() => setPage((prevPage) => Math.max(prevPage - 1, 1))}
          disabled={page === 1}
          className="bg-gray-500 text-white py-1 px-4 rounded"
        >
          Previous
        </button>
        
        <span className="mx-2">
          Page {page} of {totalPages}
        </span>

        <button
          onClick={() => setPage((prevPage) => Math.min(prevPage + 1, totalPages))}
          disabled={page === totalPages}
          className="bg-gray-500 text-white py-1 px-4 rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PokemonsPage;