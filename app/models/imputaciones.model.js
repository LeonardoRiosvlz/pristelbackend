module.exports = (sequelize, Sequelize, DataTypes) => {
    const Cargo = sequelize.define(
      "imputaciones", // Model name
      {
        // Model attributes
        id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true
        },
        codigo: {
          type: DataTypes.STRING(15)
        },
        nombre: {
            type: DataTypes.STRING(25)
        },
        descripcion: {
          type: DataTypes.STRING
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
  
    return Cargo;
  };
  