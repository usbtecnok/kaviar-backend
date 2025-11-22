import jwt from "jsonwebtoken";

export default function hotelAuth(req, res, next) {
  const authHeader = req.header("Authorization");

  if (!authHeader) {
    return res.status(401).json({ error: "Token não fornecido" });
  }

  const token = authHeader.replace("Bearer ", "");

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    if (decoded.role !== "hotel") {
      return res.status(403).json({ error: "Acesso negado para hotéis" });
    }

    req.hotelId = decoded.id;
    next();

  } catch (error) {
    return res.status(401).json({ error: "Token inválido" });
  }
}
