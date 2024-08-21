import "dotenv/config";
import { NextFunction, Request, Response } from "express";
import { JwtPayload, verify } from "jsonwebtoken";
import { CustomRequest } from "../interfaces/CustomRequest";

export const authentication = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies?.token;

  if (!token) {
    return res.status(401).json({ error: { message: "Token não fornecido." } });
  }

  const secret = process.env.SECRET;

  if (!secret) {
    return res
      .status(500)
      .json({ error: { message: "SecretKey não encontrada." } });
  }

  try {
    const decoded = verify(token, secret) as JwtPayload;

    req.user = {
      id: decoded.id,
      email: decoded.email,
    };

    next();
  } catch (error: unknown) {
    if (error instanceof Error) {
      if (error.name === "TokenExpiredError") {
        return res.status(401).json({ error: { message: "Token expirado." } });
      }
      if (error.name === "JsonWebTokenError") {
        return res.status(401).json({ error: { message: "Token inválido." } });
      }

      return res.status(400).json({ error: { message: error.message } });
    }

    return res
      .status(400)
      .json({ error: { message: "Erro ao verificar token." } });
  }
};
