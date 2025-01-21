const CreateTrainerUseCase = require('../../application/usecases/CreateTrainerUseCase');
const GetAllTrainersUseCase = require('../../application/usecases/GetAllTrainersUseCase');
const GetTrainerByIdUseCase = require('../../application/usecases/GetTrainerByIdUseCase');
const UpdateTrainerUseCase = require('../../application/usecases/UpdateTrainerUseCase');
const DeleteTrainerUseCase = require('../../application/usecases/DeleteTrainerUseCase');
const TrainerRepository = require('../../infrastructure/repositories/TrainerRepository');
const ExportTrainersToCsvUseCase = require('../../application/usecases/ExportTrainersToCsvUseCase');

class TrainerController {
  constructor() {
    this.createTrainerUseCase = new CreateTrainerUseCase();
    this.getAllTrainersUseCase = new GetAllTrainersUseCase();
    this.getTrainerByIdUseCase = new GetTrainerByIdUseCase(TrainerRepository);
    this.exportTrainersToCsvUseCase = new ExportTrainersToCsvUseCase();
    this.updateTrainerUseCase = new UpdateTrainerUseCase(TrainerRepository);
    this.deleteTrainerUseCase = new DeleteTrainerUseCase(TrainerRepository);

  }

  async createTrainer(req, res) {
    try {
      const { firstName, lastName, phoneNumber, gymBadges } = req.body;

      if (typeof firstName !== 'string') {
        return res.status(400).json({ error: `Expected firstName to be a string, got ${typeof firstName}` });
      }

      const trainer = await this.createTrainerUseCase.execute({
        firstName,
        lastName,
        phoneNumber,
        gymBadges,
      });

      return res.status(201).json(trainer);
    } catch (error) {
      console.error('Error creating trainer:', error.message);
      return res.status(400).json({ error: error.message });
    }
  }

  async getAllTrainers(req, res) {
    try {
      const trainers = await this.getAllTrainersUseCase.execute();
      res.status(200).json(trainers);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async getTrainerById(req, res) {
    try {
      const { id } = req.params;
      const trainer = await this.getTrainerByIdUseCase.execute(id);

      if (!trainer) {
        return res.status(404).json({ error: 'Trainer not found' });
      }

      res.status(200).json(trainer);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async updateTrainer(req, res) {
    try {
      const { id } = req.params; 
      const { firstName, lastName, phoneNumber, gymBadges } = req.body;

      const trainer = await this.updateTrainerUseCase.execute(id, {
        firstName,
        lastName,
        phoneNumber,
        gymBadges
      });

      if (!trainer) {
        return res.status(404).json({ error: 'Trainer not found' });
      }

      res.status(200).json(trainer);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async deleteTrainer(req, res) {
    try {
      const { id } = req.params;

      const deletedTrainer = await this.deleteTrainerUseCase.execute(id);

      if (!deletedTrainer) {
        return res.status(404).json({ error: 'Trainer not found' });
      }

      res.status(200).json({ message: 'Trainer deleted successfully' });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

    async exportTrainersToCsv(req, res) {
    try {
      // Ejecutar el caso de uso para exportar los entrenadores a CSV
      const csvContent = await this.exportTrainersToCsvUseCase.execute();

      // Configurar los encabezados para la descarga del archivo CSV
      res.header('Content-Type', 'text/csv');
      res.header('Content-Disposition', 'attachment; filename=trainers.csv');

      // Enviar el contenido CSV como archivo adjunto
      res.status(200).send(csvContent);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }


}

module.exports = TrainerController;
