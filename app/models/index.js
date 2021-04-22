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
db.notificacion = require("./notificacion.model.js")(sequelize, Sequelize, DataTypes);
db.conversacion = require("./conversacion.model.js")(sequelize, Sequelize, DataTypes);
db.suscripciones = require("./suscripciones.model.js")(sequelize, Sequelize, DataTypes);
db.mensajes = require("./mensajes.model.js")(sequelize, Sequelize, DataTypes);
db.imputaciones = require("./imputaciones.model.js")(sequelize, Sequelize, DataTypes);


db.user.hasMany(db.permiso, { foreignKey: 'uid' });
db.entidad.hasMany(db.permiso, { foreignKey: 'eid' });
//cajeros//
db.entidad.hasMany(db.cajero_ath, { foreignKey: 'id_entidad' });
db.cajero_ath.belongsTo(db.entidad, { foreignKey: 'id_entidad' });
//imputaciones//
db.entidad.hasMany(db.imputaciones, { foreignKey: 'id_entidad' });
db.imputaciones.belongsTo(db.entidad, { foreignKey: 'id_entidad' });
//formato// 
db.user.hasMany(db.formato, { as: 'Tecnico', foreignKey: 'tecnico_id' });
db.user.hasMany(db.formato, { as: 'Autorizador', foreignKey: 'autorizador_id' });
db.user.hasMany(db.formato, { as: 'Solicitante', foreignKey: 'solicitante_id' });
db.formato.belongsTo(db.user, { as: 'Tecnico', foreignKey: 'tecnico_id' });
db.formato.belongsTo(db.user, { as: 'Autorizador', foreignKey: 'autorizador_id' });
db.formato.belongsTo(db.user, { as: 'Solicitante', foreignKey: 'solicitante_id' }); 
db.tercero.hasMany(db.formato, { foreignKey: 'tercero_id' });
db.formato.belongsTo(db.tercero, { foreignKey: 'tercero_id' });
db.entidad.hasMany(db.formato, { foreignKey: 'entidad_id' });
db.formato.belongsTo(db.entidad, { foreignKey: 'entidad_id' }); 
//formato//
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



db.notificacion.belongsTo(db.user, { foreignKey: 'uid' });
db.user.hasMany(db.notificacion, { foreignKey: 'uid' });

///chat///
db.conversacion.hasMany(db.suscripciones, { foreignKey: 'id_conversacion' }); 
db.user.hasMany(db.conversacion, { foreignKey: 'uid' }); 
db.suscripciones.belongsTo(db.conversacion, { foreignKey: 'id_conversacion' }); 
db.user.hasMany(db.suscripciones, { foreignKey: 'uid' }); 
db.suscripciones.belongsTo(db.user, { foreignKey: 'uid' }); 

db.conversacion.hasMany(db.mensajes, { foreignKey: 'id_conversacion' }); 
db.conversacion.belongsTo(db.user, { foreignKey: 'uid' }); 
db.user.hasMany(db.mensajes, { foreignKey: 'uid' });
db.mensajes.belongsTo(db.user, { foreignKey: 'uid' }); 
db.mensajes.belongsTo(db.conversacion, { foreignKey: 'id_conversacion' }); 
///chat///




db.ROLES = ["user", "moderator", "admin"];

module.exports = db;
