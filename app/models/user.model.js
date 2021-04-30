module.exports = (sequelize, Sequelize, DataTypes) => {
  const User = sequelize.define(
    "user", // Model name
    {
      // Attributes
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
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
      regional: {
        type: DataTypes.STRING(5),
        unique: false
      },
      sexo: {
        type: DataTypes.ENUM('Masculino', 'Femenino'),
        unique: false
      },
      status: {
        type: DataTypes.ENUM('activo', 'inactivo'),
        unique: false
      },
      entidad: {
        type: DataTypes.ENUM('Si','No'),
        unique: false
      },
      tipo_tecnico: {
        type: DataTypes.ENUM('Nomina', 'Contratista'),
        unique: false
      },
      tipo_cuenta: {
        type: DataTypes.ENUM('Ahorro', 'Corriente'),
        unique: false
      },
      canal: {
        type: DataTypes.STRING(25),
        unique: false
      },
      cedula: {
        type: DataTypes.STRING,
        unique: false
      },
      nombre_cuenta: {
        type: DataTypes.STRING,
        unique: false
      },
      cuenta: {
        type: DataTypes.STRING,
        unique: false
      },
      cargo: {
        type: DataTypes.STRING,
        unique: false
      },
      tipo: {
        type: DataTypes.STRING
      },   
      direccion: {
        type: DataTypes.STRING,
        unique: false
      }, 
      imagen: {
        type: DataTypes.STRING,
        unique: false
      },   
      email: {
        type: DataTypes.STRING
      },
      firma: {
        type: DataTypes.STRING
      },
      dependencia: {
        type: DataTypes.STRING(5)
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
