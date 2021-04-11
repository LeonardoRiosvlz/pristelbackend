module.exports = (sequelize, Sequelize, DataTypes) => {
    const ProgramacionAth = sequelize.define(
      "programacion_ath", // Model name
      {
        // Model attributes
        id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true
        },
        consecutivo: {
           type: DataTypes.STRING(15),
           unique: true
        },
        codigo_tecnico: {
            type: DataTypes.STRING(15)
        },
        codigo_cajero: {
            type: DataTypes.STRING(15)
        },
        llamada: {
          type: DataTypes.STRING(15)
        },
        fecha_llamada: {
          allowNull: true,
          type: DataTypes.DATEONLY 
        },
        cotizacion_visita: {
            type: DataTypes.ENUM('Si','No'),
            unique: false
        },
        cotizacion_visita: {
            type: DataTypes.ENUM('Si','No'),
            unique: false
        },
        requiere_producto: {
            type: DataTypes.ENUM('Si','No'),
            unique: false
        },
        status: {
            type: DataTypes.ENUM('Pendiente','Cerrada'),
            defaultValue: 'Pendiente',
            unique: false
        }, 
        fecha_programacion: {
            allowNull: true,
            type: DataTypes.DATEONLY
        },
        fecha_vencimiento: {
            allowNull: true,
            type: DataTypes.DATEONLY
        },
        fecha_visita: {
            allowNull: true,
            type: DataTypes.DATEONLY
        },
        fecha_iluminacion: {
            allowNull: true,
            type: DataTypes.DATEONLY
        },
        descripcion: {
            type: DataTypes.STRING
        },
        servicio_cobro: {
            type: DataTypes.STRING(25)
        },
        codigo_parametro: {
            type: DataTypes.STRING(20)
        },
        parametro_labor: {
            type: DataTypes.STRING(20)
        },
        created_at: {
            allowNull: false,
            type: DataTypes.DATE
        },
        updated_at: {
            allowNull: false,
            type: DataTypes.DATE
        }  
      },
      {
        // Options
        timestamps: true,
        underscrored: true,
        createdAt: "created_at",
        updatedAt: "updated_at"
      }
    );
  
    return ProgramacionAth;
  };
  