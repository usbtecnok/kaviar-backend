import prisma from "../prismaClient.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET_PASSENGER || "kaviar_passenger_secret";

// Registrar passageiro
export async function registerPassenger(req, res) {
  try {
    const { name, email, password } = req.body;

    const exists = await prisma.passenger.findUnique({ where: { email } });
    if (exists) {
      return res.status(400).json({ error: "Passageiro já cadastrado." });
    }

    const hashed = await bcrypt.hash(password, 10);

    const passenger = await prisma.passenger.create({
      data: { name, email, password: hashed },
    });

    res.json({
      success: true,
      passenger: {
        id: passenger.id,
        name: passenger.name,
        email: passenger.email,
      },
    });
  } catch (error) {
    console.error("Erro registerPassenger:", error);
    res.status(500).json({ error: "Erro interno ao registrar." });
  }
}

// Login passageiro
export async function loginPassenger(req, res) {
  try {
    const { email, password } = req.body;

    const passenger = await prisma.passenger.findUnique({ where: { email } });
    if (!passenger) {
      return res.status(401).json({ error: "Credenciais inválidas." });
    }

    const match = await bcrypt.compare(password, passenger.password);
    if (!match) {
      return res.status(401).json({ error: "Credenciais inválidas." });
    }

    const token = jwt.sign(
      { id: passenger.id, role: "passenger" },
      JWT_SECRET,
      { expiresIn: "12h" }
    );

    res.json({
      success: true,
      token,
      passenger: {
        id: passenger.id,
        name: passenger.name,
        email: passenger.email,
      },
    });
  } catch (error) {
    console.error("Erro loginPassenger:", error);
    res.status(500).json({ error: "Erro interno no login." });
  }
}

// Perfil passageiro
export async function getPassengerProfile(req, res) {
  try {
    const passenger = await prisma.passenger.findUnique({
      where: { id: req.passengerId },
    });

    if (!passenger) {
      return res.status(404).json({ error: "Passageiro não encontrado." });
    }

    res.json({
      id: passenger.id,
      name: passenger.name,
      email: passenger.email,
      createdAt: passenger.createdAt,
    });
  } catch (error) {
    console.error("Erro getPassengerProfile:", error);
    res.status(500).json({ error: "Erro interno." });
  }
}

export default {
  registerPassenger,
  loginPassenger,
  getPassengerProfile,
};
