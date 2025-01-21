const PokeApiService = require('../../../infrastructure/externalServices/PokeApiService');

class GetPokemonsUseCase {
  constructor() {
    this.pokeApiService = new PokeApiService();
  }

  async execute({ limit, page, search }) {
    if (limit <= 0 || page <= 0) {
      throw new Error('Limit and page must be positive integers');
    }
    const result = await this.pokeApiService.getPokemons({ limit, page, search });
    return result;
  }
}

module.exports = GetPokemonsUseCase;