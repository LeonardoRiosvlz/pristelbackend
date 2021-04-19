const { suscripciones } = require("../models");
const db = require("../models");
const Conversacion = db.conversacion;
const Suscripciones = db.suscripciones;
const Mensajes = db.mensajes;
const User = db.user;
const Op = db.Op;

// Create and Save a new Book
exports.createSala = async (req, res) => {
    const uid = req.userId;
  // Validate request
  if (!req.body.titulo) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }
  // Create a Book
  const conv = {
    uid: uid,
    titulo: req.body.titulo,
  };

  // Save Book in database
 await Conversacion.create(conv)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Book."
      });
    });
};

// Create and Save a new Book
exports.mensajes = async (req, res) => {
  const uid = req.userId;
// Validate request
if (!req.body.texto) {
  res.status(400).send({
    message: "Content can not be empty!"
  });
  return;
}
// Create a Book
const conv = {
  uid: uid,
  texto: req.body.texto,
  id_conversacion: req.body.id_conversacion,
};

// Save Book in database
await Mensajes.create(conv)
  .then(data => {
    res.send(data); 
  })
  .catch(err => {
    res.status(500).send({
      message: err.message || "Some error occurred while creating the Book."
    });
  });
  
  await Suscripciones.findAll({
    where: {id_conversacion:req.body.id_conversacion}, // conditions
    order: [
      ['id', 'DESC'],
    ],
    include: [{
      model: User,
      attributes:['nombre', 'apellido', 'cargo','imagen','canal' ],
    }],
  })
    .then(data => {


      for (let index = 0; index < data.length; index++) {
       global.io.to(data[index].user.canal).emit('chat', req.userId);
      }
    })
    .catch(err => {
      res.send(500).send({
        message: err.message || "Some error accurred while retrieving books."
      });
    });
    await Conversacion.findAll({
      limit: 1,
      offset: 0,
      where: {id:req.body.id_conversacion}, // conditions
      order: [
        ['id', 'DESC'],
      ],
      include: [{
        model: User,
        attributes:['id', 'nombre', 'apellido', 'cargo','imagen','canal' ],
      }],
    })
      .then(data => {
      for (let index = 0; index < data.length; index++) {
        global.io.to(data[index].user.canal).emit('chat', req.userId);
       }
      })
      .catch(err => {
        res.send(500).send({
          message: err.message || "Some error accurred while retrieving books."
        });
      });

};


// Create and Save a new Book
exports.suscribir =async (req, res) => {
  const uid = req.userId;
// Validate request
if (!req.body.uid) {
  res.status(400).send({
    message: "Content can not be empty!"
  });
  return;
}
// Create a Book
const sub = {
  uid: req.body.uid,
  id_conversacion: req.body.id_conversacion,
};

// Save Book in database
await Suscripciones.findOrCreate(
  {where: {uid: sub.uid, id_conversacion:sub.id_conversacion}, defaults: {}})
.then(data => {
  res.send(data);
})
.catch(err => {
  res.status(500).send({
    message: err.message || "Ocurrio un error."
  });
});
};


exports.findAll = async (req, res) => {
  const id = req.userId;
 await Conversacion.findAndCountAll({
    limit: 3000000,
    offset: 0,
    where: {uid:id}, // conditions
    order: [
      ['id', 'DESC'],
    ],
    include: [{
      model: User,
      attributes:['id', 'nombre', 'apellido', 'cargo','imagen' ],
    }],
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
exports.invitaciones = async (req, res) => {
  const id = req.userId;
  await Suscripciones.findAndCountAll({
    limit: 3000000,
    offset: 0,
    where: {uid:id}, // conditions
    order: [
      ['id', 'DESC'],
    ],
    include: [{
      model: Conversacion
    }],
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

exports.findSala = async (req, res) => {
  const id = req.body.id;
  const chat={};
 await Suscripciones.findAndCountAll({
    limit: 3000,
    offset: 0,
    where: {id_conversacion:id}, // conditions
    order: [
      ['id', 'DESC'],
    ],
    include: [{
      model: User,
      attributes:['nombre', 'apellido', 'cargo','imagen' ],
    }],
  })
    .then(data => {
      chat.subs=data;
    })
    .catch(err => {
      res.send(500).send({
        message: err.message || "Some error accurred while retrieving books."
      });
    });

   await Mensajes.findAndCountAll({
      limit: 3000,
      offset: 0,
      where: {id_conversacion:id}, // conditions
      order: [
        ['id', 'ASC'],
      ],
      include: [{
        model: User,
        attributes:['id','nombre', 'apellido', 'cargo','imagen' ],
      }],
    })
      .then(data => {
        chat.mensajes=data;
        res.send(chat);
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
  console.log(req)
  const id = req.body.id;

 await Cargo.update({
    cargo: req.body.cargo,
    descripcion: req.body.descripcion
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
exports.delete = async (req, res) => {

  const id = req.body.id;
 await Conversacion.destroy({
    where: { id: id_conversacion }
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

exports.expulsar =async (req, res) => {
  console.log(req)
  const id = req.body.id;
 await Suscripciones.destroy({
    where: { id: id}
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: " Borrado satisfactoriamente!"
        });
      } else {
        res.send({
          message: `No se pudo borrar las suscripcion con el id=${id}. Tal vez el cargo no existe!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "No se pudo borrar la suscripcion con el id=" + id
      });
    });
};

exports.clear = async (req, res) => {
  console.log(req)
  const id = req.body.id_conversacion;
 await Mensajes.destroy({
    where: { id_conversacion: id}
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
 await Conversacion.destroy({
    where: {id:req.body.id_conversacion},
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

// Find all published Books
exports.findAllPublished =async (req, res) => {
 await Book.findAll({ where: { published: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving books."
      });
    });
};



