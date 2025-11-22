const express = require("express");
const jwt = require("jsonwebtoken");

const router = express.Router();

// Credenciais "oficiais" do admin (por enquanto só para exibir)
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@usbtecnok.com.br";

router.post("/login-email", (req, res) => {
  const body = req.body || {};
  console.log("🔥 Requisição de login admin recebida em /auth/login-email");
  console.log("Payload recebido:", body);

  const { email, password } = body;

  // Em DEV, vamos aceitar qualquer combinação com campos preenchidos
  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "E-mail e senha são obrigatórios." });
  }

  const secret = process.env.JWT_SECRET || "kaviar-dev-secret";

  const payload = {
    sub: "admin-1",
    email: email,
    type: "admin",
  };

  try {
    const access_token = jwt.sign(payload, secret, { expiresIn: "2h" });
    const refresh_token = jwt.sign(payload, secret, { expiresIn: "7d" });

    console.log("✅ Login ADMIN bem-sucedido, token gerado.");

    return res.json({
      access_token,
      refresh_token,
      admin: {
        id: "admin-1",
        email,
        name: "Administrador KAVIAR",
      },
    });
  } catch (err) {
    console.error("❌ Erro ao gerar token de admin:", err);
    return res.status(500).json({ message: "Erro interno de autenticação." });
  }
});

module.exports = router;
