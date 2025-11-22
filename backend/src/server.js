const express = require('express');
const cors = require('cors');
const tourRoutes = require('./routes/tourRoutes');

const app = express();
app.use(cors());
app.use(express.json());

app.use("/tour", tourRoutes);

app.get("/", (req, res) => {
  res.send("KAVIAR Elite Motorista Backend ONLINE.");
});

app.listen(3000, () => {
  console.log("🚀 Servidor KAVIAR rodando na porta 3000");
});
