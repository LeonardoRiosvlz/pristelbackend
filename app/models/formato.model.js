module.exports = (sequelize, Sequelize, DataTypes) => {
    const Formato = sequelize.define(
      "formato", // Model name
      {
        // Model attributes
        id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true
        },
        pago_terceros: {
            type: DataTypes.ENUM('Si','No'),
            unique: false
        },
        tercero_formato: {
         type: DataTypes.STRING(25)
        },
        otros: {
            type: DataTypes.STRING(20)
        },
        usuario_tecnico: {
          type: DataTypes.STRING(15)
        },
        entidad: {
            type: DataTypes.STRING(15)
        },
        created_at: {
          allowNull: false,
          type: DataTypes.DATE
        },
        consecutivo: {
            type: DataTypes.STRING(15)
        },
        descripcion_formato: {
            type: DataTypes.STRING
        },
        codigo_imputacion: {
            type: DataTypes.STRING
        },
        descripcion_codigo: {
            type: DataTypes.STRING
        },
        valor: {
            type: DataTypes.STRING(15)
        },
        usuario_autorizador: {
            type: DataTypes.STRING(15)
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
  
    return Formato;
  };
  