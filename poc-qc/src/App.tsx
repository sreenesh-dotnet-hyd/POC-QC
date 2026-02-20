import React, { useState } from 'react'

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import './App.css'
import HomePage from  './pages/HomePage'
import UserAuth from './pages/UserAuthPage'
import NotFound from './pages/NotFound';


interface ProtectedProps{
  children: React.ReactNode;
}
const ProtectedRoute: React.FC<ProtectedProps> = ({ children }) => {
  const isAuthenticated = localStorage.getItem("auth");
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};


function App() {
  

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<UserAuth />} />

        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />
        {/* Catch all unknown routes */}
        <Route path="*" element={<NotFound/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App


