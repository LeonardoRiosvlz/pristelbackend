const db = require("../models");
const Sac = db.sacAth;
const Programación = db.programacion_ath;
const Op = db.Op;

// Create and Save a new Book
exports.create = async (req, res) => { 
  if (req.body.aplica_sac==="Aplica") {
  // Validate request
  if (!req.body.items) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }
  // Create a Book
  const book = {
    id_programacion: req.body.id,
    observacion: req.body.motivo_cierre,
    items: req.body.items,
    total: req.body.total,
  };

  // Save Book in database
 await Sac.create(book)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Book."
      });
    });
    Programación.update({
        status: "Cerrada",
        motivo_cierre: req.body.motivo_cierre,
        aplica_sac: req.body.aplica_sac,
        total_tecnico: req.body.total_tecnico,
        },{
        where: { id: req.body.id, }
      })
    }else{
      await Programación.update({
        status: "Cerrada",
        motivo_cierre: req.body.motivo_cierre,
        aplica_sac: req.body.aplica_sac,
        total_tecnico: req.body.total_tecnico,
        },{
        where: { id: req.body.id, }
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
    }
};


exports.findAll = (req, res) => {

  Sac.findAndCountAll({
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

  Cargo.findByPk(id)
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
  if (req.body.aplica_sac==="Aplica") {

 await   Sac.update({
      id_programacion: req.body.id,
      observacion: req.body.motivo_cierre,
      items: req.body.items,
      total: req.body.total,
      },{
      where: { id_programacion: req.body.id}
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
      Programación.update({
        status: "Cerrada",
        motivo_cierre: req.body.motivo_cierre,
        aplica_sac: req.body.aplica_sac,
        total_tecnico: req.body.total_tecnico,
        },{
        where: { id: req.body.id, }
      })
   }else{
    const id = req.body.id;
  await  Sac.destroy({
      where: { id_programacion: req.body.id }
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
      Programación.update({
        status: "Cerrada",
        motivo_cierre: req.body.motivo_cierre,
        aplica_sac: req.body.aplica_sac,
        total_tecnico: req.body.total_tecnico,
        },{
        where: { id: req.body.id, }
      })
  }

};

// Delete a Book with the specified id in the request
exports.delete = (req, res) => {
  console.log(req)
  const id = req.body.id;
  Cargo.destroy({
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
