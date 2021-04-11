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
db.cajero_ath = require("./cajero_ath.model.js")(sequelize, Sequelize, DataTypes);
db.formato = require("./formato.model.js")(sequelize, Sequelize, DataTypes);
db.user = require("./user.model.js")(sequelize, Sequelize, DataTypes);
db.permiso = require("./permiso.model.js")(sequelize, Sequelize, DataTypes);
db.programacion_ath = require("./programacion_ath.model.js")(sequelize, Sequelize, DataTypes);
db.area = require("./area.model.js")(sequelize, Sequelize, DataTypes);
db.visitasAth = require("./visitasAth.model.js")(sequelize, Sequelize, DataTypes);
db.gestionAth = require("./gestionAth.model.js")(sequelize, Sequelize, DataTypes);

db.user.hasMany(db.permiso, { foreignKey: 'uid' });
db.entidad.hasMany(db.permiso, { foreignKey: 'eid' });
//cajeros//
db.entidad.hasMany(db.cajero_ath, { foreignKey: 'id_entidad' });
db.cajero_ath.belongsTo(db.entidad, { foreignKey: 'id_entidad' });
//programacion//
db.cajero_ath.hasMany(db.programacion_ath, { foreignKey: 'id_cajero' });
db.programacion_ath.belongsTo(db.cajero_ath, { foreignKey: 'id_cajero' });
db.user.hasMany(db.programacion_ath, { foreignKey: 'id_tecnico' }); 
db.programacion_ath.belongsTo(db.user, { foreignKey: 'id_tecnico' });
db.programacion_ath.hasMany(db.visitasAth, { foreignKey: 'id_programacion' }); 
db.visitasAth.belongsTo(db.programacion_ath, { foreignKey: 'id_programacion' }); 
db.programacion_ath.hasMany(db.gestionAth, { foreignKey: 'id_programacion' }); 
db.gestionAth.belongsTo(db.programacion_ath, { foreignKey: 'id_programacion' }); 
//fin programcion //
db.permiso.belongsTo(db.user, { foreignKey: 'uid' });
db.permiso.belongsTo(db.entidad, { foreignKey: 'eid' });









db.ROLES = ["user", "moderator", "admin"];

module.exports = db;
