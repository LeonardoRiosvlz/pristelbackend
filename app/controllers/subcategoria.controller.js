const db = require("../models");
const Subcategoria = db.subcategoria;
const Op = db.Op;

// Create and Save a new Book
exports.create = async (req, res) => {
  // Validate request
  if (!req.body.subcategoria) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }
  // Create 
  const body = {
    subcategoria: req.body.subcategoria,
    descripcion: req.body.descripcion,
    categoria: req.body.categoria,
  };

  // Save in database
 await Subcategoria.create(body)
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

await Subcategoria.findAndCountAll({
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


exports.find = async (req, res) => {
    const categoria = req.body.categoria;
    await Subcategoria.findAndCountAll({
        limit: 3000000,
        offset: 0,
        where: {categoria:categoria}, // conditions
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

  await Subcategoria.findByPk(id)
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
  console.log(req)
  const id = req.body.id;

  await Subcategoria.update({
    subcategoria: req.body.subcategoria,
    descripcion: req.body.descripcion,
    categoria: req.body.categoria,
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
exports.delete = async (req, res) => {
  console.log(req)
  const id = req.body.id;
  await Subcategoria.destroy({
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
