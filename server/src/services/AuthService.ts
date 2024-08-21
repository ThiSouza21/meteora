import "dotenv/config";
import { Attributes, Model, WhereOptions } from "sequelize";
import { db } from "../db/models";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { IUsuarios } from "../interfaces/IUsuarios";
import { Models } from "./Service";
import { UsuariosModel } from "../db/models/UsuariosModel";

class AuthService<T extends Model<IUsuarios>> {
  model: Models<T>;
  constructor(model: Models<T>) {
    this.model = model;
  }

  async login(dto: { email: string; senha: string }) {
    const validatedUser = await this.model.findOne({
      attributes: ["id", "email", "senha", "role"],
      where: { email: dto.email } as unknown as WhereOptions<Attributes<T>>,
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

export const authService = new AuthService(UsuariosModel);
