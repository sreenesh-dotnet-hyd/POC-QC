import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const SignIn: React.FC = () => {

    const navigate=useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://localhost:7113/api/User/login", // FIXED URL
        {
          email: formData.email,
          password: formData.password,
        },
      );

      localStorage.setItem("auth", response.data.token);
      localStorage.setItem("userEmail", formData.email);

      navigate("/home");
    } catch (err: any) {
      alert(err.response?.data?.message || "Login failed");
    }
  };


  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Email */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Work Email
        </label>
        <input
          type="email"
          name="email"
          required
          value={formData.email}
          onChange={handleChange}
          placeholder="technician@quantumcyte.com"
          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition"
        />
      </div>

      {/* Password */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Password
        </label>
        <input
          type="password"
          name="password"
          required
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter your password"
          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition"
        />
      </div>

      {/* Remember + Forgot */}
      <div className="flex items-center justify-between text-sm">
        <label className="flex items-center gap-2 text-gray-600">
          <input
            type="checkbox"
            name="remember"
            checked={formData.remember}
            onChange={handleChange}
            className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
          />
          Remember me
        </label>

        <button
          type="button"
          className="text-blue-600 hover:text-blue-800 font-medium"
        >
          Forgot password?
        </button>
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="w-full bg-blue-700 hover:bg-blue-800 text-white font-medium py-2.5 rounded-lg transition duration-200"
      >
        Sign In
      </button>
    </form>
  );
};

export default SignIn;
