const TrainerRepository = require('../../infrastructure/repositories/TrainerRepository');

class GetTrainerByIdUseCase {
  constructor(trainerRepository) {
    this.trainerRepository = trainerRepository; 
  }

  async execute(id) {
    const trainer = await this.trainerRepository.getById(id);
    
    if (!trainer) {
      return null; 
    }
    
    return trainer;
  }
}

module.exports = GetTrainerByIdUseCase;