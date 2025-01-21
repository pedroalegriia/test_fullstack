const Trainer = require('../../domain/models/Trainer');
const TrainerModel = require('../../infrastructure/database/TrainerSchema'); 

class TrainerRepository {
  constructor() {
    this.trainers = [];
  }


  async create(trainerData) {
    const trainer = new Trainer(trainerData.firstName, trainerData.lastName, trainerData.phoneNumber, trainerData.gymBadges);
    return await trainer.save(); 
  }


  async getAll() {
    try {
      return await TrainerModel.find();
    } catch (error) {
      throw new Error(`Error fetching trainers: ${error.message}`);
    }
  }

  async getById(id) {
  try {
    console.log('repo',id)
    const trainer = await TrainerModel.findById(id);

    if (!trainer) {
      throw new Error(`Trainer with id ${id} not found`); 
    }

    return trainer;
  } catch (error) {
    throw new Error(`Error fetching trainer by ID: ${error.message}`);
  }
}

  async update(id, trainerData) {
    try {
      const updateFields = {};

      if (trainerData.firstName) {
        updateFields.firstName = trainerData.firstName;
      }
      if (trainerData.lastName) {
        updateFields.lastName = trainerData.lastName;
      }
      if (trainerData.phoneNumber) {
        updateFields.phoneNumber = trainerData.phoneNumber;
      }
      if (trainerData.gymBadges) {
        updateFields.gymBadges = trainerData.gymBadges;
      }

      const updatedTrainer = await TrainerModel.findByIdAndUpdate(id, updateFields, {
        new: true, 
        runValidators: true, 
      });

      if (!updatedTrainer) {
        throw new Error(`Trainer with id ${id} not found`);
      }

      return updatedTrainer;
    } catch (error) {
      throw new Error(`Error updating trainer: ${error.message}`);
    }
  }


    async delete(id) {
    try {
      const deletedTrainer = await TrainerModel.findByIdAndDelete(id);
      if (!deletedTrainer) {
        throw new Error(`Trainer with id ${id} not found`);
      }
      return deletedTrainer;
    } catch (error) {
      throw new Error(`Error deleting trainer: ${error.message}`);
    }
  }

}

module.exports = new TrainerRepository();
