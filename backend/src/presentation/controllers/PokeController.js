
const GetPokemonsUseCase = require('../../application/usecases/externalGetPokemon/GetPokemonsUseCase');
const SearchPokemonUseCase = require('../../application/usecases/externalGetPokemon/SearchPokemonUseCase');
const GeneratePokemonsPdfUseCase = require('../../application/usecases/externalGetPokemon/GeneratePokemonPdfUseCase'); // Asegúrate de importar el UseCase correcto

class PokeController {
  constructor() {
    this.getPokemonsUseCase = new GetPokemonsUseCase();
    this.searchPokemonUseCase = new SearchPokemonUseCase();
    this.generatePokemonsPdfUseCase = new GeneratePokemonsPdfUseCase();

  }

  async getPokemons(req, res) {
    try {
      const { limit = 20, page = 1, search = '' } = req.query;
      const result = await this.getPokemonsUseCase.execute({ limit, page, search });

      res.status(200).json({
        totalCount: result.totalCount,
        pokemons: result.pokemons,
        limit: result.limit,
        page: result.page,
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async searchPokemon(req, res) {
    try {
      const { name } = req.params;
      const pokemon = await this.searchPokemonUseCase.execute(name);
      res.status(200).json(pokemon);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }

  async generatePokemonPdf(req, res) {
    const { limit = 20, page = 1, search = '' } = req.query;

    try {
      const doc = await this.generatePokemonsPdfUseCase.execute({
        limit: parseInt(limit),
        page: parseInt(page),
        search,
      });

      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', 'attachment; filename=pokemon-list.pdf');
      doc.pipe(res);
    } catch (error) {
      console.error('Error generating PDF:', error.message);
      res.status(500).json({ error: 'Error generating PDF' });
    }
  }

}

module.exports = PokeController;