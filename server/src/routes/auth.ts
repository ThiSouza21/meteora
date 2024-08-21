import { Request, Response, Router } from "express";
import { authController } from "../controller/AuthController";
import { authentication } from "../middlewares/authetication";

const router = Router();

router
  .post("/auth/login", (req: Request, res: Response) =>
    authController.authLogin(req, res)
  )
  .get("/auth/check", authentication, (req, res) => {
    res.status(200).json({ message: "Usuário autenticado" });
  })
  .post("/auth/logout", authentication, (req, res) => {
    res.clearCookie("token");
    res.status(200).json({ message: "Logout bem-sucedido" });
  });

export default router;
