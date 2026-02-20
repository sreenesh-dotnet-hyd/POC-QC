import axios from "axios";
import React, { useState } from "react";

const SignUp: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    labId: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = (): string | null => {
    if (formData.password !== formData.confirmPassword) {
      return "Passwords do not match.";
    }

    if (formData.password.length < 6) {
      return "Password must be at least 6 characters long.";
    }

    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setIsSubmitting(true);
      
      const response = await axios.post(
        "https://localhost:7113/api/User/register",
        {
          "fullName": formData.fullName,
          "labId": formData.labId,
          "email": formData.email,
          "password": formData.password,
          "confirmPassword":formData.confirmPassword
        }
      );
//       alert(
//         `Account Created Successfully!

//  Full Name: ${formData.fullName}
// Lab ID: ${formData.labId}
// Email: ${formData.email}`,
//       );
     alert(response.data.message);

      console.log("Register Data:", formData);

      setFormData({
        fullName: "",
        labId: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    } catch (err:any) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded-lg text-sm">
          {error}
        </div>
      )}

      {/* Full Name */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Full Name
        </label>
        <input
          type="text"
          name="fullName"
          placeholder="Technician Name"
          required
          value={formData.fullName}
          onChange={handleChange}
          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600"
        />
      </div>

      {/* Lab ID */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Laboratory ID
        </label>
        <input
          type="text"
          name="labId"
          placeholder="LAB-2026-001"
          required
          value={formData.labId}
          onChange={handleChange}
          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600"
        />
      </div>

      {/* Email */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Work Email
        </label>
        <input
          type="email"
          name="email"
          placeholder="technician@quantumcyte.com"
          required
          value={formData.email}
          onChange={handleChange}
          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600"
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
          placeholder="Create Secure Password"
          required
          value={formData.password}
          onChange={handleChange}
          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600"
        />
      </div>

      {/* Confirm Password */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Confirm Password
        </label>
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          required
          value={formData.confirmPassword}
          onChange={handleChange}
          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600"
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={isSubmitting}
        className={`w-full py-2.5 rounded-lg font-medium transition ${
          isSubmitting
            ? "bg-indigo-400 text-white cursor-not-allowed"
            : "bg-indigo-700 hover:bg-indigo-800 text-white"
        }`}
      >
        {isSubmitting ? "Creating Account..." : "Create Account"}
      </button>
    </form>
  );
};

export default SignUp;
