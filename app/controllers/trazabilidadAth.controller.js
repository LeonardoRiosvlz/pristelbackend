const db = require("../models");
const Trazabilidad = db.trazabilidad_ath;
const Op = db.Op;

// Create and Save a new Book
exports.create = (req, res) => {
  // Validate request
  if (!req.body.tipo) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }
  // Create a Book
  const trazo = {
    tipo: req.body.tipo,
    descripcion: req.body.descripcion,
    fecha: req.body.fecha,
    estado: req.body.estado,
    mes: req.body.mes,
    user_id: req.userId,
    id_cajero: req.body.id_cajero
  };

  // Save Book in database
  Trazabilidad.create(trazo)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Book."
      });
    });
};


exports.findAll = (req, res) => {

  Trazabilidad.findAndCountAll({
    limit: 3000000,
    offset: 0,
    where: {}, // conditions
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

exports.trazos = (req, res) => {

    Trazabilidad.findAll({
      limit: 3000000,
      offset: 0,
      where: {id_cajero: req.body.id}, // conditions
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

  Trazabilidad.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: `erro al editar el Trazabilidad= ${id}`
      });
    });
};

// Update a Book by the id in the request
exports.update = (req, res) => {
  console.log(req)
  const id = req.body.id;

  Trazabilidad.update({
    tipo: req.body.tipo,
    descripcion: req.body.descripcion,
    fecha: req.body.fecha,
    estado: req.body.estado,
    mes: req.body.mes,
    user_id: req.userId,
    id_cajero: req.body.id_cajero
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
          message: `No puede editar el coargo con el  el =${id}. Tal vez el Trazabilidad no existe o la peticion es vacia!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error al intentar editar el Trazabilidad con el id=" + id
      });
    });
};

// Delete a Book with the specified id in the request
exports.delete = (req, res) => {
  console.log(req)
  const id = req.body.id;
  Trazabilidad.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Trazabilidad borrado satisfactoriamente!"
        });
      } else {
        res.send({
          message: `No se pudo borrar el Trazabilidad con el id=${id}. Tal vez el Trazabilidad no existe!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "No se pudo borrar el Trazabilidad con el id=" + id
      });
    });
};

// Delete all Books from the database.
exports.deleteAll = (req, res) => {
  Book.destroy({
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
  Book.findAll({ where: { published: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving books."
      });
    });
};
