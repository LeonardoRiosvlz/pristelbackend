module.exports = (sequelize, Sequelize, DataTypes) => {
    const Nota = sequelize.define(
      "notas", // Model name
      {
        // Model attributes
        id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true
        },
        texto: {
          type: DataTypes.STRING
        },
        consecutivo: {
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
  
    return Nota;
  };
  