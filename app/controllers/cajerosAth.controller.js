const db = require("../models");
const CajerosAth = db.cajero_ath;
const Op = db.Op;

// Create and Save a new Book
exports.create = (req, res) => {
  // Validate request
  if (!req.body.codigo) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }
  // Create a Book
  const body = {
    tipo: req.body.tipo,
    codigo: req.body.codigo,
    tipologia: req.body.tipologia,
    terminal: req.body.terminal,
    direccion: req.body.direccion,
    ciudad: req.body.ciudad,
    regional: req.body.regional,
    site: req.body.site,
    comparte_site: req.body.comparte_site,
    cumpleanos: req.body.cumpleanos,
    administrado: req.body.administrado,
    tipo_site: req.body.tipo_site,
    cierre_nocturno: req.body.cierre_nocturno,
    apertura: req.body.apertura,
    cierre: req.body.cierre,
    aseo: req.body.aseo,
    dias_respuesta: req.body.dias_respuesta,
    id_entidad: req.body.id_entidad,

  };

  // Save Book in database
  CajerosAth.create(body)
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

    CajerosAth.findAndCountAll({
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
exports.find = (req, res) => {
  const codigo = req.body.codigo;
  CajerosAth.findAll({ where: { codigo: codigo } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving books."
      });
    });
};

// Update a Book by the id in the request
exports.update = (req, res) => {
  console.log(req)
  const id = req.body.id;
  CajerosAth.update({
    tipo: req.body.tipo,
    codigo: req.body.codigo,
    tipologia: req.body.tipologia,
    terminal: req.body.terminal,
    direccion: req.body.direccion,
    ciudad: req.body.ciudad,
    regional: req.body.regional,
    site: req.body.site,
    comparte_site: req.body.comparte_site,
    cumpleanos: req.body.cumpleanos,
    administrado: req.body.administrado,
    tipo_site: req.body.tipo_site,
    cierre_nocturno: req.body.cierre_nocturno,
    apertura: req.body.apertura,
    cierre: req.body.cierre,
    aseo: req.body.aseo,
    dias_respuesta: req.body.dias_respuesta,
    id_entidad: req.body.id_entidad,
    },{
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "editado satisfactoriamente :D."
        });
      } else {
        res.send({
          message: `No puede editar el cajero con el  el =${id}. Tal vez el cajero no existe o la peticion es vacia!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error al intentar editar el cajero con el id=" + id
      });
    });
};

// Delete a Book with the specified id in the request
exports.delete = (req, res) => {
  console.log(req)
  const id = req.body.id;
  CajerosAth.destroy({
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



// Find all published Books
exports.findAllPublished = (req, res) => {
    CajerosAth.findAll({ where: { published: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving books."
      });
    });
};
