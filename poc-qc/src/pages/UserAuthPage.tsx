import React, { useState } from "react";
import SignIn from "../components/SignIn";
import SignUp from "../components/SignUp";

const UserAuth: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* LEFT SIDE - Branding Panel */}
      <div className="hidden lg:flex lg:w-1/2  bg-[#452dce] text-white px-16 py-20 flex-col justify-between">
        <div>
          <div className="w-54 h-18">
            <img src="./qc-logo.webp" className="w-full h-full" alt="logo" />
          </div>
          <p className="mt-2 text-blue-200 text-sm">
            Digital Slide Scanning & Laboratory Intelligence
          </p>
        </div>

        <div>
          <h2 className="text-4xl font-semibold leading-tight">
            Secure Enterprise Platform
            <br />
            for Modern Diagnostics
          </h2>

          <p className="mt-6 text-blue-200 text-sm max-w-md leading-relaxed">
            Built for laboratory technicians and pathologists, Quantumcyte
            streamlines slide processing, case management, and reporting
            workflows with precision and reliability.
          </p>
        </div>

        <div className="text-blue-300 text-sm">
          © {new Date().getFullYear()} Quantumcyte Technologies
        </div>
      </div>

      <div className="flex w-full lg:w-1/2 items-center justify-center px-6 sm:px-12 py-12">
        <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8 sm:p-10">
          {/* Header */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800">
              {isLogin ? "Sign in to your account" : "Create a new account"}
            </h2>
            <p className="text-sm text-gray-500 mt-2">
              {isLogin
                ? "Access your laboratory dashboard securely."
                : "Register as an authorized lab technician."}
            </p>
          </div>

          {/* Toggle Tabs */}
          <div className="flex bg-gray-100 rounded-lg p-1 mb-8">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-2 text-sm font-medium rounded-md transition ${
                isLogin
                  ? "bg-white shadow text-blue-700"
                  : "text-gray-500 hover:text-blue-600"
              }`}
            >
              Sign In
            </button>

            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-2 text-sm font-medium rounded-md transition ${
                !isLogin
                  ? "bg-white shadow text-indigo-700"
                  : "text-gray-500 hover:text-indigo-600"
              }`}
            >
              Register
            </button>
          </div>

          {/* Render Forms */}
          {isLogin ? <SignIn /> : <SignUp />}
        </div>
      </div>
    </div>
  );
};

export default UserAuth;
