import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Signup() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [error,setError] = useState(null);
  const [isLoading,setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Signing up with:', formData);
    // Add signup logic here (e.g., API call)
  };

  return (
    <div className="flex flex-col items-center justify-center h-[100vh] gap-5 bg-slate-100">
      <h2 className='text-2xl font-medium text-green-600'>Signup</h2>
      <form onSubmit={handleSubmit}
      className="w-100 flex flex-col gap-2 px-4 py-5 bg-white rounded-lg shadow-lg"
      >
        <div>
          <label className='text-[18px]'>Name:</label><br />
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className='w-full focus:outline-none focus:ring-1 focus:ring-green-500 border border-gray-500 rounded-lg p-2 bg-white'
            placeholder='Enter name'
          />
        </div>
        <div>
          <label className='text-[18px]'>Email:</label><br />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className='w-full focus:outline-none focus:ring-1 focus:ring-green-500 border border-gray-500 rounded-lg p-2 bg-white'
            placeholder='Enter email'
          />
        </div>
        <div>
          <label className='text-[18px]'>Password:</label><br />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className='w-full focus:outline-none focus:ring-1 focus:ring-green-500 border border-gray-500 rounded-lg p-2 bg-white'
            placeholder='Enter password'
          />
        </div>
        <div>
            <p className='text-red-600'>{error}</p>
        </div>
        <div>
            <p>Aldready have an account? <Link to="/login" className="underline decoration-green-500">Login</Link></p>
        </div>
        <button type="submit"
        disabled={isLoading}
        className='border w-full outline-none focus:border-green-600 rounded-lg p-2 bg-green-500  text-white hover:bg-green-600 cursor-pointer transition-all duration-200'
        >{isLoading ? "Signing up" : "Signup"}</button>
      </form>
    </div>
  );
};

export default Signup;
