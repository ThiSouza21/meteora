import * as fs from "fs";
import * as path from "path";
import { Sequelize, Model, ModelStatic } from "sequelize";

// Tipo para o objeto `db`
export interface Db {
  [key: string]: Models | Sequelize;
}

export interface Models extends ModelStatic<Model> {
  associate?: () => void;
}

// Inicialize o Sequelize
const basename: string = path.basename(__filename);
const env: string = process.env.NODE_ENV || "development";
const config = require(path.resolve(`${__dirname}/../config/config.json`))[env];

console.log(`${basename}\n`);
console.log(`${env}\n`);
console.log(`config: ${config}\n`);

// Inicialize o Sequelize
const sequelize: Sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

export const db: Db = { sequelize };

// Adicione os modelos ao objeto db
fs.readdirSync(__dirname)
  .filter(
    (file: string) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file: string) => {
    const model = require(path.join(__dirname, file)).default;
    if (model && model.name) {
      db[model.name] = model;
    }
  });

// Associe os modelos
Object.keys(db).forEach((modelName: string) => {
  const model = db[modelName] as Models;
  if (model.associate) {
    model.associate();
  }
});

console.log(`${db}\n`);
