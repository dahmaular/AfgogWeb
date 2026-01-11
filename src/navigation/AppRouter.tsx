import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAppSelector } from "@/store";
import { Welcome } from "@/screens/AuthScreen/Welcome/Welcome";
import { Login } from "@/screens/AuthScreen/Login/Login";
import { Register } from "@/screens/AuthScreen/Register/Register";
import { VerifyEmail } from "@/screens/AuthScreen/VerifyEmail/VerifyEmail";
import { Home } from "@/screens/TabScreen/Home/Home";
import { Dashboard } from "@/screens/Dashboard/Dashboard";
import { Order } from "@/screens/TabScreen/Order/Order";
import { Property } from "@/screens/TabScreen/Property/Property";
import { PropertyDetail } from "@/screens/PropertyDetail/PropertyDetail";
import { CreateProperty } from "@/screens/CreateProperty/CreateProperty";
import { Settings } from "@/screens/TabScreen/Settings/Settings";
import { Wishlist } from "@/screens/TabScreen/Wishlist/Wishlist";

const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const isAuthenticated = useAppSelector((state) => state.user.isAuthenticated);
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

const PublicOnlyRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const isAuthenticated = useAppSelector((state) => state.user.isAuthenticated);
  return !isAuthenticated ? <>{children}</> : <Navigate to="/home" />;
};

export const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes - Accessible to everyone */}
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />

        {/* Auth Routes - Only for non-authenticated users */}
        <Route
          path="/welcome"
          element={
            <PublicOnlyRoute>
              <Welcome />
            </PublicOnlyRoute>
          }
        />
        <Route
          path="/login"
          element={
            <PublicOnlyRoute>
              <Login />
            </PublicOnlyRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicOnlyRoute>
              <Register />
            </PublicOnlyRoute>
          }
        />
        <Route
          path="/verify-email"
          element={
            <PublicOnlyRoute>
              <VerifyEmail />
            </PublicOnlyRoute>
          }
        />

        {/* Private Routes - Only for authenticated users */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/orders"
          element={
            <PrivateRoute>
              <Order />
            </PrivateRoute>
          }
        />
        <Route path="/properties" element={<Property />} />
        <Route path="/properties/:id" element={<PropertyDetail />} />
        <Route
          path="/create-property"
          element={
            <PrivateRoute>
              <CreateProperty />
            </PrivateRoute>
          }
        />
        <Route
          path="/wishlist"
          element={
            <PrivateRoute>
              <Wishlist />
            </PrivateRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <PrivateRoute>
              <Settings />
            </PrivateRoute>
          }
        />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
};
