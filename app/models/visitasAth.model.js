module.exports = (sequelize, Sequelize, DataTypes) => {
    const VisitasAth = sequelize.define(
      "visitas_ath", // Model name
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
        descripcion: {
          type: DataTypes.TEXT 
        },
        evidencias: {
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
  