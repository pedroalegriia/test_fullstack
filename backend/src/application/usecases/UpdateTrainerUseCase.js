class UpdateTrainerUseCase {
  constructor(trainerRepository) {
    this.trainerRepository = trainerRepository;
  }

  async execute(id, trainerData) {
    try {
      const updatedTrainer = await this.trainerRepository.update(id, trainerData);

      if (!updatedTrainer) {
        return null;
      }

      return updatedTrainer;
    } catch (error) {
      throw new Error(`Error in UpdateTrainerUseCase: ${error.message}`);
    }
  }
}

module.exports = UpdateTrainerUseCase;