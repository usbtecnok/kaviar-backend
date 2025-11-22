const jwt = require("jsonwebtoken");

/**
 * Middleware para garantir que o usuário é ADMIN.
 * Espera um header: Authorization: Bearer <token>
 * E que o token tenha um campo "type": "admin"
 */
function ensureAdmin(req, res, next) {
  const authHeader = req.headers["authorization"] || "";

  if (!authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ message: "Token não fornecido ou inválido (sem Bearer)." });
  }

  const token = authHeader.replace("Bearer ", "").trim();

  try {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      console.error("JWT_SECRET não definido no .env");
      return res.status(500).json({ message: "Configuração de token inválida." });
    }

    const payload = jwt.verify(token, secret);

    // Aqui assumimos que o token tem um campo "type" e "sub" (id do admin)
    if (payload.type !== "admin") {
      return res.status(403).json({ message: "Acesso restrito a administradores." });
    }

    // Guarda o id do admin para uso posterior, se quiser
    req.adminId = payload.sub || payload.id || null;

    next();
  } catch (err) {
    console.error("Erro ao validar token admin:", err.message);
    return res.status(401).json({ message: "Token inválido ou expirado." });
    }
}

module.exports = {
  ensureAdmin,
};
