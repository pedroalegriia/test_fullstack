const FirstName = require('../valueObjects/FirstName');
const LastName = require('../valueObjects/LastName');
const PhoneNumber = require('../valueObjects/PhoneNumber');
const GymBadges = require('../valueObjects/GymBadges');
const TrainerModel = require('../../infrastructure/database/TrainerSchema');

class Trainer {
  constructor(firstName, lastName, phoneNumber, gymBadges) {

    this.firstName = new FirstName(firstName).getValue();
    this.lastName = new LastName(lastName).getValue();
    this.phoneNumber = new PhoneNumber(phoneNumber).getValue();
    this.gymBadges = new GymBadges(gymBadges).getBadges();
  }

  async save() {
    const trainerDoc = new TrainerModel({
      firstName: this.firstName,
      lastName: this.lastName,
      phoneNumber: this.phoneNumber,
      gymBadges: this.gymBadges,
    });

    try {
      return await trainerDoc.save();
    } catch (error) {
      throw new Error(`Error saving trainer: ${error.message}`);
    }
  }

   static async update(id, updatedData) {
    const updateFields = {};

    if (updatedData.firstName) {
      updateFields.firstName = new FirstName(updatedData.firstName).getValue();
    }
    if (updatedData.lastName) {
      updateFields.lastName = new LastName(updatedData.lastName).getValue();
    }
    if (updatedData.phoneNumber) {
      updateFields.phoneNumber = new PhoneNumber(updatedData.phoneNumber).getValue();
    }
    if (updatedData.gymBadges) {
      updateFields.gymBadges = new GymBadges(updatedData.gymBadges).getBadges();
    }

    try {
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

    static async delete(id) {
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

module.exports = Trainer;