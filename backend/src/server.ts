import express, { Request, Response } from "express";

const app = express();
const PORT = 5000;

app.get("/", (_req: Request, res: Response) => {
  res.json({ status: 200 });
});

app.listen(PORT, () => {
  console.log(`Server up and running on PORT: ${PORT}`);
});
