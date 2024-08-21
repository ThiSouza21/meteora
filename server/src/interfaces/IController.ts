import { Request, Response } from "express";
import { IService } from "./IService";
import { Model } from "sequelize";

export interface IController<T extends Model<T>> {
  serviceEntity: IService<Model<T>>;
  getUsers(req: Request, res: Response): void;
  getUser(req: Request, res: Response): void;
  createUser(req: Request, res: Response): void;
  deletedUser(req: Request, res: Response): void;
}
