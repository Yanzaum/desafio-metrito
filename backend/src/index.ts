import express, { Request, Response } from "express";
import Routes from "./routes/api";
import cors from "cors";

require("dotenv").config();

const PORT = process.env.PORT || 3000;

const server = express();
server.use(cors());
server.use(express.json());

server.use("/api", Routes);

server.use((req: Request, res: Response) => {
  res.status(404);
  res.json({ error: "Endpoint não encontrado." });
});

server.listen(PORT, () =>
  console.log(`Servidor API REST pronto na porta: ${PORT}`)
);
