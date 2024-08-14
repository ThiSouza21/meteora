import { UUIDV4 } from "sequelize";
import { QueryInterface, DataTypes, Sequelize } from "sequelize";

module.exports = {
  async up(queryInterface: QueryInterface, sequelize: Sequelize) {
    await queryInterface.createTable("usuarios", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUIDV4,
        defaultValue: UUIDV4,
      },
      nome: {
        type: DataTypes.STRING,
      },
      email: {
        type: DataTypes.STRING,
      },
      senha: {
        type: DataTypes.STRING,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    });
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.dropTable("usuarios");
  },
};
