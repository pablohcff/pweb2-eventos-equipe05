import express from "express";

// Controller
import { EventosController } from "../controllers/EventosController.js";

const router = express.Router();

router.get('/', (req, res) => {
  res.json({ message: 'API funcionando!' });
});

router.get('/eventos', EventosController.getAllEvents);

export { router as EventosRoutes };