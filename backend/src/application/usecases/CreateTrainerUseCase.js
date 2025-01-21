const TrainerRepository = require('../../infrastructure/repositories/TrainerRepository');
const FirstName = require('../../domain/valueObjects/FirstName');
const LastName = require('../../domain/valueObjects/LastName');
const PhoneNumber = require('../../domain/valueObjects/PhoneNumber');
const GymBadges = require('../../domain/valueObjects/GymBadges');

class CreateTrainerUseCase {
  async execute({ firstName, lastName, phoneNumber, gymBadges }) {
    if (!firstName || !lastName || !phoneNumber || !gymBadges) {
      throw new Error('Missing required fields');
    }

    const firstNameVO = new FirstName(firstName); 
    const lastNameVO = new LastName(lastName);
    const phoneNumberVO = new PhoneNumber(phoneNumber);
    const gymBadgesVO = new GymBadges(gymBadges);

    const trainer = {
      firstName: firstNameVO.getValue(),
      lastName: lastNameVO.getValue(),
      phoneNumber: phoneNumberVO.getValue(),
      gymBadges: gymBadgesVO.getBadges(),
    };

    return TrainerRepository.create(trainer);
  }
}

module.exports = CreateTrainerUseCase;