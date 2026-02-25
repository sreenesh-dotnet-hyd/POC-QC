import React, { useState } from 'react'

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import './App.css'
import HomePage from './pages/HomePage'
import UserAuth from './pages/UserAuthPage'
import NotFound from './pages/NotFound';
import SamplesPage from './pages/SamplesPage';
import SampleDetailsPage from './pages/SampleDetailsPage';
import BatchesPage from './pages/BatchesPage';


interface ProtectedProps {
  children: React.ReactNode;
}
const ProtectedRoute: React.FC<ProtectedProps> = ({ children }) => {
  const isAuthenticated = localStorage.getItem("auth");
  // if (!isAuthenticated) {
  //   return <Navigate to="/" replace />;
  // }

  return <>{children}</>;
};


function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<UserAuth />} />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        >
          {/* Default page at "/" */}
          <Route index element={<BatchesPage />} />

          {/* Explicit batches route */}
          <Route path="batches" element={<BatchesPage />} />

          {/* Nested batch routes */}
          <Route path="batches/:batchId" element={<SamplesPage />} />
          <Route
            path="batches/:batchId/samples/:sampleId"
            element={<SampleDetailsPage />}
          />
        </Route>
        {/* Catch all unknown routes */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App


