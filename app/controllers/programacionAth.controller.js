const db = require("../models");
const ProgramacionAth = db.programacion_ath;
const Cajero = db.cajero_ath;
const Entidad = db.entidad;
const User = db.user;
const Ciudad = db.ciudad;
const Gestion = db.gestionAth;
const Sac = db.sacAth;
const Notificacion = db.notificacion;
const Legalizaciones = db.legalizacionAth;
const Op = db.Op;

// Create and Save a new Book
exports.create = (req, res) => {
  // Validate request
  if (!req.body.id_cajero) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }
  // Create a Book
  const program = {
    fecha_vencimiento: req.body.fecha_vencimiento,
    prioridad: req.body.prioridad,
    categoria: req.body.categoria,
    subcategoria: req.body.subcategoria,
    tipo_llamada: req.body.tipo_llamada,
    llamada: req.body.llamada,
    margen: req.body.margen,
    titulo: req.body.titulo,
    descripcion: req.body.descripcion,
    codigo_cajero: req.body.codigo_cajero,
    tipo_servicio: req.body.tipo_servicio,
    requiere_cita: req.body.requiere_cita,
    subcateogoria: req.body.subcateogoria,
    id_cajero: req.body.id_cajero,
    coordinador_id:req.userId,
  };

  // Save Book in database
  ProgramacionAth.create(program)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Book."
      });
    });
};


exports.findAll = async (req, res) => {

await ProgramacionAth.findAndCountAll({
    limit: 3000000,
    offset: 0,
    where: {}, // conditions
    order: [
      ['id', 'DESC'],
    ],
    include: [{
      model: User, as: 'Tecnico_ath',
      attributes:['nombre', 'apellido','imagen' ],
    }, 
    {
      model: User, as: 'Coordinador',
      attributes:['nombre', 'apellido','imagen' ],
    }, 
    {
      model: Legalizaciones,
    },
    {
      model: Gestion,
    },
    {
      model: Cajero,
      attributes:[ 'codigo','regional_id'],
      include: [{ model: Ciudad,attributes:[ 'ciudad'] },{ model: Entidad,attributes:[ 'imagen','id'] }
      
      ]
    }],
  }) 
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.send(500).send({
        message: err.message || "Ocurrio un erro al intentar acceder a este recursos."
      });
    });
};







exports.find = async (req, res) => {
  const id= req.body.id;
  await  ProgramacionAth.findAll({
      limit: 3000000,
      offset: 0,
      where: {id:id}, // conditions
      order: [
        ['id', 'DESC'],
      ],
      include: [{
        model: User, as: 'Tecnico_ath',
        attributes:['nombre', 'apellido','imagen','codigo','direccion','telefono','email','tipo_tecnico'  ],
      }, 
      {
        model: User, as: 'Coordinador',
        attributes:['nombre', 'apellido','imagen' ],
      }, 
      {
        model: Legalizaciones,
      },
      {
        model: Gestion,
      },
      {
        model: Sac,
      },
      {
        model: Cajero,
        attributes:[ 'codigo'],
        include: [
          { model: Ciudad,attributes:[ 'ciudad','regional_id'] },
          { model: Entidad,attributes:[ 'imagen','id'] },
        ]
      }],
    }) 
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.send(500).send({
          message: err.message || "Ocurrio un erro al intentar acceder a este recursos."
        });
      });
  };
  

  exports.findPendientes = async (req, res) => {
    await  ProgramacionAth.findAll({
        limit: 3000000,
        offset: 0,
        where: {
            tecnico_id:req.userId,
            estado_pago:"Pendiente"
            }, // conditions
        order: [
          ['id', 'DESC'],
        ],
        attributes:[ 'id','total_tecnico','estado_pago'],
        include: [],
      }) 
        .then(data => {
          res.send(data);
        })
        .catch(err => {
          res.send(500).send({
            message: err.message || "Ocurrio un erro al intentar acceder a este recursos."
          });
        });
    };


// Find a single with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  ProgramcionAth.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: `erro al editar el cargo= ${id}`
      });
    });
};

