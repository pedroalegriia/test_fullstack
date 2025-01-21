const PokeApiService = require('../../../infrastructure/externalServices/PokeApiService');

class SearchPokemonUseCase {
  constructor() {
    this.pokeApiService = new PokeApiService();
  }

  async execute(name) {
    return await this.pokeApiService.searchPokemon(name);
  }
}

module.exports = SearchPokemonUseCase;