import axios from 'axios';

class PokeApiService {
  constructor() {
    this.apiUrl = process.env.REACT_APP_API_URL;

    if (!this.apiUrl) {
      console.warn('REACT_APP_API_URL is not defined. Using default API URL.');
    }
  }


  getTrainers() {
    return axios.get(`${this.apiUrl}/trainers`);
  }

 getPokemons(limit, page, search) {
  return axios.get(`${this.apiUrl}/pokemons`, {
    params: { 
      limit: limit, 
      page: page, 
      search: search 
    }
  });
}

  createTrainer(pokemonData) {
    return axios.post(`${this.apiUrl}/trainers`, pokemonData);
  }

  updateTrainers(id, pokemonData) {
    return axios.put(`${this.apiUrl}/trainers/${id}`, pokemonData);
  }

  deleteTrainers(id) {
    return axios.delete(`${this.apiUrl}/trainers/${id}`);
  }

  getPokemonDetails(id) {
    return axios.get(`${this.apiUrl}/pokemons/${id}`);
  }

   generatePDF(limit = 20, page = 1, search = '') {
    return axios.get(
      `${this.apiUrl}/pokemons/generate/pdf`,
      {
        params: { limit, page, search },
        responseType: 'blob',
      }
    );
  }

}

export default new PokeApiService();