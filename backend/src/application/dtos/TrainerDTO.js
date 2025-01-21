class TrainerDTO {
  constructor({ firstName, lastName, phoneNumber, gymBadges }) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.phoneNumber = phoneNumber;
    this.gymBadges = gymBadges;
  }
}

module.exports = TrainerDTO;