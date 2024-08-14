"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const sequelize_1 = require("sequelize");
const dotenv_1 = require("dotenv");
const usuarios_1 = __importDefault(require("./usuarios"));
(0, dotenv_1.config)();
const basename = path_1.default.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require(path_1.default.join(__dirname + "/../config/config.json"))[env];
const sequelize = config.url
    ? new sequelize_1.Sequelize(config.url, config)
    : new sequelize_1.Sequelize(config.database, config.username, config.password, config);
const db = {};
db.usuarios = (0, usuarios_1.default)(sequelize);
fs_1.default.readdirSync(__dirname)
    .filter((file) => {
    return (file.indexOf(".") !== 0 &&
        file !== basename &&
        file.slice(-3) === ".ts" &&
        file.indexOf(".test.ts") === -1);
})
    .forEach((file) => {
    const model = require(path_1.default.join(__dirname, file)).default(sequelize, sequelize_1.DataTypes);
    db[model.name] = model;
});
Object.keys(db).forEach((modelName) => {
    const model = db[modelName];
    if (model && model.associate) {
        model.associate(db);
    }
});
db.sequelize = sequelize;
db.Sequelize = sequelize_1.Sequelize;
exports.default = db;