// Update a Book by the id in the request
exports.update = (req, res) => {

  const id = req.body.id;
  const program = {
    fecha_vencimiento: req.body.fecha_vencimiento,
    prioridad: req.body.prioridad,
    categoria: req.body.categoria,
    subcategoria: req.body.subcategoria,
    tipo_llamada: req.body.tipo_llamada,
    llamada: req.body.llamada,
    titulo: req.body.titulo,
    margen: req.body.margen,
    descripcion: req.body.descripcion,
    codigo_cajero: req.body.codigo_cajero,
    tipo_servicio: req.body.tipo_servicio,
    requiere_cita: req.body.requiere_cita,
    subcateogoria: req.body.subcateogoria,
    id_cajero: req.body.id_cajero,
  };
  ProgramacionAth.update(program,{
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "editado satisfactoriamente."
        });
      } else {
        res.send({
          message: `No puede editar la programacion con el  el =${id}. Tal vez no existe o la peticion es vacia!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error al intentar editar la programacion con el id=" + id
      });
    });
};


exports.programar = async (req, res) => {
  const id = req.body.id;
  const program = {
    vencimiento_tecnico: req.body.vencimiento_tecnico,
    tecnico_id: req.body.tecnico_id,
    codigo_tecnico: req.body.codigo_tecnico,
    status: req.body.status,
  };
 await ProgramacionAth.update(program,{
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
            // Create 

            const datos = {
              titulo: `Programción ATH (${req.body.status})`,
              descripcion: `Programción ${req.body.status} para la fecha ${req.body.vencimiento_tecnico}`,
              origen: "",
              modulo: "llamadas",
              icon: "ri-calendar-line",
              color: "avatar-title bg-primary rounded-circle font-size-16",
              uid: req.body.tecnico_id,
              canal: "",
            };
            CrearNotificacion(datos);
            res.send({
              message: "editado satisfactoriamente."
            });
      } else {
        res.send({
          message: `No puede editar la programacion con el  el =${id}. Tal vez no existe o la peticion es vacia!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error al intentar editar la programacion con el id=" + id
      });
    });
};


exports.escalar = async (req, res) => {
  const id = req.body.id;
  const program = {
    motivo_escalado: req.body.motivo_escalado,
    status:"Escalada",
  };
 await ProgramacionAth.update(program,{
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
            res.send({
              message: "editado satisfactoriamente."
            });
      } else {
        res.send({
          message: `No puede editar la programacion con el  el =${id}. Tal vez no existe o la peticion es vacia!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error al intentar editar la programacion con el id=" + id
      });
    });
};

exports.archivar = async (req, res) => {
  const id = req.body.id;
  const program = {
    motivo_archivado: req.body.motivo_archivado,
    status:"Archivada",
  };
 await ProgramacionAth.update(program,{
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
            res.send({
              message: "editado satisfactoriamente."
            });
      } else {
        res.send({
          message: `No puede editar la programacion con el  el =${id}. Tal vez no existe o la peticion es vacia!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error al intentar editar la programacion con el id=" + id
      });
    });
};

exports.cerrar = async (req, res) => {
  const id = req.body.id;
  const program = {
    motivo_cierre: req.body.motivo_cierre,
    status:"Cerrada",
  };
 await ProgramacionAth.update(program,{
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
            res.send({
              message: "editado satisfactoriamente."
            });
      } else {
        res.send({
          message: `No puede editar la programacion con el  el =${id}. Tal vez no existe o la peticion es vacia!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error al intentar editar la programacion con el id=" + id
      });
    });
};


exports.rechazar = async (req, res) => {
  const id = req.body.id;
  const program = {
    motivo_rechazo: req.body.motivo_rechazo,
    status:"Rechazada",
  };
 await ProgramacionAth.update(program,{
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
            res.send({
              message: "editado satisfactoriamente."
            });
            const datos = {
              titulo: `Programción ATH-${req.body.id} rechazada por técnico`,
              descripcion: `Motivo ${req.body.motivo_rechazo}`,
              origen: "",
              modulo: "llamadas_ATH",
              icon: "ri-close-fill",
              color: "avatar-title bg-danger rounded-circle font-size-16",
              uid: req.body.coordinador_id,
              canal: "",
            };
            CrearNotificacion(datos);
      } else {
        res.send({
          message: `No puede editar la programacion con el  el =${id}. Tal vez no existe o la peticion es vacia!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error al intentar editar la programacion con el id=" + id
      });
    });
};





async function CrearNotificacion(datos){
  // Save
  await  Notificacion.create(datos)
  .then( data => {
    notificar(data);
  })
  .catch(err => {
    res.status(500).send({
      message: err.message || "Some error occurred while creating the Book."
    });
    return;
  });
}

async function notificar(data){
await  User.findByPk(data.uid)
.then(datas => {
 console.log(datas);
 global.io.to(datas.canal).emit('cliente', data);
})
.catch(err => {
 res.status(500).send({
   message: `erro al editar el cargo= ${id}`
 });
});

}




// Delete a Book with the specified id in the request
exports.delete = (req, res) => {

  const id = req.body.id;
  ProgramacionAth.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Cargo borrado satisfactoriamente!"
        });
      } else {
        res.send({
          message: `No se pudo borrar el cargo con el id=${id}. Tal vez el cargo no existe!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "No se pudo borrar el cargo con el id=" + id
      });
    });
};


