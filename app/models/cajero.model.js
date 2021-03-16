module.exports = (sequelize, Sequelize, DataTypes) => {
    const Cajero = sequelize.define(
      "cajero", // Model name
      {
        // Model attributes
        id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true
        },
        nombre_atm: {
          type: DataTypes.STRING(30)
        },
        codigo_atm: {
          type: DataTypes.STRING(30)
        },
        centro_costo: {
            type: DataTypes.STRING(30)
        },
        tipo: {
            type: DataTypes.STRING(30)
        },
        departamento: {
            type: DataTypes.STRING(30)
        },
        oficina: {
            type: DataTypes.STRING(30)
        },
        ciudad: {
            type: DataTypes.STRING(30)
        },
        dep: {
            type: DataTypes.STRING(30)
        },
        entidad: {
            type: DataTypes.STRING(30)
        },
        ciudad: {
            type: DataTypes.STRING(30)
        },
        regional: {
            type: DataTypes.STRING(30)
        },
        direccion: {
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
  
    return Cajero;
  };
  