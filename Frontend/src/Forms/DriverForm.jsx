import React, { useState } from "react";

function DriverForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    user: "", // You may populate this from a user list
    name: "",
    phoneNumber: "",
    age: "",
    licence: "",
    aadharId: "",
    vehicle: "",
    vehicleNumber: "",
    availability: false,
    currentLocation: "",
    assignedRequest: [], // You may populate this later from request data
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const driverData = {
      ...formData,
      phoneNumber: Number(formData.phoneNumber),
      aadharId: Number(formData.aadharId),
    };
    console.log("Submitting Driver:", driverData);
    if (onSubmit) onSubmit(driverData); // Call parent handler if provided
  };

  return (
    <div>
      <h2 className="font-medium text-center my-2 text-[1.3rem] text-green-600">
        Create Driver
      </h2>
      <form
        onSubmit={handleSubmit}
        className="px-5 py-6 rounded flex flex-col gap-3"
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
          <label>Name</label>
          <br />
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Enter name"
            className="rounded-lg border-gray-500 border focus:outline-none focus:ring-1 focus:ring-green-500 w-full p-2"
          />
        </div>
        <div>
          <label>Phone Number</label>
          <br />
          <input
            type="number"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
            placeholder="Enter phone number"
            className="rounded-lg border-gray-500 border focus:outline-none focus:ring-1 focus:ring-green-500 w-full p-2"
          />
        </div>
        <div>
          <label>Age</label>
          <br />
          <input
            type="text"
            name="age"
            value={formData.age}
            onChange={handleChange}
            required
            placeholder="Enter age"
            className="rounded-lg border-gray-500 border focus:outline-none focus:ring-1 focus:ring-green-500 w-full p-2"
          />
        </div>
        <div>
          <label>Licence Number</label>
          <br />
          <input
            type="text"
            name="licence"
            value={formData.licence}
            onChange={handleChange}
            required
            placeholder="Enter Licence number"
            className="rounded-lg border-gray-500 border focus:outline-none focus:ring-1 focus:ring-green-500 w-full p-2"
          />
        </div>
        <div>
          <label>Aadhar ID</label>
          <br />
          <input
            type="number"
            name="aadharId"
            value={formData.aadharId}
            onChange={handleChange}
            required
            placeholder="Enter Aadhar ID"
            className="rounded-lg border-gray-500 border focus:outline-none focus:ring-1 focus:ring-green-500 w-full p-2"
          />
        </div>
        <div>
          <label>Vehicle Type</label>
          <br />
          <input
            type="text"
            name="vehicle"
            value={formData.vehicle}
            onChange={handleChange}
            required
            placeholder="Enter Vehicle Type"
            className="rounded-lg border-gray-500 border focus:outline-none focus:ring-1 focus:ring-green-500 w-full p-2"
          />
        </div>
        <div>
          <label>Vehicle Number</label>
          <br />
          <input
            type="text"
            name="vehicleNumber"
            value={formData.vehicleNumber}
            onChange={handleChange}
            required
            placeholder="Enter Vehicle Number"
            className="rounded-lg border-gray-500 border focus:outline-none focus:ring-1 focus:ring-green-500 w-full p-2"
          />
        </div>
        <div className="flex">
          <label>Availability:</label>
          <input
            type="checkbox"
            name="availability"
            checked={formData.availability}
            onChange={handleChange}
            required
            className="rounded-lg border-gray-500 border focus:outline-none focus:ring-1 focus:ring-green-500 w-full p-2"
          />
        </div>
        <div>
          <label>Current Location</label>
          <br />
          <textarea
            type="text"
            name="currentLocation"
            value={formData.currentLocation}
            onChange={handleChange}
            required
            placeholder="Enter Location"
            className="rounded-lg border-gray-500 border focus:outline-none focus:ring-1 focus:ring-green-500 w-full p-2"
          />
        </div>
        {/* Assigned Requests can be handled separately if needed */}
        <button
          type="submit"
          className="p-2 rounded bg-green-500 hover:bg-green-600 w-full"
        >
          Create Driver
        </button>
      </form>
    </div>
  );
}

export default DriverForm;
