const jwt = require("jsonwebtoken");

function adminAuth(req, res, next) {
  const header = req.headers.authorization;

  if (!header) {
    return res.status(401).json({ error: "Token não fornecido" });
  }

  const token = header.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.role !== "admin") {
      return res.status(403).json({ error: "Acesso não permitido" });
    }

    req.admin = { id: decoded.id };
    next();

  } catch (err) {
    return res.status(401).json({ error: "Token inválido" });
  }
}

module.exports = adminAuth;
