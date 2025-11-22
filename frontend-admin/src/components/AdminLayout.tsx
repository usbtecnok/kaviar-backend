import React from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";

const AdminLayout: React.FC = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("admin_access_token");
    localStorage.removeItem("admin_refresh_token");
    navigate("/login");
  };

  const linkClasses =
    "block px-3 py-2 rounded-lg text-sm hover:bg-black/30 transition";

  return (
    <div className="min-h-screen flex bg-dark text-white">
      <aside className="w-64 bg-grayLight flex flex-col justify-between p-4">
        <div>
          <h1 className="text-gold text-2xl font-bold mb-6">KAVIAR</h1>
          <nav className="space-y-1">
            <NavLink
              to="/admin/dashboard"
              className={({ isActive }) =>
                `${linkClasses} ${
                  isActive ? "bg-black/50 text-gold" : "text-gray-200"
                }`
              }
            >
              Dashboard
            </NavLink>
            <NavLink
              to="/admin/drivers"
              className={({ isActive }) =>
                `${linkClasses} ${
                  isActive ? "bg-black/50 text-gold" : "text-gray-200"
                }`
              }
            >
              Motoristas
            </NavLink>
            <NavLink
              to="/admin/passengers"
              className={({ isActive }) =>
                `${linkClasses} ${
                  isActive ? "bg-black/50 text-gold" : "text-gray-200"
                }`
              }
            >
              Passageiros
            </NavLink>
            <NavLink
              to="/admin/transactions"
              className={({ isActive }) =>
                `${linkClasses} ${
                  isActive ? "bg-black/50 text-gold" : "text-gray-200"
                }`
              }
            >
              Transações
            </NavLink>
          </nav>
        </div>

        <button
          onClick={logout}
          className="mt-4 w-full border border-red-500 text-red-400 rounded-lg py-2 text-sm hover:bg-red-500/10"
        >
          Sair
        </button>
      </aside>

      <main className="flex-1 p-6 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
