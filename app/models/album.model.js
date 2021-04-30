module.exports = (sequelize, Sequelize, DataTypes) => {
    const Album = sequelize.define(
      "album", // Model name
      {
        // Model attributes
        id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true
        }, 
        observaciones: {
            type: DataTypes.STRING 
        },
        codigo: { 
            type: DataTypes.STRING(25)
       },
        fecha: {
            type: DataTypes.DATEONLY
        },
        perimetro: {
          type: DataTypes.STRING(125)
        },
        site: {
            type: DataTypes.STRING(125)
        },
        frente: {
            type: DataTypes.STRING(125)
        },
        fachada: {
            type: DataTypes.STRING(125)
        },
        created_at: {
          allowNull: false,
          type: DataTypes.DATEONLY 
        },
        updated_at: {
          allowNull: false,
          type: DataTypes.DATEONLY 
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
  
    return Album;
  };