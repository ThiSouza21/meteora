"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
class usuarios extends sequelize_1.Model {
    static associate(models) { }
}
const initModel = (sequelize) => {
    usuarios.init({
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
    }, {
        sequelize,
        modelName: "usuarios",
        defaultScope: {
            attributes: {
                exclude: ["senha"],
            },
        },
    });
    return usuarios;
};
exports.default = initModel;
