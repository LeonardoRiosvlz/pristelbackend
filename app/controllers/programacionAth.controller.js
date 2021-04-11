const db = require("../models");
const ProgramacionAth = db.programacion_ath;
const Cajero = db.cajero_ath;
const User = db.user;
const Op = db.Op;

// Create and Save a new Book
exports.create = (req, res) => {
  // Validate request
  if (!req.body.consecutivo) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }
  // Create a Book
  const program = {
    consecutivo: req.body.consecutivo,
    descripcion: req.body.descripcion,
    codigo_tecnico: req.body.codigo_tecnico,
    id_tecnico: req.body.id_tecnico,
    llamada: req.body.llamada,
    codigo_cajero: req.body.codigo_cajero,
    cotizacion_visita: req.body.cotizacion_visita,
    fecha_llamada: req.body.fecha_llamada,
    fecha_vencimiento: req.body.fecha_vencimiento,
    requiere_producto: req.body.requiere_producto,
    fecha_iluminacion: req.body.fecha_iluminacion,
    servicio_cobro: req.body.servicio_cobro,
    codigo_parametro: req.body.codigo_parametro,
    parametro_labor: req.body.parametro_labor,
    id_cajero: req.body.id_cajero,
  };
  if (req.body.fecha_visita) {
      program.fecha_visita=req.body.fecha_visita
  }
  if (req.body.fecha_programacion) {
    program.fecha_programacion=req.body.fecha_programacion
  }
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


exports.findAll = (req, res) => {

  ProgramacionAth.findAndCountAll({
    limit: 3000000,
    offset: 0,
    where: {}, // conditions
    order: [
      ['id', 'DESC'],
    ],
    include: [{
      model: User,
      attributes:['nombre', 'apellido', 'tipo','email' ],
    }, 
    {
      model: Cajero,
      attributes:['ciudad', 'codigo'],
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
  console.log(req)
  const id = req.body.id;
  const program = {
    consecutivo: req.body.consecutivo,
    descripcion: req.body.descripcion,
    codigo_tecnico: req.body.codigo_tecnico,
    id_tecnico: req.body.id_tecnico,
    llamada: req.body.llamada,
    codigo_cajero: req.body.codigo_cajero,
    cotizacion_visita: req.body.cotizacion_visita,
    fecha_llamada: req.body.fecha_llamada,
    fecha_vencimiento: req.body.fecha_vencimiento,
    requiere_producto: req.body.requiere_producto,
    fecha_iluminacion: req.body.fecha_iluminacion,
    servicio_cobro: req.body.servicio_cobro,
    codigo_parametro: req.body.codigo_parametro,
    parametro_labor: req.body.parametro_labor,
    id_cajero: req.body.id_cajero,
  };
  if (req.body.fecha_visita) {
      program.fecha_visita=req.body.fecha_visita
  }
  if (req.body.fecha_programacion) {
    program.fecha_programacion=req.body.fecha_programacion
  }
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

// Delete a Book with the specified id in the request
exports.delete = (req, res) => {
  console.log(req)
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


