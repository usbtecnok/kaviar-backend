require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const authRoutes = require("./src/routes/auth.routes");
const driverRoutes = require("./src/routes/driver.routes");
const passengerRoutes = require("./src/routes/passenger.routes");
const adminRoutes = require("./src/routes/admin.routes");

const app = express();

// ---------- CORS CONFIG (liberar 5173 e 5174) ----------
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error("CORS bloqueado para origem " + origin), false);
  },
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
  allowedHeaders: "Content-Type,Authorization",
  credentials: true,
}));

app.options("*", cors());

// ---------- MIDDLEWARES ----------
app.use(express.json());
app.use(morgan("dev"));

// ---------- ROTAS ----------
app.get("/", (req, res) => {
  res.json({ status: "ok", message: "KAVIAR API rodando" });
});

app.use("/auth", authRoutes);
app.use("/driver", driverRoutes);
app.use("/passenger", passengerRoutes);
app.use("/admin", adminRoutes);

// ---------- ERRO 404 ----------
app.use((req, res) => {
  res.status(404).json({ message: "Rota não encontrada" });
});

// ---------- START ----------
const PORT = process.env.PORT || 4001;
app.listen(PORT, () => {
  console.log(`🚀 KAVIAR backend rodando na porta ${PORT}`);
  console.log(`🌐 CORS liberado para origens:`, allowedOrigins);
});
