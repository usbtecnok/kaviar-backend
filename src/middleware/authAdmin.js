const jwt = require("jsonwebtoken");

function authAdmin(req, res, next) {
  const header = req.headers.authorization;
  if (!header) return res.status(401).json({ message: "Token de admin ausente." });

  const token = header.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);

    if (decoded.type !== "admin") {
      return res.status(403).json({ message: "Token não pertence a um administrador." });
    }

    req.adminId = decoded.id;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Token inválido." });
  }
}

module.exports = authAdmin;
