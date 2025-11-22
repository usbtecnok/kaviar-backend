import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("admin@kaviar.com");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // CHAMANDO A ROTA CORRETA DO BACKEND
      const res = await api.post("/auth/login-email", {
        email,
        password,
      });

      // Salvando token corretamente
      localStorage.setItem("kaviar_admin_token", res.data.access_token);

      navigate("/admin");
    } catch (err: any) {
      console.error("Erro login admin:", err?.response?.data || err);
      setError(
        err?.response?.data?.message ||
        "Erro ao fazer login. Verifique as credenciais."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="bg-[#161821] rounded-2xl p-8 w-full max-w-md shadow-xl text-white">
        <h1 className="text-3xl font-bold text-[#e6b800] mb-2 text-center">
          KAVIAR ADMIN
        </h1>
        <p className="text-sm text-gray-300 mb-6 text-center">
          Acesse o painel administrativo
        </p>

        {error && (
          <div className="mb-4 text-sm text-red-400 bg-red-950/40 border border-red-700 rounded-lg p-2">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm mb-1">E-mail</label>
            <input
              type="email"
              className="w-full bg-black/40 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Senha</label>
            <input
              type="password"
              className="w-full bg-black/40 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#e6b800] text-black font-semibold py-2 rounded-lg hover:bg-yellow-400 transition disabled:opacity-60"
          >
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
