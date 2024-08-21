"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuariosModel = void 0;
const sequelize_1 = require("sequelize");
const sequelize_typescript_1 = require("sequelize-typescript");
const models_1 = require("../models");
const CarrinhosModel_1 = require("./CarrinhosModel");
class UsuariosModel extends sequelize_1.Model {
    static associate() {
        UsuariosModel.hasMany(CarrinhosModel_1.CarrinhosModel, { foreignKey: "userId" });
    }
}
exports.UsuariosModel = UsuariosModel;
UsuariosModel.init({
    nome: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    senha: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    role: {
        type: sequelize_typescript_1.DataType.ENUM("admin", "user"),
        allowNull: false,
    },
}, {
    sequelize: models_1.db.sequelize,
    modelName: "UsuariosModel",
    tableName: "usuarios",
    timestamps: true,
    defaultScope: {
        attributes: {
            exclude: ["senha"],
        },
    },
});
