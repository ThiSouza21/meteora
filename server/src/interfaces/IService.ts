import { Attributes, Model, ModelStatic } from "sequelize";
import { IDto } from "./IDto";

export interface IService<T extends Model<T>> {
  model: ModelStatic<T>;
  getUsers(): Promise<T[]>;
  getUser(id: string): Promise<T>;
  createdUsers(dto: IDto): Promise<T>;
  deletedUser(id: string): Promise<boolean>;
  updatedUser(data: Partial<Attributes<T>>, id: string): Promise<number>;
}
