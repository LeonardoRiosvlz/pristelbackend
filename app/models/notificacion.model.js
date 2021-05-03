module.exports = (sequelize, Sequelize, DataTypes) => {
    const Notificacion = sequelize.define(
      "notificacion", // Model name
      {
        // Model attributes
        id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true
        },
        titulo: {
          type: DataTypes.STRING
        },
        descripcion: {
          type: DataTypes.STRING
        },
        origen: {
            type: DataTypes.STRING
        },
        icon: {
          type: DataTypes.STRING
        },
        color: {
          type: DataTypes.STRING
        },
        modulo: {
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
  
    return Notificacion;
  };
  