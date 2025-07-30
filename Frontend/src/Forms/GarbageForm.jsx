import React, { useState } from "react";
import { FaPen } from "react-icons/fa6";
import { IoMdTrash } from "react-icons/io";
import { axiosInstance } from "../Utility/axiosInstance";
import { apiPath } from "../Utility/apiPath";

function GarbageForm({ handleCloseModal, garbage, type, handleGetGarbages }) {
  const [formData, setFormData] = useState({
    garbageType: garbage?.garbageType || "",
    state: garbage?.state || "",
    district: garbage?.district || "",
    taluk: garbage?.taluk || "",
    area: garbage?.area || "",
    landMark: garbage?.landMark || "",
    pincode: garbage?.pincode || "",
    depositedOn: garbage?.depositedOn || "",
    description: garbage?.description || "",
    status: garbage?.status || "Pending",
    disposed: garbage?.disposed || false,
    weight: garbage?.weight || 0,
  });

  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const val = type === "checkbox" ? checked : value;
    setFormData((prev) => ({ ...prev, [name]: val }));
  };

  //Adding the garbage
  const handleGarbageCreation = async (e) => {
    e.preventDefault();
    const garbageData = {
      ...formData,
      pincode: Number(formData.pincode),
    };
    console.log("Submitting Garbage:", garbageData);
    // if (onSubmit) onSubmit(garbageData);
    try {
      const response = await axiosInstance.post(
        apiPath.GARBAGE.CREATE,
        garbageData
      );

      console.log(response);
      if (response && response.data) {
        alert(response.data.message);
        handleCloseModal();
      }
    } catch (error) {
      if (error && error.message) {
        consol.error(error.message);
      }
    }
  };

  //Editing the garbage
  const handleGarbageUpdation = async (e) => {
    e.preventDefault();
    const garbageData = {
      ...formData,
      pincode: Number(formData.pincode),
    };
    try {
      const response = await axiosInstance.put(
        apiPath.GARBAGE.UPDATE(garbage?._id),
        garbageData
      );

      console.log(response);
      if (response && response.data) {
        handleCloseModal();
        alert(response.data.message);
        handleGetGarbages();
      }
    } catch (error) {
      if (error?.message) {
        console.log("Error in Updation : ", error.message);
      }
    }
  };

  return (
    <div className="">
      <h2 className="text-green-700 text-center font-medium text-[1.2rem]">
        Submit Garbage Request
      </h2>
      <form
        className="flex flex-col gap-2"
        onSubmit={
          type === "edit" ? handleGarbageUpdation : handleGarbageCreation
        }
      >
        {/* <div>
          <label>User ID:</label><br />
          <input
            type="text"
            name="user"
            value={formData.user}
            onChange={handleChange}
            required
            className='w-full rounded-lg p-2 outline-none focus:ring-1 focus:ring-green-500 bg-white'
            placeholder='Enter User ID'
          />
        </div> */}

        <div>
          <label>Garbage Type:</label>
          <br />
          <select
            name="garbageType"
            value={formData.garbageType}
            onChange={handleChange}
            required
            className="w-full rounded-lg p-2 outline-none focus:ring-1 focus:ring-green-500 bg-white"
          >
            <option value="">Select</option>
            <option value="Organic">Organic</option>
            <option value="Plastic">Plastic</option>
            <option value="E-Waste">E-Waste</option>
            <option value="Mixed">Mixed</option>
            <option value="Metal">Metal</option>
          </select>
        </div>

        <div>
          <label>State:</label>
          <br />
          <input
            type="text"
            name="state"
            value={formData.state}
            onChange={handleChange}
            required
            className="w-full rounded-lg p-2 outline-none focus:ring-1 focus:ring-green-500 bg-white"
            placeholder="Enter State"
          />
        </div>

        <div>
          <label>District:</label>
          <br />
          <input
            type="text"
            name="district"
            value={formData.district}
            onChange={handleChange}
            required
            className="w-full rounded-lg p-2 outline-none focus:ring-1 focus:ring-green-500 bg-white"
            placeholder="Enter District"
          />
        </div>

        <div>
          <label>Taluk:</label>
          <br />
          <input
            type="text"
            name="taluk"
            value={formData.taluk}
            onChange={handleChange}
            required
            className="w-full rounded-lg p-2 outline-none focus:ring-1 focus:ring-green-500 bg-white"
            placeholder="Enter Taluk"
          />
        </div>

        <div>
          <label>Area:</label>
          <br />
          <input
            type="text"
            name="area"
            value={formData.area}
            onChange={handleChange}
            required
            className="w-full rounded-lg p-2 outline-none focus:ring-1 focus:ring-green-500 bg-white"
            placeholder="Enter Area"
          />
        </div>

        <div>
          <label>Landmark:</label>
          <br />
          <input
            type="text"
            name="landMark"
            value={formData.landMark}
            onChange={handleChange}
            required
            className="w-full rounded-lg p-2 outline-none focus:ring-1 focus:ring-green-500 bg-white"
            placeholder="Enter Landmark"
          />
        </div>

        <div>
          <label>Pincode:</label>
          <br />
          <input
            type="number"
            name="pincode"
            value={formData.pincode}
            onChange={handleChange}
            required
            className="w-full rounded-lg p-2 outline-none focus:ring-1 focus:ring-green-500 bg-white"
            placeholder="Enter Pincode"
          />
        </div>

        <div>
          <label>Deposited On:</label>
          <br />
          <input
            type="date"
            name="depositedOn"
            value={formData.depositedOn}
            onChange={handleChange}
            required
            className="w-full rounded-lg p-2 outline-none focus:ring-1 focus:ring-green-500 bg-white"
            placeholder="Enter Deposited date"
          />
        </div>

        <div>
          <label>Description:</label>
          <br />
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            className="w-full rounded-lg p-2 outline-none focus:ring-1 focus:ring-green-500 bg-white"
            placeholder="Enter Discription"
          />
        </div>

        <div>
          <label>Status:</label>
          <br />
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full rounded-lg p-2 outline-none focus:ring-1 focus:ring-green-500 bg-white"
          >
            <option value="Pending">Pending</option>
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
            <option value="Scheduled">Scheduled</option>
          </select>
        </div>

        {/* <div className='flex'>
          <label>Disposed:</label><br />
          <input
            type="checkbox"
            name="disposed"
            checked={formData.disposed}
            onChange={handleChange}
            className='w-full rounded-lg p-2 outline-none bg-white'
          />
        </div> */}

        <div>
          <label>Weight (kg):</label>
          <br />
          <input
            type="text"
            name="weight"
            value={formData.weight}
            onChange={handleChange}
            required
            className="w-full rounded-lg p-2 outline-none focus:ring-1 focus:ring-green-500 bg-white"
            placeholder="Enter weight"
          />
        </div>

        <div>
          <p className="text-red-500">{error}</p>
        </div>

        <button
          className="w-full rounded-lg p-2 cursor-pointer bg-green-500 hover:bg-green-600"
          type="submit"
        >
          {type === "edit" ? "Edit Garbage" : "Submit Garbage"}
        </button>
      </form>
    </div>
  );
}

export default GarbageForm;
