module.exports = (sequelize, Sequelize, DataTypes) => {
    const Subcategoria = sequelize.define(
      "subcategoria", // Model name
      {
        // Model attributes
        id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true
        },
        subcategoria: {
          type: DataTypes.STRING(35)
        },
        categoria: {
            type: DataTypes.STRING(35)
          },
        descripcion: {
          type: DataTypes.STRING(125)
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
  
    return Subcategoria;
  };
  