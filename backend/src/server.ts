import express, { Request, Response } from "express";
import { connectDB } from "./lib/prisma.db";
import cors from "cors";
import mainRouter from "./api/routes/index.route";
import { ENV } from "./config/env.config";

const app = express();
const PORT = ENV.PORT;

app.use(express.json());
app.use(cors());

app.get("/", (_req: Request, res: Response) => {
  res.json({ status: 200 });
});
app.use("/api", mainRouter);

const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`Server up and running on PORT: ${PORT}`);
  });
};

startServer();
