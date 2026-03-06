import express from "express";
// Rotas
import { EventosRoutes } from "./routes/EventosRoutes.js";

const app = express();
const PORT = 3000;

app.use(express.json());

app.use("/api",EventosRoutes);

app.listen(PORT, () => {
    console.log(`Servidor ligado na porta ${PORT}`);
})