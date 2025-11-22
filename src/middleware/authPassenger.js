const jwt = require("jsonwebtoken");

function authPassenger(req, res, next) {
  const header = req.headers.authorization;
  if (!header) return res.status(401).json({ message: "Token de passageiro ausente." });

  const token = header.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);

    if (decoded.type !== "passenger") {
      return res.status(403).json({ message: "Token não pertence a um passageiro." });
    }

    req.passengerId = decoded.id;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Token inválido." });
  }
}

module.exports = authPassenger;
