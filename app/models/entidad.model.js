module.exports = (sequelize, Sequelize, DataTypes) => {
    const Entidad = sequelize.define(
      "entidad", // Model name
      {
        // Model attributes
        id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true
        },
        nombre: {
          type: DataTypes.STRING(60)
        },
        apellido: {
          type: DataTypes.STRING(60)
        },
        email: {
            type: DataTypes.STRING(60)
        },
        telefono: {
            type: DataTypes.STRING(60)
        },
        empresa: {
            type: DataTypes.STRING(25)
        },
        pagina: {
            type: DataTypes.STRING(60)
        },
        nit: {
            type: DataTypes.STRING(60)
        },
        telefono_empresa: {
            type: DataTypes.STRING(60)
        },
        direccion: {
            type: DataTypes.STRING(60)
        },
        categorias: {
            type: DataTypes.JSON
        },
        valor_contrato: {
            type: DataTypes.STRING(60)
        },
        requiere_presupuesto: {
            type: DataTypes.ENUM('Si','No'),
            unique: false
        },
        presupuesto: {
            type: DataTypes.STRING(60)
        },
        aviso: {
            type: DataTypes.STRING(25)
        },
        imagen: {
          type: DataTypes.STRING(120)
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
  
    return Entidad;
  };
  