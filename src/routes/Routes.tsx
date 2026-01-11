import { Routes, Route, Navigate } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout";
import DashboardLayout from "../layouts/DashboardLayout";
import Login from "../pages/Login";
import UserDashboard from "../pages/UserDashboard";
import UserDetails from "../pages/UserDetails";
import ProtectedRoute from "./ProtectedRoutes";

const UnderConstruction = () => (
  <div style={{ padding: "20px" }}>
    <h2>Page Under Construction</h2>
    <p>This module is not part of the current assessment scope.</p>
  </div>
);

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />

      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
      </Route>

      <Route
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/users" element={<UserDashboard />} />
        <Route path="/users/:id" element={<UserDetails />} />
        <Route path="/dashboard" element={<Navigate to="/users" replace />} />
        <Route path="*" element={<UnderConstruction />} />
      </Route>
    </Routes>
  );
};
