const TrainerRepository = require('../../infrastructure/repositories/TrainerRepository');

class GetAllTrainersUseCase {
  execute() {
    return TrainerRepository.getAll();
  }
}

module.exports = GetAllTrainersUseCase;
