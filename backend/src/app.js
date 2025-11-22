import express from "express";
import cors from "cors";

import driverRoutes from "./routes/driverRoutes.js";
import passengerRoutes from "./routes/passengerRoutes.js";
import rideRoutes from "./routes/rideRoutes.js";
import indexRoutes from "./routes/index.js";

const app = express();

app.use(cors());
app.use(express.json());

// Health-check
app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    service: "Kaviar Backend",
    timestamp: new Date().toISOString(),
  });
});

// Rotas principais
app.use("/", indexRoutes);
app.use("/api/driver", driverRoutes);
app.use("/api/passenger", passengerRoutes);
app.use("/api/ride", rideRoutes);

export default app;
