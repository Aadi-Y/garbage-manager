import React, { useState } from "react";
import { Link } from "react-router-dom";
import { apiPath } from "../Utility/apiPath";
import { axiosInstance } from "../Utility/axiosInstance";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { AboutContext } from "../About/AboutState";
import { useContext } from "react";

function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { handleGetUser } = useContext(AboutContext);

  function handleNavigate(role) {
    if (role === "User") {
      navigate("/garbage");
    } else if (role === "Admin") {
      navigate("/admin");
    } else {
      navigate("/driverPage");
    }
  }

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  function valid(email) {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!valid(formData?.email)) {
      setError("Invalid email, Please check !");
      setIsLoading(false);
      return;
    }

    try {
      const response = await axiosInstance.post(apiPath.AUTH.LOGIN, formData);
      if (response && response.data) {
        toast.success(response.data.message);
        handleNavigate(response.data.user.role);
        localStorage.setItem("token", response.data.token);
        handleGetUser();
      }
    } catch (err) {
      if (err && err.response) {
        setError(err.response.data.message);
        console.error(err.response);
      }
    }
    console.log("Logging in with:", formData);
  };

  return (
    <div className="flex flex-col justify-center items-center h-[100vh] gap-3 bg-slate-100">
      <h2 className="text-2xl font-medium text-green-600">Login</h2>
      <form
        onSubmit={handleSubmit}
        className="px-4 py-5 rounded-lg w-95 sm:w-100 flex flex-col gap-2 bg-white shadow-lg"
      >
        <div>
          <label className="text-md text-gray-700 font-medium mb-1">
            Email:
          </label>
          <br />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter email"
            className="w-full p-2 rounded-lg bg-white focus:outline-none border border-gray-300 focus:ring-1 focus:ring-green-500"
          />
        </div>
        <div>
          <label className="text-md mb-1 bold text-gray-700 font-medium">
            Password:
          </label>
          <br />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter password"
            className="w-full p-2 rounded-lg bg-white focus:outline-none border border-gray-300 focus:ring-1 focus:ring-green-500"
          />
        </div>
        <p className="text-red-500">{error}</p>
        <div>
          <p className="text-md text-gray-700">
            Do not have an account?{" "}
            <Link to="/signup" className="decoration-green-500 underline">
              Signup
            </Link>
          </p>
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="border w-full p-2 rounded-lg bg-green-500 text-white hover:bg-green-600 cursor-pointer transition-all duration-200 font-semibold"
        >
          {isLoading ? "Logging In" : "Login"}
        </button>
      </form>
    </div>
  );
}

export default Login;
