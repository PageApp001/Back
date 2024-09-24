"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const _process = require("process");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require("../../config/config.json");

const db: any = {};

let sequelize: any;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.test.database,
    config.test.username,
    config.test.password,
    {
      host: config.test.host,
      dialect: config.test.dialect,
    }
  );
}

fs.readdirSync(__dirname)
  .filter((file: string) => {
    return (
      file.indexOf(".") !== 0 &&
      file !== basename &&
      file.slice(-3) === ".ts" &&
      file.indexOf(".test.ts") === -1
    );
  })
  .forEach((file: any) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    // db[model.name] = model;
    if (model && model.name) {
      db[model.name] = model;
    } else {
      console.error(`El modelo en ${file} no se cargó correctamente o no tiene la propiedad 'name'.`);
    }
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
