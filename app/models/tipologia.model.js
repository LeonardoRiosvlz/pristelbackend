module.exports = (sequelize, Sequelize, DataTypes) => {
    const Tipologia = sequelize.define(
      "tipologia", // Model name
      {
        // Model attributes
        id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true
        },
        nombre: {
            type: DataTypes.STRING(30)
        },
        aseo_diario: {
          type: DataTypes.STRING(30)
        },
        aseo_fs: {
            type: DataTypes.STRING(30)
        },
        aseo_lv: {
            type: DataTypes.STRING(30)
        },
        aseo_ls: {
            type: DataTypes.STRING(30)
        },
        apertura_cierre: {
            type: DataTypes.STRING(30)
        },
        mantenimiento: {
            type: DataTypes.STRING(30)
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
  
    return Tipologia;
  };
  