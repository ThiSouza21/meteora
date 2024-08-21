import {
  Attributes,
  CreationAttributes,
  Model,
  ModelStatic,
  WhereOptions,
} from "sequelize";
import { v4 as uuidv4 } from "uuid";
import { IDto } from "../interfaces/IDto";
import { hash } from "bcrypt";

export interface Models<T extends Model> extends ModelStatic<T> {
  associate: () => void;
}

export class Service<T extends Model> {
  model: Models<T>;
  constructor(model: Models<T>) {
    this.model = model;
  }

  async getUsers() {
    const users = await this.model.findAll();
    if (!users.length) throw new Error("Não há usuarios cadastrados");
    return users;
  }

  async getUser(id: string) {
    const user = await this.model.findByPk(id);
    if (!user) throw new Error("Usuario não cadastrado.");
    return user;
  }

  async createdUsers(dto: IDto) {
    const emailExist = await this.model.findOne({
      where: {
        email: dto.email,
      } as unknown as WhereOptions<Attributes<T>>,
    });

    if (emailExist) throw new Error("Usuario já cadastrado!");

    const passwdHash = await hash(dto.senha, 8);

    const user: CreationAttributes<T> = {
      id: uuidv4(),
      nome: dto.nome,
      email: dto.email,
      senha: passwdHash,
      role: dto.role,
    } as unknown as CreationAttributes<T>;
    const createdUser = await this.model.create(user);
    return createdUser;
  }

  async deletedUser(id: string) {
    const deletedUser = await this.model.destroy({
      where: {
        id,
      } as unknown as WhereOptions<Attributes<T>>,
    });
    if (!deletedUser) return false;
    return true;
  }

  async updatedUser(data: Partial<Attributes<T>>, id: string) {
    const [user] = await this.model.update(data, {
      where: {
        id,
      } as unknown as WhereOptions<Attributes<T>>,
    });
    if (!user) throw new Error("Usuario não cadastrado.");
    return user;
  }
}
