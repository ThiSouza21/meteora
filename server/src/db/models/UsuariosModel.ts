import { Model, DataTypes, Sequelize, ModelStatic } from "sequelize";
import { DataType } from "sequelize-typescript";
import { db } from "../models";
import { CarrinhosModel } from "./CarrinhosModel";

interface AssociableModel extends Model {
  associate?: () => void;
}

class UsuariosModel extends Model implements AssociableModel {
  public id!: string;
  public nome!: string;
  public email!: string;
  public senha!: string;
  public role!: "admin" | "user";

  static associate() {
    UsuariosModel.hasMany(CarrinhosModel, { foreignKey: "userId" });
  }
}

UsuariosModel.init(
  {
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    senha: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataType.ENUM("admin", "user"),
      allowNull: false,
    },
  },
  {
    sequelize: db.sequelize as Sequelize,
    modelName: "UsuariosModel",
    tableName: "usuarios",
    timestamps: true,
    defaultScope: {
      attributes: {
        exclude: ["senha"],
      },
    },
  }
);

export { UsuariosModel };
