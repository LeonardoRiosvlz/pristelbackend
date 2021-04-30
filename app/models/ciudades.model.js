module.exports = (sequelize, Sequelize, DataTypes) => {
    const Ciudad = sequelize.define(
      "ciudad", // Model name
      {
        // Model attributes
        id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true
        }, 
        dep: {
          type: DataTypes.STRING(2)
        },
        departamento: {
            type: DataTypes.STRING(30)
        },
        ciudad: {
            type: DataTypes.STRING(30)
        },
        metrica_critico: {
          type: DataTypes.STRING(25)
        },
        valor_critico: {
            type: DataTypes.STRING(25)
        },
        metrica_alto: {
          type: DataTypes.STRING(25)
        },
        valor_alto: {
            type: DataTypes.STRING(25)
        },
        metrica_mediano: {
          type: DataTypes.STRING(25)
        },
        metrica_bajo: {
          type: DataTypes.STRING(25)
        },
        valor_bajo: {
            type: DataTypes.STRING(25)
        },
        valor_mediano: {
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
  
    return Ciudad;
  };