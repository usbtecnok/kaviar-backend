const jwt = require("jsonwebtoken");

function authDriver(req, res, next) {
  const header = req.headers.authorization;
  if (!header) return res.status(401).json({ message: "Token de motorista ausente." });

  const token = header.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);

    if (decoded.type !== "driver") {
      return res.status(403).json({ message: "Token não pertence a um motorista." });
    }

    req.driverId = decoded.id;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Token inválido." });
  }
}

module.exports = authDriver;
