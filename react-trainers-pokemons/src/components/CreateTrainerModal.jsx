import React, { useState } from "react";

const CreateTrainerModal = ({ isOpen, onClose, onSave }) => {
  const [newTrainer, setNewTrainer] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    gymBadges: "",
  });

  const [errors, setErrors] = useState({});
  const [saveError, setSaveError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTrainer((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateInputs = () => {
    const newErrors = {};

    if (!newTrainer.firstName.trim()) {
      newErrors.firstName = "First name is required.";
    }
    if (!newTrainer.lastName.trim()) {
      newErrors.lastName = "Last name is required.";
    }
    if (!newTrainer.phoneNumber.trim()) {
      newErrors.phoneNumber = "Phone number is required.";
    } else if (!/^\d{10,}$/.test(newTrainer.phoneNumber)) {
      newErrors.phoneNumber = "Phone number must contain at least 10 digits.";
    }
    if (!newTrainer.gymBadges.trim()) {
      newErrors.gymBadges = "Gym badges are required.";
    } else {
      const badges = newTrainer.gymBadges
        .split(",")
        .map((badge) => badge.trim());
      const uniqueBadges = new Set(badges);

      if (uniqueBadges.size !== badges.length) {
        newErrors.gymBadges = "Gym badges should not contain duplicates.";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  const handleSubmit = () => {
    setSaveError(""); // Reset any previous save errors

    if (!validateInputs()) return;

    const trainerWithBadgesArray = {
      ...newTrainer,
      gymBadges: newTrainer.gymBadges.split(",").map((badge) => badge.trim()),
    };

    try {
      onSave(trainerWithBadgesArray);
      onClose();
    } catch (error) {
      setSaveError("Error saving trainer: " + error.message);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Create New Trainer</h2>
        {saveError && <p className="text-red-500 mb-4">{saveError}</p>}

        <div className="mb-4">
          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            placeholder="First Name"
            value={newTrainer.firstName}
            onChange={handleInputChange}
            className={`w-full p-2 border rounded ${
              errors.firstName ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.firstName && (
            <p className="text-red-500 text-sm">{errors.firstName}</p>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            placeholder="Last Name"
            value={newTrainer.lastName}
            onChange={handleInputChange}
            className={`w-full p-2 border rounded ${
              errors.lastName ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.lastName && (
            <p className="text-red-500 text-sm">{errors.lastName}</p>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
            Phone Number
          </label>
          <input
            type="text"
            id="phoneNumber"
            name="phoneNumber"
            placeholder="Phone Number"
            value={newTrainer.phoneNumber}
            onChange={handleInputChange}
            className={`w-full p-2 border rounded ${
              errors.phoneNumber ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.phoneNumber && (
            <p className="text-red-500 text-sm">{errors.phoneNumber}</p>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="gymBadges" className="block text-sm font-medium text-gray-700">
            Gym Badges (comma-separated)
          </label>
          <input
            type="text"
            id="gymBadges"
            name="gymBadges"
            placeholder="Gym Badges (comma-separated)"
            value={newTrainer.gymBadges}
            onChange={handleInputChange}
            className={`w-full p-2 border rounded ${
              errors.gymBadges ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.gymBadges && (
            <p className="text-red-500 text-sm">{errors.gymBadges}</p>
          )}
        </div>

        <div className="flex justify-end mt-4">
          <button
            onClick={onClose}
            className="bg-gray-300 text-gray-800 px-4 py-2 rounded mr-2"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateTrainerModal;