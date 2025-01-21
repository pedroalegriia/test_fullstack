const PDFDocument = require('pdfkit');
const axios = require('axios');
require('dotenv').config();

class PokeApiService {
  constructor() {
    if (!process.env.EXTERNAL_API_URL_POKEMON) {
      throw new Error('EXTERNAL_API_URL_POKEMON is missing in the environment variables.');
    }
    this.apiUrl = process.env.EXTERNAL_API_URL_POKEMON + '/pokemon';
  }

  async getPokemons({ limit = 20, page = 1, search = '' }) {
    try {
      const offset = (page - 1) * limit;
      const url = `${this.apiUrl}?limit=${limit}&offset=${offset}`;

      const response = await axios.get(url);
      let pokemons = response.data.results;
      
      if (search) {
        pokemons = pokemons.filter(pokemon =>
          pokemon.name.toLowerCase().includes(search.toLowerCase())
        );
      }
      pokemons.sort((a, b) => a.name.localeCompare(b.name));

      return {
        totalCount: response.data.count,
        pokemons: pokemons.slice(0, limit),
        limit,
        page,
      };
    } catch (error) {
      throw new Error('Error fetching data from PokeAPI');
    }
  }

  async getPokemonDetails(url) {
    const response = await axios.get(url);
    const data = response.data;

    return {
      id: data.id,
      base_experience: data.base_experience,
      types: data.types.map((t) => t.type.name),
      abilities: data.abilities.map((a) => a.ability.name),
      sprite: data.sprites.front_default,
    };
  }

    async getPokemonsWithDetails({ limit, page, search }) {
    const { pokemons } = await this.getPokemons({ limit, page, search });

    // Obtener detalles adicionales para cada Pokémon
    const detailedPokemons = await Promise.all(
      pokemons.map(async (pokemon) => {
        try {
          const details = await this.getPokemonDetails(pokemon.url);
          return { ...pokemon, ...details }; // Combinar datos básicos con detalles
        } catch (error) {
          return { ...pokemon, error: error.message }; // Manejar errores
        }
      })
    );

    return detailedPokemons;
  }



}

module.exports = PokeApiService;