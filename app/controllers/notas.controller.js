const db = require("../models");
const Notas = db.notas;
const User = db.user;
const Notificacion = db.notificacion;
const Op = db.Op;

// Create and Save a new Book
exports.create = async (req, res) => {
  // Validate request
  if (!req.body.texto) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }
  // Create a Book
  const body = {
    texto: req.body.texto,
    consecutivo: req.body.consecutivo,
    entidad_id: req.body.entidad_id,
    user_id: req.userId,
  };
  if (req.userId==req.body.tecnico_id) {
    body.uid=req.body.coordinador_id
  }else{
    body.uid=req.body.tecnico_id
  }

  // Save Book in database
await  Notas.create(body)
    .then(data => {
      res.send(data);
      const datos = {
        titulo: `Nota consecutivo  ${req.body.consecutivo}`,
        descripcion: `${req.body.texto}`,
        origen: "",
        modulo: "llamadas_ATH",
        icon: "ri-file-text-line",
        color: "avatar-title bg-info rounded-circle font-size-16",
        uid: body.uid,
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


exports.find = async (req, res) => {

 await Notas.findAll({
    limit: 3000000,
    offset: 0,
    where: {
      consecutivo:req.body.consecutivo,
      entidad_id:req.body.entidad_id
    }, // conditions
    include: [{
      model: User,
      attributes:['nombre', 'apellido', 'cargo'],
    }],
    order: [
      ['id', 'DESC'],
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
exports.findOne = async (req, res) => {
  const id = req.params.id;

 await Notas.findByPk(id)
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
exports.update = async (req, res) => {

  const id = req.body.id;

 await Notas.update({
    texto: req.body.texto
    },{
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "editado satisfactoriamente."
        });
      } else {
        res.send({
          message: `No se pudo editar la nota con el id =${id}. Tal vez no existe o la peticion es vacia!`
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
exports.delete = async (req, res) => {

  const id = req.body.id;
await  Notas.destroy({
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

// Delete all Books from the database.
exports.deleteAll = async (req, res) => {
await  Notas.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Books were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while removing all books."
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
 global.io.to(datas.canal).emit('cliente', data);
})
.catch(err => {
 res.status(500).send({
   message: `erro al editar el cargo= ${id}`
 });
});

}

