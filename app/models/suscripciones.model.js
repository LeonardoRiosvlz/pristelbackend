module.exports = (sequelize, Sequelize, DataTypes) => {
    const Suscripciones = sequelize.define(
      "suscripciones", // Model name
      {
        // Model attributes
        id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true
        }, 
        status: {
            type: DataTypes.ENUM('Visible','Archivada'),
            defaultValue: 'Visible',
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
  
    return Suscripciones;
  };
  