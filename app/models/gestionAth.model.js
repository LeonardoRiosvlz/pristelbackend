module.exports = (sequelize, Sequelize, DataTypes) => {
    const VisitasAth = sequelize.define(
      "gestion_ath", // Model name
      {
        // Model attributes
        id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true
        },
        tipo: {
            type: DataTypes.ENUM('Realizada','Fallida'),
            defaultValue: 'Realizada',
            unique: false
        },
        fecha: {
            allowNull: true,
            type: DataTypes.DATEONLY
        }, 
        recibo: {
            type: DataTypes.STRING(15)
        },
        asunto: {
            type: DataTypes.STRING(100)
        },
        descripcion: {
            type: DataTypes.STRING(250)
        },
        img_recibo: {
            type: DataTypes.STRING(100)
        },
        observaciones: {
          type: DataTypes.TEXT 
        },
        evidencias_antes: {
            type: DataTypes.JSON
        },
        evidencias_durante: {
            type: DataTypes.JSON
        },
        evidencias_despues: {
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
  
    return VisitasAth;
  };
  