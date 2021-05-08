const { notificacion } = require("../models");
const db = require("../models");
const Formato = db.formato;
const User = db.user;
const Tecnico = db.user;
const Tercero = db.tercero;
const Entidad = db.entidad;
const Abono = db.abonos;
const Notificacion = db.notificacion;
const Op = db.Op;

// Create and Save a new Book
exports.create =async (req, res) => {
  // Validate request
  if (!req.body.consecutivo) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }
  // Create a Book
  const formato = {
    pago_terceros: req.body.pago_terceros,
    consecutivo: req.body.consecutivo,
    otros: req.body.otros,
    observacion: req.body.observacion,
    descripcion_formato: req.body.descripcion_formato,
    items: req.body.items,
    valor: req.body.valor,
    codigo_tecnico: req.body.codigo_tecnico,
    tecnico_id: req.body.tecnico_id,
    autorizador_id: req.body.autorizador_id,
    entidad_id: req.body.entidad_id,
    solicitante_id: req.userId,
  };
  if (req.body.tercero_id) {
    formato.tercero_id= req.body.tercero_id;
  }

  // Save Book in database
 await Formato.create(formato)
    .then(data => {
      res.send(data);
      
      const datos = {
        titulo: "F.S.T.",
        descripcion: `Nueva solicitud de transferencia  para el consecvutivo ${formato.consecutivo}`,
        origen: "",
        modulo: "fst",
        icon: "ri-coins-line",
        color: "avatar-title bg-primary rounded-circle font-size-16",
        uid: req.body.autorizador_id,
        canal: "",
      };
      CrearNotificacion(datos);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Book."
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



exports.findAll = async (req, res) => {

 await Formato.findAndCountAll({
    limit: 3000000,
    offset: 0,
    where: {}, // conditions
    order: [
      ['id', 'DESC'],
    ],
    include: [  
    { model: User, as: 'Tecnico',
      attributes:['id', 'nombre', 'apellido', 'codigo']
    },
    { model: User, as: 'Autorizador',
    attributes:['id', 'nombre', 'apellido']
    },
    { model: User, as: 'Solicitante',
      attributes:['id', 'nombre', 'apellido']
    },
    {
      model: Tercero,
      attributes:['nombre_tercero']
    },
    {
      model: Entidad,
      attributes:['empresa']
   },
    ],
  })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.send(500).send({
        message: err.message || "Some error accurred while retrieving books."
      });
    });
};


exports.find = async (req, res) => {
  const Consecutivo= req.body.consecutivo;
  await Formato.findAndCountAll({
     limit: 3000000,
     offset: 0,
     where: {consecutivo:Consecutivo}, // conditions
     order: [
       ['id', 'DESC'],
     ],
     include: [  
     { model: User, as: 'Tecnico',
       attributes:['id', 'nombre', 'apellido', 'codigo']
     },
     { model: User, as: 'Autorizador',
     attributes:['id', 'nombre', 'apellido']
     },
     { model: User, as: 'Solicitante',
       attributes:['id', 'nombre', 'apellido']
     },
     {
       model: Tercero,
       attributes:['nombre_tercero']
     },
     {
      model: Abono
    },
     {
       model: Entidad,
       attributes:['empresa']
    },
     ],
   })
     .then(data => {
       res.send(data);
     })
     .catch(err => {
       res.send(500).send({
         message: err.message || "Some error accurred while retrieving books."
       });
     });
 };
 

// Find a single with an id
exports.findOne =async (req, res) => {
  const id = req.params.id;

 await Cargo.findByPk(id)
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
exports.update =async (req, res) => {
  console.log(req.body.id);
 await Formato.update({
  pago_terceros: req.body.pago_terceros,
  consecutivo: req.body.consecutivo,
  otros: req.body.otros,
  observacion: req.body.observacion,
  descripcion_formato: req.body.descripcion_formato,
  items: req.body.items,
  valor: req.body.valor,
  codigo_tecnico: req.body.codigo_tecnico,
  tecnico_id: req.body.tecnico_id,
  autorizador_id: req.body.autorizador_id,
  entidad_id: req.body.entidad_id,
  solicitante_id: req.userId,
},{ where: { id: req.body.id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "editado satisfactoriamente."
        });
      } else {
        res.send({
          message: `No puede editar el tal vez el cargo no existe o la peticion es vacia!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error al intentar editar el cargo con el id=" + id
      });
    });
};


// Update a Book by the id in the request
exports.status =async (req, res) => {
 await Formato.update({
  observacion: req.body.observacion,
  status: req.body.status,
},{ where: { id: req.body.id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "editado satisfactoriamente."
        });
        if (req.body.status==="Aprobado") {
          const datos = {
            titulo: "F.S.T. APROBADO ",
            descripcion: `Su solicitud de transferencia para el consecutivo ${req.body.consecutivo} fue aprobada`,
            origen: "",
            modulo: "fst",
            icon: "ri-check-double-line",
            color: "avatar-title bg-success rounded-circle font-size-16",
            uid: req.body.solicitante_id,
            canal: "",
          };
          CrearNotificacion(datos);
        }else{
          const datos = {
            titulo:`F.S.T. RECHAZADA CONSECUTIVO-${req.body.consecutivo}`,
            descripcion: `Motivo: ${req.body.observacion}`,
            origen: "",
            modulo: "fst",
            icon: "ri-close-line",
            color: "avatar-title bg-danger rounded-circle font-size-16",
            uid: req.body.solicitante_id,
            canal: "",
          };
          CrearNotificacion(datos);
        }
      } else {
        res.send({
          message: `No puede editar el coargo con el  el =${id}. Tal vez el cargo no existe o la peticion es vacia!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error al intentar editar el cargo con el id=" + id
      });
    });
};



// Delete a Book with the specified id in the request
exports.delete =async (req, res) => {
  console.log(req)
  const id = req.body.id;
 await Formato.destroy({
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

