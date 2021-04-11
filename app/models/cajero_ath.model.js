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
          type: DataTypes.STRING(15)
        },
        codigo: {
          type: DataTypes.STRING(10)
        },
        tipologia: {
            type: DataTypes.STRING(25)
        }, 
        terminal: {
            type: DataTypes.STRING(30)
        },
        direccion: {
            type: DataTypes.STRING(150)
        },
        ciudad: {
            type: DataTypes.STRING(30)
        },
        regional: {
            type: DataTypes.STRING(30)
        },
        site: {
            type: DataTypes.STRING(30)
        },
        dias_respuesta: {
          type: DataTypes.STRING(5)
        },
        comparte_site: {
            type: DataTypes.STRING(25)
        },
        cumpleanos: {
            type: DataTypes.STRING(25)
        },
        administrado: {
          type: DataTypes.STRING(25)
        },
        tipo_site: {
          type: DataTypes.STRING(25)
        }, 
        cierre_nocturno: {
          type: DataTypes.ENUM('Si','No'),
          unique: false
        },
        apertura: {
          type: DataTypes.STRING(25)
        },
        cierre: {
          type: DataTypes.STRING(25)
        },
        aseo: {
          type: DataTypes.STRING(25)
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
  