module.exports = (sequelize, Sequelize, DataTypes) => {
    const Trazabilidad_ath = sequelize.define(
      "trazabilidad_ath", // Model name
      {
        // Model attributes
        id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true
        }, 
        tipo: {
          type: DataTypes.STRING(25)
        },
        mes: {
          type: DataTypes.STRING(15) 
        },
        descripcion: {
          type: DataTypes.TEXT 
        },
        fecha: {
            type: DataTypes.DATEONLY
        },
        estado: {
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
  
    return Trazabilidad_ath;
  };
  