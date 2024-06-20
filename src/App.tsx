import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import AddCourse from './pages/AddCourse';
import EditCourse from './pages/EditCourse';
import Login from './pages/Login';
import { AuthProvider, PrivateRoute, useAuth } from './context/AuthContext';
import { CourseProvider } from './context/CourseContext';

const AppRoutes: React.FC = () => {
  const { isAuthenticated } = useAuth();
  return (
    <Routes>
      <Route
        path="/login"
        element={isAuthenticated ? <Navigate to="/" /> : <Login />}
      />
      <Route
        path="/"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />
      <Route
        path="/add-course"
        element={
          <PrivateRoute>
            <AddCourse />
          </PrivateRoute>
        }
      />
      <Route
        path="/edit-course/:id"
        element={
          <PrivateRoute>
            <EditCourse />
          </PrivateRoute>
        }
      />
    </Routes>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
        <CourseProvider>
          <AppRoutes />
        </CourseProvider>
      </AuthProvider>
    </Router>
  );
};

export default App;
