import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import AdminLayout from "./layouts/AdminLayout";
import DashboardPage from "./pages/DashboardPage";
import DriversPage from "./pages/DriversPage";
import PassengersPage from "./pages/PassengersPage";
import TransactionsPage from "./pages/TransactionsPage";
import LoginPage from "./pages/LoginPage";

const App: React.FC = () => {
  const isAuthenticated = !!localStorage.getItem("kaviar_admin_token");

  return (
    <Router>
      <Routes>
        {/* Login */}
        <Route path="/login" element={<LoginPage />} />

        {/* Rotas protegidas do admin */}
        <Route
          path="/admin"
          element={
            isAuthenticated ? (
              <AdminLayout>
                <DashboardPage />
              </AdminLayout>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/admin/drivers"
          element={
            isAuthenticated ? (
              <AdminLayout>
                <DriversPage />
              </AdminLayout>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/admin/passengers"
          element={
            isAuthenticated ? (
              <AdminLayout>
                <PassengersPage />
              </AdminLayout>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/admin/transactions"
          element={
            isAuthenticated ? (
              <AdminLayout>
                <TransactionsPage />
              </AdminLayout>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* Redirecionar qualquer outra rota */}
        <Route
          path="*"
          element={
            <Navigate
              to={isAuthenticated ? "/admin" : "/login"}
              replace
            />
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
