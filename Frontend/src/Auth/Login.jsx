import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error,setError] = useState(null);
  const [isLoading,setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    try{
      
    }catch(error){
      if(error && error.message){
        console.error(error.message);
      }
    }
    console.log('Logging in with:', formData);
  };

  return (
    <div className='flex flex-col justify-center items-center h-[100vh] gap-3 bg-slate-100'>
      <h2 className='text-2xl font-medium text-green-600'>Login</h2>
      <form onSubmit={handleSubmit} className="px-4 py-5 rounded-lg w-95 sm:w-100 flex flex-col gap-2 bg-white shadow-lg">
        <div>
          <label className='text-[18px]'>Email:</label><br />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder='Enter email'
            className='w-full p-2 rounded-lg bg-white focus:outline-none border border-gray-500 focus:ring-1 focus:ring-green-500'
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
            placeholder='Enter password'
            className='w-full p-2 rounded-lg bg-white focus:outline-none border border-gray-500 focus:ring-1 focus:ring-green-500'
          />
        </div>
        <div>
            <p>Do not have an account? <Link to="/signup" className='decoration-green-500 underline'>Signup</Link></p>
        </div>
        <button type="submit"
        disabled={isLoading}
        className="border w-full p-2 rounded-lg bg-green-500 text-white hover:bg-green-600 cursor-pointer transition-all duration-200"
        >{isLoading ? "Logging In" : "Login"}</button>
      </form>
    </div>
  );
};

export default Login;
