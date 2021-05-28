module.exports = (sequelize, Sequelize, DataTypes) => {
    const ProgramacionAth = sequelize.define(
      "programacion_ath", // Model name
      {
        // Model attributes
        id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true
        },
        consecutivo: {
           type: DataTypes.STRING(15),
           unique: true
        },
        categoria: {
          type: DataTypes.STRING(25),
        },
        titulo: {
          type: DataTypes.STRING(45),
        },
        subcategoria: {
          type: DataTypes.STRING(25),
        },
        consecutivo: {
            type: DataTypes.STRING(15),
            unique: true
        },
        codigo_tecnico: {
            type: DataTypes.STRING(15)
        },
        codigo_cajero: {
            type: DataTypes.STRING(15)
        },
        tipo_llamada: {
          type: DataTypes.STRING(15) 
        },
        llamada: {
            type: DataTypes.STRING(15)
        },
        tipo_servicio: {
          type: DataTypes.STRING(100)
        },
        prioridad: {
          type: DataTypes.STRING(20)
        },
        margen: {
          type: DataTypes.STRING(20)
        },
        estado_pago: {
          type: DataTypes.ENUM('No aplica','Pendiente','Listado',),
          unique: false
        },
        motivo_escalado: {
          type: DataTypes.STRING
        },
        motivo_rechazo: {
          type: DataTypes.STRING
        },   
        motivo_archivado: {
          type: DataTypes.STRING
        },   
        motivo_cierre: {
          type: DataTypes.STRING
        },  
        fecha_creacion: {
          allowNull: true,
          type: DataTypes.DATE
        },
        requiere_cita: {
            type: DataTypes.ENUM('Si','No'),
            unique: false
        },
        status: {
            type: DataTypes.ENUM('Creada','Programada','Archivada','Reprogramada','Escalada','Suspendida','Devuelta','Aceptada','Rechazada','Legalizada','Cumplida','En proceso','Vencida','Cerrada'),
            defaultValue: 'Creada',
            unique: false
        }, 
        aplica_sac: {
          type: DataTypes.ENUM('','Aplica','No aplica'),
          unique: false
        },
        total_tecnico: {
          type: DataTypes.STRING(20)
         },
        fecha_vencimiento: {
            allowNull: true,
            type: DataTypes.DATE
        },
        fecha_cierre: {
          allowNull: true,
          type: DataTypes.DATE
        },
        vencimiento_tecnico: {
          allowNull: true,
          type: DataTypes.DATE
        },
        descripcion: {
            type: DataTypes.STRING
        },
        observacion_cierre: {
          type: DataTypes.STRING
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
  
    return ProgramacionAth;
  };
  