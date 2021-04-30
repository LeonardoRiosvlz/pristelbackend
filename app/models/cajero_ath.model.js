module.exports = (sequelize, Sequelize, DataTypes) => {
    const Cajero = sequelize.define(
      "cajero_ath", // Model name
      {
        // Model attributes
        id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true
        },
        tipo: {
          type: DataTypes.ENUM('ATM','KIOSKO'),
          unique: false
        },
        codigo: {
          type: DataTypes.STRING(10)
        },
        tipologia: {
            type: DataTypes.STRING(25)
        }, 
        entidad_bancaria: {
          type: DataTypes.STRING(45)
        },
        terminal: {
            type: DataTypes.STRING(30)
        },
        direccion: {
            type: DataTypes.STRING(150)
        },
        tipo_site: {
          type: DataTypes.ENUM('Cabina','Cubículo independiente','Sin site'),
          unique: false
        }, 
        numero_site: {
          type: DataTypes.STRING(30)
        },
        mantenimiento: {
          type: DataTypes.ENUM('Aplica','N/A'),
          unique: false
        },
        comparte_site: {
          type: DataTypes.ENUM('SI','NO','N/A'),
          unique: false
        },
        compartido_con: {
          type: DataTypes.JSON
        },
        cumpleanos: {
            type: DataTypes.STRING(25)
        },
        administrado: {
          type: DataTypes.STRING(25)
        },
        aseo: {
          type: DataTypes.ENUM('DIARIO','FIN DE SEMANA','DE LUNES A VIERNES','DE LUNES A SABADO','NO'),
          unique: false
        },
        cierre_nocturno: {
          type: DataTypes.ENUM('DIARIO','FIN DE SEMANA','NO'),
          unique: false
        },
        hora_cierre: {
          type: DataTypes.STRING(25)
        },
        apertura: {
          type: DataTypes.ENUM('DIARIO','FIN DE SEMANA','N/A'),
          unique: false
        },
        hora_apertura: {
          type: DataTypes.STRING(25)
        },
        estado: {
          type: DataTypes.ENUM('Activo','Retirado','Suspendido'),
          unique: false
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
  
    return Cajero;
  };
  