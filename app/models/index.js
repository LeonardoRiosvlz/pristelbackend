const config = require("../config/config.js");
const { Sequelize, DataTypes, Op } = require("sequelize");

const sequelize = new Sequelize(
  config.db.DB_NAME,
  config.db.DB_USER,
  config.db.DB_PASS,
  {
    host: config.db.DB_HOST,
    dialect: config.db.dialect,
    operatorsAliases: false,

    poll: {
      max: config.db.pool.max,
      min: config.db.pool.min,
      acquire: config.db.pool.acquire,
      idle: config.db.pool.idle
    }
  }
);

const db = {};

db.Sequelize = Sequelize;
db.Op = Op;
db.sequelize = sequelize;

db.books = require("./book.model.js")(sequelize, Sequelize, DataTypes);
db.cargo = require("./cargo.model.js")(sequelize, Sequelize, DataTypes);
db.tercero = require("./tercero.model.js")(sequelize, Sequelize, DataTypes);
db.categoria = require("./categoria.model.js")(sequelize, Sequelize, DataTypes);
db.entidad = require("./entidad.model.js")(sequelize, Sequelize, DataTypes);
db.cajero = require("./cajero.model.js")(sequelize, Sequelize, DataTypes);
db.oficina = require("./oficina.model.js")(sequelize, Sequelize, DataTypes);
db.oficina = require("./formato.model.js")(sequelize, Sequelize, DataTypes);
db.oficina = require("./abono.model.js")(sequelize, Sequelize, DataTypes);
db.user = require("./user.model.js")(sequelize, Sequelize, DataTypes);




db.ROLES = ["user", "moderator", "admin"];

module.exports = db;
