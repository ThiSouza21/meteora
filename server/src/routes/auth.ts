import { Request, Response, Router } from "express";
import { authController } from "../controller/AuthController";

const router = Router();

router.post("/auth/login", (req: Request, res: Response) =>
  authController.authLogin(req, res)
);

export default router;
