"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize_2 = require("sequelize");
module.exports = {
    up(queryInterface, sequelize) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryInterface.createTable("usuarios", {
                id: {
                    allowNull: false,
                    primaryKey: true,
                    type: sequelize_2.DataTypes.UUIDV4,
                    defaultValue: sequelize_1.UUIDV4,
                },
                nome: {
                    type: sequelize_2.DataTypes.STRING,
                },
                email: {
                    type: sequelize_2.DataTypes.STRING,
                },
                senha: {
                    type: sequelize_2.DataTypes.STRING,
                },
                createdAt: {
                    allowNull: false,
                    type: sequelize_2.DataTypes.DATE,
                },
                updatedAt: {
                    allowNull: false,
                    type: sequelize_2.DataTypes.DATE,
                },
            });
        });
    },
    down(queryInterface) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryInterface.dropTable("usuarios");
        });
    },
};
