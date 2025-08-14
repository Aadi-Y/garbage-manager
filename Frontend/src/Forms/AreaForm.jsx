import React, { useEffect, useState } from "react";
import { axiosInstance } from "../Utility/axiosInstance";
import { apiPath } from "../Utility/apiPath";
import toast from "react-hot-toast";

const AreaForm = ({ type, handleCloseModal, area, handleGetAreaForAdmin }) => {
  const [formData, setFormData] = useState({
    areaName: area?.areaName || "",
    areaLocation: area?.areaLocation || "",
    areaPincode: area?.areaPincode || "",
    assignedDrivers: [],
  });

  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [driverId, setDriverIds] = useState([]);
  const [selectedDriver, setSelectedDriver] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (e) => {
    setSelectedDriver(e.target.value);
  };

  async function handleAssignDriver(id) {
    try {
      const response = await axiosInstance.put(apiPath.AREA.ASSIGN_DRIVER(id), {
        driverId: selectedDriver,
      });

      console.log(response);
    } catch (error) {
      console.log(error);
      if (error && error.response) {
        setError(error.response.data.message);
      }
    }
  }

  const handleAreaCreation = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const areaData = {
        ...formData,
        areaPincode: Number(formData.areaPincode),
      };
      console.log("Submitting Area:", areaData);
      const response = await axiosInstance.post(apiPath.AREA.CREATE, formData);
      console.log(response);
      if (response && response.data) {
        await handleAssignDriver(response.data.area._id);
        setIsLoading(false);
        handleCloseModal();
        toast.success(response.data.message);
        await handleGetAreaForAdmin();
        setSelectedDriver(null);
      }
    } catch (err) {
      console.log(err);
      if(err?.response){
        toast.error(err?.response.data.message);
      }
      setError("Failed to create area. Try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAreaUpdation = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    const areaData = {
      ...formData,
      areaPincode: Number(formData.areaPincode),
    };

    try {
      const response = await axiosInstance.put(
        apiPath.AREA.UPDATE(area._id),
        areaData
      );
      console.log(response);
      if (response && response.data) {
        await handleAssignDriver(response.data.area._id);
        await handleGetAreaForAdmin();
        handleCloseModal();
        toast.success(response.data.message);
      }
    } catch (error) {
      setError("Failed to update area. Try again.");
    } finally {
      setIsLoading(false);
    }
  };

  async function handleGetAllDriverIds() {
    try {
      const response = await axiosInstance.get(apiPath.AREA.GET_ALL_DRIVER_ID);
      console.log(response);

      if (response && response.data) {
        setDriverIds(response.data.driverId);
      }
    } catch (error) {
      console.log(error);
      if (error && error.response) {
        setError(error.response.data.message);
      }
    }
  }

  useEffect(() => {
    handleGetAllDriverIds();
  }, []);

  console.log(driverId);

  return (
    <div>
      <h2 className="text-xl font-semibold text-center text-green-600 mb-4">
        Create New Area
      </h2>

      <form
        onSubmit={type === "edit" ? handleAreaUpdation : handleAreaCreation}
        className="space-y-4"
      >
        {/* Area Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Area Name
          </label>
          <input
            type="text"
            name="areaName"
            value={formData.areaName}
            onChange={handleChange}
            required
            placeholder="Enter area name"
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        {/* Area Location */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Area Location
          </label>
          <input
            type="text"
            name="areaLocation"
            value={formData.areaLocation}
            onChange={handleChange}
            required
            placeholder="Enter area location"
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        {/* Area Pincode */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Area Pincode
          </label>
          <input
            type="number"
            name="areaPincode"
            value={formData.areaPincode}
            onChange={handleChange}
            required
            placeholder="Enter pincode"
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-1 focus:ring-green-500"
          />
        </div>

        {/* Assigned Drivers */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Assigned Drivers
          </label>
          <select
            name="assignedDrivers"
            value={selectedDriver}
            onChange={handleSelectChange}
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-1 focus:ring-green-500"
          >
            <option value="">Select</option>
            {driverId.length !== 0 &&
              driverId.map((driver, index) => (
                <option value={driver?.userId} key={index}>
                  {driver?.name}({driver?.driverId})
                </option>
              ))}
          </select>
          <p className="text-xs text-gray-400 mt-1">
            Hold Ctrl (Cmd on Mac) to select multiple
          </p>
        </div>

        {/* Error Message */}
        {error && <p className="text-sm text-red-600">{error}</p>}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className={`w-full p-2 rounded-lg text-white font-medium ${
            isLoading
              ? "bg-green-400 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-700"
          } transition duration-150`}
        >
          {type === "edit"
            ? isLoading
              ? "Updating Area..."
              : "Update Area"
            : isLoading
            ? "Creating Area..."
            : "Create Area"}
        </button>
      </form>
    </div>
  );
};

export default AreaForm;
