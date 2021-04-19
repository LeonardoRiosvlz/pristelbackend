const db = require("../models");
const Notificacion = db.notificacion;
const User = db.user;
const Op = db.Op;






// Create and Save a new Book
exports.create = (req, res) => {
  // Validate request
  if (!req.body.titulo) {
    res.status(400).send({
      message: "No puede ser vacio!"
    });
    return;
  }
  // Create 
  const data = {
    titulo: req.body.titulo,
    descripcion: req.body.descripcion,
    origen: req.body.origen,
    modulo: req.body.modulo,
    uid: req.body.uid,
    canal: req.body.canal,
  };

  // Save
  Notificacion.create(data)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Book."
      });
      return;
    });
    User.findByPk(req.body.uid)
    .then(datas => {
      global.io.to(datas.canal).emit('cliente', data);
    })
    .catch(err => {
      res.status(500).send({
        message: `erro al editar el cargo= ${id}`
      });
    });
};


exports.findAll = (req, res) => {
  const id = req.userId;
  console.log(id);
  Notificacion.findAndCountAll({
    limit: 3000000,
    offset: 0,
    where: {
      uid:req.userId
    }, // conditions
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
exports.findOne = (req, res) => {
  const id = req.params.id;

  Notificacion.findByPk(id)
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
  console.log(req)
  const id = req.body.id;

  Notificacion.update({
    titulo: req.body.titulo,
    descripcion: req.body.descripcion,
    origen: req.body.origen,
    modulo: req.body.modulo,
    uid: req.body.uid,
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
exports.delete = (req, res) => {
  console.log(req)
  const id = req.body.id;
  Notificacion.destroy({
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
exports.deleteAll = (req, res) => {
    Notificacion.destroy({
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

// Find all published Books
exports.findAllPublished = (req, res) => {
    Notificacion.findAll({ where: { published: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving books."
      });
    });
};