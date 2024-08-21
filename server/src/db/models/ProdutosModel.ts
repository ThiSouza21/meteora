import { Model, DataTypes, Sequelize } from "sequelize";
import { db } from "../models";
import { CarrinhosModel } from "./CarrinhosModel";

interface AssociableModel extends Model {
  associate?: () => void;
}

class ProdutosModel extends Model implements AssociableModel {
  public id!: string;
  public nome!: string;
  public quantidade!: number;

  static associate() {
    ProdutosModel.hasMany(CarrinhosModel, { foreignKey: "productId" });
  }
}

ProdutosModel.init(
  {
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    quantidade: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize: db.sequelize as Sequelize,
    modelName: "ProdutosModel",
    tableName: "produtos",
    timestamps: true,
  }
);
console.log(`config: ${db}\n`);

export { ProdutosModel };
