import fs from "fs";
import path from "path";
import { Sequelize, ModelStatic, DataTypes, Model } from "sequelize";
import { config as dotenvConfig } from "dotenv";
import initModel from "./usuarios";

dotenvConfig();

const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require(path.join(__dirname + "/../config/config.json"))[env];

const sequelize = config.url
  ? new Sequelize(config.url, config)
  : new Sequelize(config.database, config.username, config.password, config);

const db: {
  [key: string]: ModelStatic<Model> | any;
} = {};

db.usuarios = initModel(sequelize);

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 &&
      file !== basename &&
      file.slice(-3) === ".ts" &&
      file.indexOf(".test.ts") === -1
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file)).default(
      sequelize,
      DataTypes
    );
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  const model = db[modelName];
  if (model && (model as any).associate) {
    (model as any).associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
