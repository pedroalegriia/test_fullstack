const mongoose = require('mongoose');

const trainerSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    gymBadges: { type: [String], required: true },
  },
  { timestamps: true } 
);

const TrainerModel = mongoose.model('Trainer', trainerSchema);

module.exports = TrainerModel;