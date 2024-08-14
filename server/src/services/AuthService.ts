import "dotenv/config";
import { Model, ModelStatic } from "sequelize";
import db from "../models";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { IUsuarios } from "../interfaces/IUsuarios";

class AuthService {
  model: ModelStatic<Model<IUsuarios>>;
  constructor(nameModel: string) {
    this.model = db[nameModel];
  }

  async login(dto: { email: string; senha: string }) {
    const validatedUser = await this.model.findOne({
      attributes: ["id", "email", "senha"],
      where: { email: dto.email },
    });

    if (!validatedUser) throw new Error("Usuario não encontrado.");

    const validatedPasswd = await compare(
      dto.senha,
      validatedUser.get("senha") as string
    );

    if (!validatedPasswd) throw new Error("Usuario ou senha incorreto.");

    const secret = process.env.SECRET;

    if (!secret) {
      throw new Error("SECRET key is not defined in environment variables");
    }

    const accessToken = sign(
      {
        email: dto.email,
        id: validatedUser.get("id") as string,
      },
      secret,
      { expiresIn: "5m" }
    );

    return { accessToken };
  }
}

export const authService = new AuthService("usuarios");
