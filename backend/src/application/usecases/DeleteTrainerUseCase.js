const TrainerRepository = require('../../infrastructure/repositories/TrainerRepository');

class DeleteTrainerUseCase {
  execute(id) {
    return TrainerRepository.delete(id);
  }
}

module.exports = DeleteTrainerUseCase;