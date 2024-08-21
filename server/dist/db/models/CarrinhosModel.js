"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CarrinhosModel = void 0;
const sequelize_1 = require("sequelize");
const models_1 = require("../models");
const UsuariosModel_1 = require("./UsuariosModel");
const ProdutosModel_1 = require("./ProdutosModel");
class CarrinhosModel extends sequelize_1.Model {
    static associate() {
        CarrinhosModel.belongsTo(UsuariosModel_1.UsuariosModel, { foreignKey: "userId" });
        CarrinhosModel.belongsTo(ProdutosModel_1.ProdutosModel, { foreignKey: "productId" });
    }
}
exports.CarrinhosModel = CarrinhosModel;
CarrinhosModel.init({
    userId: {
        type: sequelize_1.DataTypes.UUIDV4,
        allowNull: false,
        references: {
            model: "usuarios",
            key: "id",
        },
    },
    productId: {
        type: sequelize_1.DataTypes.UUIDV4,
        allowNull: false,
        references: {
            model: "produtos",
            key: "id",
        },
    },
    quantity: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    sequelize: models_1.db.sequelize,
    timestamps: true,
    modelName: "CarrinhosModel",
    tableName: "carrinhos",
});
