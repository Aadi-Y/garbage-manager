import React, { useState } from 'react';

const AreaForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    areaName: '',
    areaLocation: '',
    areaPincode: '',
    assignedDrivers: []
  });
  const [error,setError] = useState(null);
  const [isLoading,setIsLoading] = useState(false);
 
  const handleChange = (e) => {
    const { name, value } = e.target;

    // For multi-select (assignedDrivers)
    if (name === 'assignedDrivers') {
      const selectedOptions = Array.from(e.target.selectedOptions).map(opt => opt.value);
      setFormData(prev => ({ ...prev, assignedDrivers: selectedOptions }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Convert pincode to number
    const areaData = {
      ...formData,
      areaPincode: Number(formData.areaPincode)
    };
    console.log('Submitting Area:', areaData);
    if (onSubmit) onSubmit(areaData); // For API or parent component usage
  };

  return (
    <div>
      <h2 className='font-medium text-center text-[1.2rem] text-green-600'>Create Area</h2>
      <form onSubmit={handleSubmit}
      className="flex flex-col gap-2"
      >
        <div>
          <label>Area Name:</label><br />
          <input
            type="text"
            name="areaName"
            value={formData.areaName}
            onChange={handleChange}
            required
            placeholder='Enter name'
            className='w-full bg-white focus:outline-green-600 p-2 rounded'
          />
        </div>
        <div>
          <label>Area Location:</label><br />
          <input
            type="text"
            name="areaLocation"
            value={formData.areaLocation}
            onChange={handleChange}
            required
            placeholder='Enter location'
            className='w-full bg-white focus:outline-green-600 p-2 rounded'
          />
        </div>
        <div>
          <label>Area Pincode:</label><br />
          <input
            type="number"
            name="areaPincode"
            value={formData.areaPincode}
            onChange={handleChange}
            required
            placeholder="Enter pincode"
            className='w-full bg-white focus:outline-green-600 p-2 rounded'
          />
        </div>
        <div>
          <label>Assigned Drivers (Select Multiple):</label><br />
          <select
            name="assignedDrivers"
            multiple
            value={formData.assignedDrivers}
            onChange={handleChange}
            className='w-full rounded focus:outline-green-600'
          >
            {/* Replace these options with real driver data fetched from API */}
            <option value="driverId1"
            className='border p-2 rounded bg-white'
            >Driver 1</option>
            <option value="driverId2"
            className='border p-2 rounded bg-white'
            >Driver 2</option>
            <option value="driverId3"
            className='border p-2 rounded bg-white focus:outline-green-600'
            >Driver 3</option>
            <option value="driverId3"
            className='border p-2 rounded bg-white focus:outline-green-600'
            >Driver 3</option>
            <option value="driverId3"
            className='border p-2 rounded bg-white focus:outline-green-600'
            >Driver 3</option>
          </select>
        </div>

        <div>
          <p className='text-red-500'>
            {error}
          </p>
        </div>

        <button type="submit"
        className="bg-green-500 w-full p-2 rounded cursor-pointer"
        disabled={isLoading}
        >{isLoading ? "Creating Area" : "Create Area"}</button>
      </form>
    </div>
  );
};

export default AreaForm;
