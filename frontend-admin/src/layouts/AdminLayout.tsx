import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { BarChart3, Users, Car, CreditCard, LogOut } from "lucide-react";

interface AdminLayoutProps {
  children: React.ReactNode;
}

const navLinkBase =
  "flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium transition-all";
const navLinkInactive =
  "text-gray-300 hover:text-gold hover:bg-grayLight/40";
const navLinkActive =
  "text-gold bg-grayLight/70 shadow-[0_0_25px_rgba(230,184,0,0.25)]";

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("kaviar_admin_token");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-dark to-black text-white flex">
      {/* Sidebar */}
      <aside className="w-72 bg-grayLight/30 border-r border-gold/20 backdrop-blur-xl p-6 flex flex-col">
        <div>
          <div className="flex items-center justify-between mb-10">
            <div>
              <div className="text-[11px] tracking-[0.35em] text-gray-400 uppercase">
                Painel
              </div>
              <div className="text-2xl font-bold tracking-[0.4em] text-gold mt-1">
                KAVIAR
              </div>
            </div>
            <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-gold to-yellow-500 flex items-center justify-center text-black font-semibold text-sm shadow-lg">
              EL
            </div>
          </div>

          <nav className="space-y-2">
            <NavLink
              to="/admin"
              end
              className={({ isActive }) =>
                [
                  navLinkBase,
                  isActive ? navLinkActive : navLinkInactive,
                ].join(" ")
              }
            >
              <BarChart3 size={18} />
              <span>Visão Geral</span>
            </NavLink>

            <NavLink
              to="/admin/drivers"
              className={({ isActive }) =>
                [
                  navLinkBase,
                  isActive ? navLinkActive : navLinkInactive,
                ].join(" ")
              }
            >
              <Car size={18} />
              <span>Motoristas Elite</span>
            </NavLink>

            <NavLink
              to="/admin/passengers"
              className={({ isActive }) =>
                [
                  navLinkBase,
                  isActive ? navLinkActive : navLinkInactive,
                ].join(" ")
              }
            >
              <Users size={18} />
              <span>Passageiros VIP</span>
            </NavLink>

            <NavLink
              to="/admin/transactions"
              className={({ isActive }) =>
                [
                  navLinkBase,
                  isActive ? navLinkActive : navLinkInactive,
                ].join(" ")
              }
            >
              <CreditCard size={18} />
              <span>Transações</span>
            </NavLink>
          </nav>
        </div>

        <div className="mt-auto pt-6 border-t border-gold/15 flex items-center justify-between">
          <div>
            <div className="text-xs text-gray-400">Logado como</div>
            <div className="text-sm font-medium text-gold">
              admin@usbtecnok.com.br
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium text-gray-300 hover:text-gold hover:bg-grayLight/50 transition-all"
          >
            <LogOut size={16} />
            Sair
          </button>
        </div>
      </aside>

      {/* Conteúdo principal */}
      <main className="flex-1 p-8">
        <div className="max-w-6xl mx-auto space-y-6">{children}</div>
      </main>
    </div>
  );
};

export default AdminLayout;
