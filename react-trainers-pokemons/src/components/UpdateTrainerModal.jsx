import React, { useState } from "react";

const UpdateTrainerModal = ({ trainer, isOpen, onClose, onSave, onChange }) => {
  const [errors, setErrors] = useState({});
  
  if (!isOpen) return null;

  const validateForm = () => {
    let formErrors = {};
    
    // Validación de campos requeridos
    if (!trainer.firstName) {
      formErrors.firstName = "First name is required";
    }

    if (!trainer.lastName) {
      formErrors.lastName = "Last name is required";
    }

    if (!trainer.phoneNumber) {
      formErrors.phoneNumber = "Phone number is required";
    } else if (!/^\d{10}$/.test(trainer.phoneNumber)) {
      formErrors.phoneNumber = "Phone number must be 10 digits";
    }

    if (!trainer.gymBadges) {
      formErrors.gymBadges = "Gym badges are required";
    } else if (trainer.gymBadges.split(',').some((badge, index, badges) => badges.indexOf(badge) !== index)) {
      // Verifica si hay badges repetidos en el campo gymBadges
      formErrors.gymBadges = "Gym badges cannot be repeated";
    }

    setErrors(formErrors);
    
    return Object.keys(formErrors).length === 0;
  };

  const handleSave = () => {
    
    if (validateForm()) {
        console.log(trainer.id,trainer)
          onSave(trainer.id, trainer);  
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Update Trainer</h2>
        <div className="mb-4">
          <label className="block text-sm font-semibold">First Name</label>
          <input
            type="text"
            name="firstName"
            value={trainer.firstName}
            onChange={onChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
          />
          {errors.firstName && <p className="text-red-500 text-xs">{errors.firstName}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold">Last Name</label>
          <input
            type="text"
            name="lastName"
            value={trainer.lastName}
            onChange={onChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
          />
          {errors.lastName && <p className="text-red-500 text-xs">{errors.lastName}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold">Phone Number</label>
          <input
            type="text"
            name="phoneNumber"
            value={trainer.phoneNumber}
            onChange={onChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
          />
          {errors.phoneNumber && <p className="text-red-500 text-xs">{errors.phoneNumber}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold">Gym Badges</label>
          <input
            type="text"
            name="gymBadges"
            value={trainer.gymBadges}
            onChange={onChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
          />
          {errors.gymBadges && <p className="text-red-500 text-xs">{errors.gymBadges}</p>}
        </div>
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="bg-gray-500 text-white px-4 py-2 rounded mr-2 hover:bg-gray-700"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateTrainerModal;