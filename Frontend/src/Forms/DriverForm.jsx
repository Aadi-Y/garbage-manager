import React, { useState } from "react";
import { axiosInstance } from "../Utility/axiosInstance";
import { apiPath } from "../Utility/apiPath";
import toast from "react-hot-toast";

function DriverForm({ driver, type, handleCloseModal, handleGetDriver }) {
  const [formData, setFormData] = useState({
    name: driver?.name || "",
    phoneNumber: driver?.phoneNumber || "",
    age: driver?.age || "",
    licence: driver?.licence || "",
    aadharId: driver?.aadharId || "",
    vehicle: driver?.vehicle || "",
    vehicleNumber: driver?.vehicleNumber || "",
    availability: driver?.availability || false,
    currentLocation: driver?.currentLocation || "",
    assignedRequest: driver?.assignedRequest || [],
  });

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleDriverCreation = async (e) => {
    e.preventDefault();
    const driverData = {
      ...formData,
      phoneNumber: Number(formData.phoneNumber),
      aadharId: Number(formData.aadharId),
    };
    console.log("Submitting Driver:", driverData);
    setError(null);
    setIsLoading(true);
    try {
      const response = await axiosInstance.post(
        apiPath.DRIVER.CREATE,
        driverData
      );

      console.log(response);
      if (response && response.data) {
        toast.success(response.data.message);
        setIsLoading(false);
        handleCloseModal();
        handleGetDriver();
      }
    } catch (error) {
      if (error && error.response) {
        setError(error.response.data.message);
        console.error(error);
      }
    } finally {
      setError(null);
      setIsLoading(false);
    }
  };

  const handleDriverUpdation = async (e) => {
    e.preventDefault();
    const driverData = {
      ...formData,
      phoneNumber: Number(formData.phoneNumber),
      aadharId: Number(formData.aadharId),
    };
    try {
      const response = await axiosInstance.put(
        apiPath.DRIVER.UPDATE(driver?._id),
        driverData
      );
      console.log(response);

      if (response && response.data) {
        toast.success(response.data.message);
        handleCloseModal();
        handleGetDriver();
      }
    } catch (error) {
      if (error?.response) {
        toast.error(response.data.message);
        console.log(error?.response);
      }
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold text-center text-green-600 mb-4">
        Create New Driver
      </h2>
      <form
        onSubmit={type === "edit" ? handleDriverUpdation : handleDriverCreation}
        className="space-y-4"
      >
        {/* <div>
          <label>User ID:</label><br />
          <input
            type="text"
            name="user"
            value={formData.user}
            onChange={handleChange}
                        className='rounded-lg border-gray-500 border focus:outline-none focus:ring-1 focus:ring-green-500 w-full p-2 bg-white '

          />
        </div> */}
        <div>
          <label className="text-md font-medium mb-1 text-gray-700">Name</label>
          <br />
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Enter name"
            className="rounded-lg border-gray-300 border focus:outline-none focus:ring-1 focus:ring-green-500 w-full p-2"
          />
        </div>
        <div>
          <label className="text-md font-medium mb-1 text-gray-700">
            Phone Number
          </label>
          <br />
          <input
            type="number"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
            placeholder="Enter phone number"
            className="rounded-lg border-gray-300 border focus:outline-none focus:ring-1 focus:ring-green-500 w-full p-2"
          />
        </div>
        <div>
          <label className="text-md font-medium mb-1 text-gray-700">Age</label>
          <br />
          <input
            type="text"
            name="age"
            value={formData.age}
            onChange={handleChange}
            required
            placeholder="Enter age"
            className="rounded-lg border-gray-300 border focus:outline-none focus:ring-1 focus:ring-green-500 w-full p-2"
          />
        </div>
        <div>
          <label className="text-md font-medium mb-1 text-gray-700">
            Licence Number
          </label>
          <br />
          <input
            type="text"
            name="licence"
            value={formData.licence}
            onChange={handleChange}
            required
            placeholder="Enter Licence number"
            className="rounded-lg border-gray-300 border focus:outline-none focus:ring-1 focus:ring-green-500 w-full p-2"
          />
        </div>
        <div>
          <label className="text-md font-medium mb-1 text-gray-700">
            Aadhar ID
          </label>
          <br />
          <input
            type="number"
            name="aadharId"
            value={formData.aadharId}
            onChange={handleChange}
            required
            placeholder="Enter Aadhar ID"
            className="rounded-lg border-gray-300 border focus:outline-none focus:ring-1 focus:ring-green-500 w-full p-2"
          />
        </div>
        <div>
          <label className="text-md font-medium mb-1 text-gray-700">
            Vehicle Type
          </label>
          <br />
          <input
            type="text"
            name="vehicle"
            value={formData.vehicle}
            onChange={handleChange}
            required
            placeholder="Enter Vehicle Type"
            className="rounded-lg border-gray-300 border focus:outline-none focus:ring-1 focus:ring-green-500 w-full p-2"
          />
        </div>
        <div>
          <label className="text-md font-medium mb-1 text-gray-700">
            Vehicle Number
          </label>
          <br />
          <input
            type="text"
            name="vehicleNumber"
            value={formData.vehicleNumber}
            onChange={handleChange}
            required
            placeholder="Enter Vehicle Number"
            className="rounded-lg border-gray-300 border focus:outline-none focus:ring-1 focus:ring-green-500 w-full p-2"
          />
        </div>
        <div className="flex">
          <label className="text-md font-medium mb-1 text-gray-700">
            Availability
          </label>
          <input
            type="checkbox"
            name="availability"
            checked={formData.availability}
            onChange={handleChange}
            className="rounded-lg border-gray-300 border focus:outline-none w-full p-2"
          />
        </div>
        <div>
          <h6 className="text-sm text-gray-500">
            (*If Not available please leave empty)
          </h6>
        </div>
        <div>
          <label className="text-md font-medium mb-1 text-gray-700">
            Current Location
          </label>
          <br />
          <textarea
            type="text"
            name="currentLocation"
            value={formData.currentLocation}
            onChange={handleChange}
            required
            placeholder="Enter Location"
            className="rounded-lg border-gray-300 border focus:outline-none focus:ring-1 focus:ring-green-500 w-full p-2"
          />
        </div>
        {/* Assigned Requests can be handled separately if needed */}
        <button
          type="submit"
          className="p-2 rounded bg-green-500 hover:bg-green-600 w-full cursor-pointer text-white"
        >
          {type === "edit" ? "Update Driver" : "Create Driver"}
        </button>
      </form>
    </div>
  );
}

export default DriverForm;
