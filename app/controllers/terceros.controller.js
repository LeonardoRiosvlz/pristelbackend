const db = require("../models");
const Tercero = db.tercero;
const Op = db.Op;

// Create and Save a new Book
exports.create = (req, res) => {
  // Validate request
  if (!req.body.nombre_tercero) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }
  // Create 
  const tercero = {
    nombre_tercero: req.body.nombre_tercero,
    descripcion_tercero: req.body.descripcion_tercero,
  };

  // Save in database
  Tercero.create(tercero)
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

  Tercero.findAndCountAll({
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

// Find a single with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Tercero.findByPk(id)
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

  Tercero.update({
    nombre_tercero: req.body.nombre_tercero,
    descripcion_tercero: req.body.descripcion_tercero
    },{
    where: { id: id },
    order: [
      ['id', 'DESC'],
    ],
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
  Tercero.destroy({
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
