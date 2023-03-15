import express, { Request, Response } from "express";
import dotenv from "dotenv";
import Routes from "./routes/api";
import cors from "cors";

dotenv.config();

const PORT = process.env["PORT"];

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
