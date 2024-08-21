"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const sequelize_1 = require("sequelize");
// Inicialize o Sequelize
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require(path.resolve(`${__dirname}/../config/config.json`))[env];
console.log(`${basename}\n`);
console.log(`${env}\n`);
console.log(`config: ${config}\n`);
// Inicialize o Sequelize
const sequelize = new sequelize_1.Sequelize(config.database, config.username, config.password, config);
exports.db = { sequelize };
// Adicione os modelos ao objeto db
fs.readdirSync(__dirname)
    .filter((file) => file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js")
    .forEach((file) => {
    const model = require(path.join(__dirname, file)).default;
    if (model && model.name) {
        exports.db[model.name] = model;
    }
});
// Associe os modelos
Object.keys(exports.db).forEach((modelName) => {
    const model = exports.db[modelName];
    if (model.associate) {
        model.associate();
    }
});
console.log(`${exports.db}\n`);
