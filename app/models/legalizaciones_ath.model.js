module.exports = (sequelize, Sequelize, DataTypes) => {
    const LegalizacionesAth = sequelize.define(
      "legalizaciones_ath", // Model name
      {
        // Model attributes
        id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true
        },
        status: {
            type: DataTypes.ENUM('Pendiente','Aceptada','Devuelta'),
            defaultValue: 'Pendiente',
            unique: false
        },
        tipo: {
            type: DataTypes.STRING(20)
        },
        observaciones: {
            type: DataTypes.STRING
        },
        abono: {
          type: DataTypes.STRING(150)
        }, 
        excedente: {
            type: DataTypes.STRING(20)
        },
        evidencias: {
            type: DataTypes.JSON
        },
        observaciones_analista: {
          type: DataTypes.TEXT 
        },
        items: {
            type: DataTypes.JSON
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
  
    return LegalizacionesAth;
  };
  