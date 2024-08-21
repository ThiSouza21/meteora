"use strict";

import { QueryInterface, DataTypes } from "sequelize";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface: QueryInterface, DataType: typeof DataTypes) {
    await queryInterface.createTable("usuarios", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4,
      },
      nome: {
        type: DataType.STRING,
      },
      email: {
        type: DataType.STRING,
        unique: true,
      },
      senha: {
        type: DataType.STRING,
      },
      role: {
        type: DataType.ENUM("admin", "user"),
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: DataType.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataType.DATE,
      },
    });
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.dropTable("usuarios");
  },
};
