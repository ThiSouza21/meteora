"use strict";

import { QueryInterface, DataTypes } from "sequelize";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface: QueryInterface, DataType: typeof DataTypes) {
    await queryInterface.createTable("carrinhos", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4,
      },
      userId: {
        type: DataType.UUID,
        allowNull: false,
        references: {
          model: "usuarios",
          key: "id",
        },
      },
      productId: {
        type: DataType.UUID,
        allowNull: false,
        references: {
          model: "carrinhos",
          key: "id",
        },
      },
      quantity: {
        type: DataType.INTEGER,
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
    await queryInterface.dropTable("carrinhos");
  },
};
