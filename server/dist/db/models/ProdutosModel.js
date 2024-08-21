"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProdutosModel = void 0;
const sequelize_1 = require("sequelize");
const models_1 = require("../models");
const CarrinhosModel_1 = require("./CarrinhosModel");
class ProdutosModel extends sequelize_1.Model {
    static associate() {
        ProdutosModel.hasMany(CarrinhosModel_1.CarrinhosModel, { foreignKey: "productId" });
    }
}
exports.ProdutosModel = ProdutosModel;
ProdutosModel.init({
    nome: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    quantidade: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    sequelize: models_1.db.sequelize,
    modelName: "ProdutosModel",
    tableName: "produtos",
    timestamps: true,
});
console.log(`config: ${models_1.db}\n`);
