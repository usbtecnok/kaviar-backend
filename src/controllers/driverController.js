import prisma from "../prismaClient.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET_DRIVER || "kaviar_driver_secret";

// Registrar motorista
export async function registerDriver(req, res) {
  try {
    const { name, email, password, carModel, carPlate } = req.body;

    const exists = await prisma.driver.findUnique({ where: { email } });
    if (exists) {
      return res.status(400).json({ error: "Motorista já cadastrado." });
    }

    const hashed = await bcrypt.hash(password, 10);

    const driver = await prisma.driver.create({
      data: {
        name,
        email,
        password: hashed,
        carModel,
        carPlate,
        status: "offline",
      },
    });

    res.json({
      success: true,
      driver: {
        id: driver.id,
        name: driver.name,
        email: driver.email,
        carModel: driver.carModel,
        carPlate: driver.carPlate,
      },
    });
  } catch (error) {
    console.error("Erro registerDriver:", error);
    res.status(500).json({ error: "Erro interno ao registrar." });
  }
}

// Login motorista
export async function loginDriver(req, res) {
  try {
    const { email, password } = req.body;

    const driver = await prisma.driver.findUnique({ where: { email } });
    if (!driver) {
      return res.status(401).json({ error: "Credenciais inválidas." });
    }

    const match = await bcrypt.compare(password, driver.password);
    if (!match) {
      return res.status(401).json({ error: "Credenciais inválidas." });
    }

    const token = jwt.sign(
      { id: driver.id, role: "driver" },
      JWT_SECRET,
      { expiresIn: "12h" }
    );

    res.json({
      success: true,
      token,
      driver: {
        id: driver.id,
        name: driver.name,
        email: driver.email,
        status: driver.status,
      },
    });
  } catch (error) {
    console.error("Erro loginDriver:", error);
    res.status(500).json({ error: "Erro interno no login." });
  }
}

// Perfil motorista
export async function getDriverProfile(req, res) {
  try {
    const driver = await prisma.driver.findUnique({
      where: { id: req.driverId },
    });

    if (!driver) {
      return res.status(404).json({ error: "Motorista não encontrado." });
    }

    res.json({
      id: driver.id,
      name: driver.name,
      email: driver.email,
      carModel: driver.carModel,
      carPlate: driver.carPlate,
      status: driver.status,
      createdAt: driver.createdAt,
    });
  } catch (error) {
    console.error("Erro getDriverProfile:", error);
    res.status(500).json({ error: "Erro interno." });
  }
}

// Atualizar status online/offline
export async function updateDriverStatus(req, res) {
  try {
    const { status } = req.body;

    const driver = await prisma.driver.update({
      where: { id: req.driverId },
      data: { status },
    });

    res.json({
      success: true,
      message: "Status atualizado.",
      status: driver.status,
    });
  } catch (error) {
    console.error("Erro updateDriverStatus:", error);
    res.status(500).json({ error: "Erro interno ao atualizar status." });
  }
}

export default {
  registerDriver,
  loginDriver,
  getDriverProfile,
  updateDriverStatus,
};
