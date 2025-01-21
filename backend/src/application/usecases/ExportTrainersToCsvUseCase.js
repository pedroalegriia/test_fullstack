const fs = require('fs');
const path = require('path');
const { parse } = require('json2csv');
const TrainerRepository = require('../../infrastructure/repositories/TrainerRepository');

class ExportTrainersToCsvUseCase {
  async execute() {
    try {

        const trainers = await TrainerRepository.getAll();

      if (!trainers || trainers.length === 0) {
        throw new Error('No trainers available to export');
      }

       const filteredTrainers = trainers.map(trainer => ({
        firstName: trainer.firstName,
        lastName: trainer.lastName,
        phoneNumber: trainer.phoneNumber,
        gymBadges: trainer.gymBadges.join(", "),
      }));

      const csv = parse(filteredTrainers);
      return csv;
    } catch (error) {
      throw new Error(`Error exporting trainers to CSV: ${error.message}`);
    }
  }
}

module.exports = ExportTrainersToCsvUseCase;