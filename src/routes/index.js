import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  res.json({
    message: "🚀 API Kaviar funcionando",
    status: "ok",
  });
});

export default router;
