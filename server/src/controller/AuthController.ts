import { Request, Response } from "express";
import { authService } from "../services/AuthService";

class AuthController {
  serviceEntity: typeof authService;
  constructor(service: typeof authService) {
    this.serviceEntity = service;
  }

  async authLogin(req: Request, res: Response) {
    const { email, senha } = req.body;

    try {
      const loginUser = await this.serviceEntity.login({ email, senha });
      res.cookie("token", loginUser.accessToken, {
        maxAge: 5 * 60 * 1000,
        httpOnly: true,
        secure: false,
        sameSite: "none",
      });
      res.status(200).json({ success: { message: "Usuario encontrado!" } });
    } catch (error) {
      if (error instanceof Error)
        res.status(404).json({ error: { message: error.message } });
    }
  }
}

export const authController = new AuthController(authService);
