const express = require('express');
const PokeController = require('../../presentation/controllers/PokeController');

const router = express.Router();
const pokeController = new PokeController();

router.get('/', (req, res) => pokeController.getPokemons(req, res));
router.get('/:name', (req, res) => pokeController.searchPokemon(req, res));
router.get('/generate/pdf', (req, res) => pokeController.generatePokemonPdf(req, res));


module.exports = router;