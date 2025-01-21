const express = require('express');
const TrainerController = require('../../presentation/controllers/TrainerController');

const router = express.Router();
const trainerController = new TrainerController();

router.post('/', (req, res) => trainerController.createTrainer(req, res));

router.get('/', (req, res) => trainerController.getAllTrainers(req, res));

router.get('/:id', (req, res) => trainerController.getTrainerById(req, res));

router.put('/:id', (req, res) => trainerController.updateTrainer(req, res));

router.delete('/:id', (req, res) => trainerController.deleteTrainer(req, res));

router.get('/export/csv', (req, res) => trainerController.exportTrainersToCsv(req, res));

module.exports = router;