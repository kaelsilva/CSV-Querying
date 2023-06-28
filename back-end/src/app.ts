import express, { Express } from "express";
import cors from "cors";
import FileRoutes from "./api/routes/FileRoutes";
import "./database";

const app: Express = express();

app.use(express.json());

app.use(
  cors({
    origin: "*",
  })
);

app.use("/api", FileRoutes);

export default app;
