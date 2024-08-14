import { Request, Response } from "express";
import { IController } from "../interfaces/IController";
import { IService } from "../interfaces/IService";
import { Model } from "sequelize";
import { IDto } from "../interfaces/IDto";

export class Controller<T extends Model<T>> implements IController<T> {
  serviceEntity: IService<T>;
  constructor(service: IService<T>) {
    this.serviceEntity = service;
  }

  async getUsers(req: Request, res: Response) {
    try {
      const users = await this.serviceEntity.getUsers();
      res.status(200).json({
        success: {
          usuarios: users,
        },
      });
    } catch (error: unknown) {
      if (error instanceof Error)
        res.status(404).json({ error: { message: error.message } });
    }
  }

  async getUser(req: Request, res: Response) {
    const idUser = req.params.id;
    try {
      const user = await this.serviceEntity.getUser(idUser);
      res.status(200).json({
        success: {
          usuario: user,
        },
      });
    } catch (error: unknown) {
      if (error instanceof Error)
        res.status(404).json({ error: { message: error.message } });
    }
  }

  async createUser(req: Request, res: Response) {
    try {
      const dto: IDto = req.body;

      if (!dto) throw new Error("Está faltando alguma informação.");

      const user = await this.serviceEntity.createdUsers(dto);

      res.status(201).json({
        success: {
          message: "Usuario criado com sucesso.",
          usuario: user,
        },
      });
    } catch (error: unknown) {
      if (error instanceof Error)
        res.status(404).json({ error: { message: error.message } });
    }
  }

  async deletedUser(req: Request, res: Response) {
    const idUser = req.params.id;
    try {
      const deletedUser = await this.serviceEntity.deletedUser(idUser);

      if (!deletedUser) throw new Error("Usuario não foi criado com sucesso");

      res.status(200).json({
        success: {
          message: "Usuario deletado com sucesso.",
        },
      });
    } catch (error) {
      if (error instanceof Error)
        res.status(404).json({ error: { message: error.message } });
    }
  }

  async updatedUser(req: Request, res: Response) {
    const idUser = req.params.id;
    const data = req.body;
    try {
      const user = await this.serviceEntity.updatedUser(data, idUser);
      if (user)
        res.status(200).json({
          success: {
            message: "Usuario atualizado com sucesso.",
          },
        });
    } catch (error: unknown) {
      if (error instanceof Error)
        res.status(404).json({ error: { message: error.message } });
    }
  }
}
