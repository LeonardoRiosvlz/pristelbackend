module.exports = (sequelize, Sequelize, DataTypes) => {
    const Area = sequelize.define(
      "area", // Model name
      {
        // Model attributes
        id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true
        },
        nombre: {
          type: DataTypes.STRING(60)
        },
        descripcion: {
            type: DataTypes.STRING(160)
        },
        telefono: {
            type: DataTypes.STRING(60)
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
  
    return Area;
  };
  