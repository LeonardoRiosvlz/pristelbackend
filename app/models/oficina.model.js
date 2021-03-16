module.exports = (sequelize, Sequelize, DataTypes) => {
    const Oficina = sequelize.define(
      "oficina", // Model name
      {
        // Model attributes
        id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true
        },
        nombre_oficina: {
          type: DataTypes.STRING(35)
        },
        ciudad_oficina: {
          type: DataTypes.STRING(25)
        },
        departamento_oficina: {
            type: DataTypes.STRING(35)
        },
        dep_oficina: {
            type: DataTypes.STRING(5)
        },
        codigo_oficina: {
            type: DataTypes.STRING(15)
        },
        region_oficina: {
            type: DataTypes.STRING(5)
        },
        direccion_oficina: {
            type: DataTypes.STRING(5)
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
  
    return Oficina;
  };
  