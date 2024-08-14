import { Model, DataTypes, Sequelize, ModelStatic } from "sequelize";

class usuarios extends Model {
  public id!: string;
  public nome!: string;
  public email!: string;
  public senha!: string;

  static associate(models: { [key: string]: ModelStatic<Model> }) {}
}

const initModel = (sequelize: Sequelize): ModelStatic<usuarios> => {
  usuarios.init(
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
    },
    {
      sequelize,
      modelName: "usuarios",
      defaultScope: {
        attributes: {
          exclude: ["senha"],
        },
      },
    }
  );

  return usuarios;
};

export default initModel;
