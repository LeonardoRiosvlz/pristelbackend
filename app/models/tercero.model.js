module.exports = (sequelize, Sequelize, DataTypes) => {
    const Tercero = sequelize.define(
      "tercero", // Model name
      {
        // Model attributes
        id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true
        },
        nombre_tercero: {
          type: DataTypes.STRING(30)
        },
        descripcion_tercero: {
          type: DataTypes.STRING(130)
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
  
    return Tercero;
  };
  