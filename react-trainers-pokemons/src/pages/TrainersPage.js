import React, { useState, useEffect } from "react";
import PokeApiService from "../api/PokeApiService";
import UpdateTrainerModal from "../components/UpdateTrainerModal";
import CreateTrainerModal from "../components/CreateTrainerModal";
import ConfirmDeleteModal from "../components/ConfirmDeleteModal";

const TrainersPage = () => {
  const [trainers, setTrainers] = useState([]);
  const [isUpdating, setIsUpdating] = useState(false);
  const [trainerToUpdate, setTrainerToUpdate] = useState(null);
  const [isCreating, setIsCreating] = useState(false);
  const [updatedTrainer, setUpdatedTrainer] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    gymBadges: [],
  });
  const [successMessage, setSuccessMessage] = useState("");
  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);  
  const [trainerToDelete, setTrainerToDelete] = useState(null);

  useEffect(() => {
    const fetchTrainers = async () => {
      const response = await PokeApiService.getTrainers();
      setTrainers(response.data);
    };

    fetchTrainers();
  }, []);

  const handleDeleteClick = (trainer) => {
    setTrainerToDelete(trainer);  
    setIsConfirmingDelete(true);
  };

  const handleDelete = async () => {
  if (trainerToDelete) {
    try {
      await PokeApiService.deleteTrainers(trainerToDelete._id);
      const response = await PokeApiService.getTrainers();
      setTrainers(response.data);  
      setIsConfirmingDelete(false);
      setTrainerToDelete(null);
    } catch (error) {
      console.error("Error deleting trainer:", error);
    }
  }
};

  const handleUpdateClick = (trainer) => {
    setTrainerToUpdate(trainer);
    setUpdatedTrainer({
      id: trainer._id,
      firstName: trainer.firstName,
      lastName: trainer.lastName,
      phoneNumber: trainer.phoneNumber,
      gymBadges: trainer.gymBadges.join(", "),
    });
    setIsUpdating(true);
  };

  const handleUpdate = async (id, updatedTrainer) => {
  try {
    await PokeApiService.updateTrainers(id, updatedTrainer);
     const response = await PokeApiService.getTrainers();
      setTrainers(response.data);  
    setIsUpdating(false);
    setTrainerToUpdate(null);
  } catch (error) {
    console.error("Error updating trainer:", error);
  }
};


  const handleCreate = async (newTrainer) => {
    try {
      const response = await PokeApiService.createTrainer(newTrainer);
      setTrainers([...trainers, response.data]);
      setIsCreating(false);
      setSuccessMessage("Trainer created successfully!");
      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
    } catch (error) {
      console.error("Error creating trainer:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedTrainer((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleGenerateCSV = async () => {
    try {
      const response = await PokeApiService.exportTrainersCSV();
      const blob = new Blob([response.data], { type: "text/csv" });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "trainers.csv");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error generating CSV:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">Trainers List</h1>
      {successMessage && (
        <div className="bg-green-500 text-white p-2 mb-4 rounded">
          {successMessage}
        </div>
      )}
      <div className="flex space-x-4 mb-4">
        <button
          onClick={handleGenerateCSV}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Generate CSV
        </button>
        <button
          onClick={() => setIsCreating(true)}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Create New Trainer
        </button>
      </div>
      <table className="min-w-full table-auto bg-white shadow-md rounded-lg">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
              First Name
            </th>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
              Last Name
            </th>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
              Phone Number
            </th>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
              Gym Badges
            </th>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {trainers.map((trainer) => (
            <tr key={trainer.id} className="hover:bg-gray-50">
              <td className="px-4 py-2 text-sm text-gray-700">
                {trainer.firstName}
              </td>
              <td className="px-4 py-2 text-sm text-gray-700">
                {trainer.lastName}
              </td>
              <td className="px-4 py-2 text-sm text-gray-700">
                {trainer.phoneNumber}
              </td>
              <td className="px-4 py-2 text-sm text-gray-700">
                {trainer.gymBadges.join(", ")}
              </td>
              <td className="px-4 py-2 text-sm text-gray-700">
                <button
                  onClick={() => handleUpdateClick(trainer)}
                  className="bg-yellow-500 text-white px-4 py-2 rounded mr-2 hover:bg-yellow-700"
                >
                  Update
                </button>
                <button
                  onClick={() => handleDeleteClick(trainer)}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <UpdateTrainerModal
        trainer={updatedTrainer}
        isOpen={isUpdating}
        onClose={() => setIsUpdating(false)}
        onSave={handleUpdate}
        onChange={handleInputChange}
      />

      <CreateTrainerModal
        isOpen={isCreating}
        onClose={() => setIsCreating(false)}
        onSave={handleCreate}
      />

      <ConfirmDeleteModal
        isOpen={isConfirmingDelete}
        onCancel={() => setIsConfirmingDelete(false)} 
        onConfirm={handleDelete}
        trainerName={trainerToDelete ? trainerToDelete.firstName : ""}
      />
    </div>
  );
};

export default TrainersPage;
