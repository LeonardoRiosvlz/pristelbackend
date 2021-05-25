module.exports = (sequelize, Sequelize, DataTypes) => {
    const Formato = sequelize.define(
      "sac_ath", // Model name
      {
        // Model attributes
        id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true
        },
        status: {
          type: DataTypes.ENUM('Pendiente','Cancelado','Archivado'),
          defaultValue: 'Pendiente',
          unique: false
       },
        items: {
          type: DataTypes.JSON
        },
        total: {
            type: DataTypes.STRING(20)
        }, 
        observacion: {
            type: DataTypes.STRING(255)
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
  