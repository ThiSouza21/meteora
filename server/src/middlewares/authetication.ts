import "dotenv/config";
import { NextFunction, Request, Response } from "express";
import { decode, JwtPayload, verify } from "jsonwebtoken";
import { CustomRequest } from "../interfaces/CustomRequest";

export const authentication = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization;

  if (!token)
    return res
      .status(400)
      .json({ error: { message: "Token não informado na requisição." } });

  const [, accessToken] = token.split(" ");

  if (!accessToken)
    return res
      .status(400)
      .json({ error: { message: "Tipo de authentication não passado." } });

  try {
    const secret = process.env.SECRET;
    if (!secret) throw new Error("SecretKey não foi acessada com sucesso.");

    verify(accessToken, secret);

    const { id, email } = decode(accessToken) as JwtPayload;

    req.user = {
      id: id,
      email: email,
    };

    next();
  } catch (error) {
    if (error instanceof Error)
      res.status(400).json({ error: { message: error.message } });
  }
};
