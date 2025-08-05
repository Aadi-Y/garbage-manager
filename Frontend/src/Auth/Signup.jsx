import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {apiPath} from "../Utility/apiPath";
import { axiosInstance } from '../Utility/axiosInstance';
import {useNavigate} from "react-router-dom";

function Signup() {
  const [formData, setFormData] = useState({
    userName: '',
    email: '',
    password: '',
    role:''
  });
  const [error,setError] = useState(null);
  const [isLoading,setIsLoading] = useState(false);

  const navigate = useNavigate();

  function handleNavigate(role){
    if(role === "User"){
      navigate("/garbage");
    }else if(role === "Admin"){
      navigate("/admin");
    }else {
      navigate("/driverPage");
    }
  }

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log('Signing up with:', formData);
    try{
      const response = await axiosInstance.post(apiPath.AUTH.REGISTER,formData);
      if(response.data){
        alert(response.data.message);
        handleNavigate(response.data.user.role);
        localStorage.setItem("token",response.data.token);
      }

      console.log(response);
    }catch(error){
      console.log(error);
      if(error.response){
        setError(error.response.data.message);
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-[100vh] gap-5 bg-slate-100">
      <h2 className='text-2xl font-medium text-green-600'>Signup</h2>
      <form onSubmit={handleSubmit}
      className="w-100 flex flex-col gap-2 px-4 py-5 bg-white rounded-lg shadow-lg"
      >
        <div>
          <label className='text-md font-medium mb-1 inline-block text-gray-700'>Name:</label><br />
          <input
            type="text"
            name="userName"
            value={formData.userName}
            onChange={handleChange}
            className='w-full focus:outline-none focus:ring-1 focus:ring-green-500 border border-gray-300 rounded-lg p-2 bg-white'
            placeholder='Enter name' 
          />
        </div>
        <div>
          <label className='text-md font-medium mb-1 inline-block text-gray-700'>Email:</label><br />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className='w-full focus:outline-none focus:ring-1 focus:ring-green-500 border border-gray-300 rounded-lg p-2 bg-white'
            placeholder='Enter email'
          />
        </div>
        <div>
          <label className='text-md font-medium mb-1 inline-block text-gray-700'>Password:</label><br />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className='w-full focus:outline-none focus:ring-1 focus:ring-green-500 border border-gray-300 rounded-lg p-2 bg-white'
            placeholder='Enter password'
          />
        </div>
        <div>
          <label className='text-md font-medium mb-1 inline-block text-gray-700'>Role:</label><br />
          <input
            type="text"
            name="role"
            value={formData.role}
            onChange={handleChange}
            className='w-full focus:outline-none focus:ring-1 focus:ring-green-500 border border-gray-300 rounded-lg p-2 bg-white'
            placeholder='Enter Role'
          />
        </div>
        <div>
            <p className='text-red-600'>{error}</p>
        </div>
        <div>
            <p className='text-gray-700'>Aldready have an account? <Link to="/login" className="underline decoration-green-500">Login</Link></p>
        </div>
        <button type="submit"
        disabled={isLoading}
        className='border w-full outline-none focus:border-green-600 rounded-lg p-2 bg-green-500  text-white hover:bg-green-600 cursor-pointer transition-all duration-200 font-medium'
        >{isLoading ? "Signing up" : "Signup"}</button>
      </form>
    </div>
  );
};

export default Signup;
