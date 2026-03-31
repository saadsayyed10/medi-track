import express, { Request, Response } from "express";
import { connectDB } from "./lib/prisma.db";

const app = express();
const PORT = 5000;

app.get("/", (_req: Request, res: Response) => {
  res.json({ status: 200 });
});

const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`Server up and running on PORT: ${PORT}`);
  });
};

startServer();
