import express from "express";
import { router } from "./routes";
import cors from "cors";

const app = express();

router(app);

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.listen(3000, () => {
  console.log("O Server foi aberto na porta http://localhost:3000");
});
