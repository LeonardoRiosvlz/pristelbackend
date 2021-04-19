module.exports = (sequelize, Sequelize, DataTypes) => {
    const Conversacion = sequelize.define(
      "conversacion", // Model name
      {
        // Model attributes
        id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true
        }, 
        titulo: {
            type: DataTypes.STRING(25)
        },
        tipo: {
            type: DataTypes.ENUM('Privada','Graupal'),
            defaultValue: 'Privada',
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
  
    return Conversacion;
  };
  