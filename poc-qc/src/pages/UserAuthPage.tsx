import React, { useState, useContext } from "react";
import { LiaIdCard } from "react-icons/lia";
import axios from "../services/axiosConfig";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../auth/AuthContext";
const ResponsiveLogin: React.FC = () => {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
 
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
 
  const handleSubmit = async (e: React.FormEvent) => {
    navigate("/");
    e.preventDefault();
 
    try {
      const response = await axios.post("/User/login", {
        email: formData.username,
        password: formData.password,
      });
 
      auth?.login(response.data.token);
 
      // 🔥 AUDIT SUCCESS
      await axios.post("/Audit", {
        action: "LOGIN_SUCCESS",
        entity: "User",
        entityId: formData.username,
      });
 
      navigate("/home");
    } catch (err: any) {
      // 🔥 AUDIT FAILURE
      await axios.post("/Audit", {
        action: "LOGIN_FAILED",
        entity: "User",
        entityId: formData.username,
      });
 
      alert(err.response?.data?.message || "Login failed");
    }
  };
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6 py-12">
      {/* Logo */}
      <div className="mb-12 flex justify-center">
        <img
          src="/qc-logo.webp"
          alt="QuantumCyte Logo"
          className="w-40 sm:w-48 md:w-56 h-auto"
        />
      </div>
 
      {/* Scan Badge */}
      <button
        className="
          flex
          items-center
          justify-center
          gap-2
          border
          border-gray-300
          rounded-lg
          px-6
          py-3
          mb-8
          hover:bg-gray-50
          transition
          text-gray-700
          font-medium
        "
      >
        <LiaIdCard className="text-xl" />
        Scan your badge
      </button>
 
      {/* Divider */}
      <div className="flex items-center w-full max-w-sm md:max-w-md mb-8">
        <div className="flex-1 h-px bg-gray-300"></div>
        <span className="px-4 text-gray-400 text-sm">or</span>
        <div className="flex-1 h-px bg-gray-300"></div>
      </div>
 
      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm md:max-w-md space-y-6"
      >
        {/* Username */}
        <div>
          <label className="block text-sm text-gray-600 mb-2">Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="username"
            className="
              w-full
              border
              border-gray-300
              rounded-md
              px-4
              py-3
              focus:outline-none
              focus:ring-1
              focus:ring-gray-400
              focus:border-gray-400
              transition
            "
          />
        </div>
 
        {/* Password */}
        <div>
          <label className="block text-sm text-gray-600 mb-2">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="••••••••"
            className="
              w-full
              border
              border-gray-300
              rounded-md
              px-4
              py-3
              focus:outline-none
              focus:ring-1
              focus:ring-gray-400
              focus:border-gray-400
              transition
            "
          />
        </div>
 
        {/* Footer */}
        <div className="flex items-center justify-between pt-2">
          <button
            type="button"
            className="text-sm text-gray-500 hover:text-gray-700 transition ml-6"
          >
            Forgot Password
          </button>
 
          <button
            type="submit"
            className="
      bg-gray-800
      hover:bg-gray-900
      text-white
      px-20
      py-2
      rounded-md
      transition
      font-medium
    "
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
};
 
export default ResponsiveLogin;