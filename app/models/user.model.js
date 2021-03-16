module.exports = (sequelize, Sequelize, DataTypes) => {
  const User = sequelize.define(
    "user", // Model name
    {
      // Attributes
      id: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
      },
      username: {
        type: DataTypes.STRING,
        unique: true
      },
      nombre: {
        type: DataTypes.STRING,
        unique: false
      },
      apellido: {
        type: DataTypes.STRING,
        unique: false
      },
      telefono: {
        type: DataTypes.STRING,
        unique: false
      },
      codigo: {
        type: DataTypes.STRING,
        unique: false
      },
      sexo: {
        type: DataTypes.ENUM('Masculino', 'Femenino'),
        unique: false
      },
      entidad: {
        type: DataTypes.ENUM('Si','No'),
        unique: false
      },
      cargo: {
        type: DataTypes.STRING,
        unique: false
      },
      tipo: {
        type: DataTypes.STRING
      },   
      imagen: {
        type: DataTypes.STRING,
        unique: false
      },    
      email: {
        type: DataTypes.STRING
      },
      password: {
        type: DataTypes.STRING
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

  return User;
};
