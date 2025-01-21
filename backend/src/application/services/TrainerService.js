class TrainerService {
  constructor(trainerRepository) {
    this.trainerRepository = trainerRepository;
  }

  async createTrainer(data) {
    return await this.trainerRepository.create(data);
  }

  async getAllTrainers() {
    return await this.trainerRepository.findAll();
  }

  async updateTrainer(id, data) {
    return await this.trainerRepository.update(id, data);
  }

  async deleteTrainer(id) {
    return await this.trainerRepository.delete(id);
  }
}

module.exports = TrainerService;