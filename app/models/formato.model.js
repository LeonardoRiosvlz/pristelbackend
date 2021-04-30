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
        status: {
          type: DataTypes.ENUM('Pendiente','Aprobado','Rechazado'),
          defaultValue: 'Pendiente',
          unique: false
       },
       status_pago: {
        type: DataTypes.ENUM('','Pendiente','Cancelado'),
        defaultValue: '',
        unique: false
        },
        consecutivo: {
          type: DataTypes.STRING(15),
          unique: true
       },
       items: {
          type: DataTypes.JSON
        },
        otros: {
            type: DataTypes.STRING(20)
        }, 
        observacion: {
            type: DataTypes.STRING(255)
        },
        consecutivo: {
            type: DataTypes.STRING(15)
        },
        descripcion_formato: {
            type: DataTypes.STRING
        },
        valor: {
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
  