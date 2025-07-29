import React, { useState } from 'react';
import {axiosInstance} from "../Utility/axiosInstance";
import { apiPath } from '../Utility/apiPath';

const AreaForm = ({ onSubmit,type,handleCloseModal }) => {
  const [formData, setFormData] = useState({
    areaName: '',
    areaLocation: '',
    areaPincode: '',
    assignedDrivers: []
  });

  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'assignedDrivers') {
      const selectedOptions = Array.from(e.target.selectedOptions).map(opt => opt.value);
      setFormData(prev => ({ ...prev, assignedDrivers: selectedOptions }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleAreaCreation = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const areaData = {
        ...formData,
        areaPincode: Number(formData.areaPincode)
      };
      console.log('Submitting Area:', areaData);
      const response = await axiosInstance.post(apiPath.AREA.CREATE,formData);
      console.log(response);
      if(response && response.data){
        setIsLoading(false);
        alert(response.data.message);
        handleCloseModal();
      }
    } catch (err) {
      setError("Failed to create area. Try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAreaUpdation = async(e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try{

    }catch(error){
      setError("Failed to update area. Try again.");
    }finally{
      setIsLoading(false);
    }
  }

  return (
    <div>
      <h2 className="text-xl font-semibold text-center text-green-600 mb-4">Create New Area</h2>

      <form onSubmit={type === "edit" ? handleAreaUpdation : handleAreaCreation} className="space-y-4">
        {/* Area Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Area Name</label>
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
          <label className="block text-sm font-medium text-gray-700 mb-1">Area Location</label>
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
          <label className="block text-sm font-medium text-gray-700 mb-1">Area Pincode</label>
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
          <label className="block text-sm font-medium text-gray-700 mb-1">Assigned Drivers</label>
          <select
            name="assignedDrivers"
            multiple
            value={formData.assignedDrivers}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-2 h-32 bg-white focus:outline-none focus:ring-1 focus:ring-green-500"
          >
            <option value="driverId1">Driver 1</option>
            <option value="driverId2">Driver 2</option>
            <option value="driverId3">Driver 3</option>
          </select>
          <p className="text-xs text-gray-400 mt-1">Hold Ctrl (Cmd on Mac) to select multiple</p>
        </div>

        {/* Error Message */}
        {error && <p className="text-sm text-red-600">{error}</p>}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className={`w-full p-2 rounded-lg text-white font-medium ${
            isLoading
              ? 'bg-green-400 cursor-not-allowed'
              : 'bg-green-600 hover:bg-green-700'
          } transition duration-150`}
        >
          {isLoading ? "Creating Area..." : "Create Area"}
        </button>
      </form>
    </div>
  );
};

export default AreaForm;
