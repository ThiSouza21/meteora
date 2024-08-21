import { Model, DataTypes, Sequelize } from "sequelize";
import { db } from "../models";
import { UsuariosModel } from "./UsuariosModel";
import { ProdutosModel } from "./ProdutosModel";

interface AssociableModel extends Model {
  associate?: () => void;
}

class CarrinhosModel extends Model implements AssociableModel {
  public id!: string;
  public nome!: string;
  public userId!: number;

  static associate() {
    CarrinhosModel.belongsTo(UsuariosModel, { foreignKey: "userId" });
    CarrinhosModel.belongsTo(ProdutosModel, { foreignKey: "productId" });
  }
}

CarrinhosModel.init(
  {
    userId: {
      type: DataTypes.UUIDV4,
      allowNull: false,
      references: {
        model: "usuarios",
        key: "id",
      },
    },
    productId: {
      type: DataTypes.UUIDV4,
      allowNull: false,
      references: {
        model: "produtos",
        key: "id",
      },
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize: db.sequelize as Sequelize,
    timestamps: true,
    modelName: "CarrinhosModel",
    tableName: "carrinhos",
  }
);

export { CarrinhosModel };
