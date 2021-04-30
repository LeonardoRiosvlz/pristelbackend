const db = require("../models");
const ProgramacionAth = db.programacion_ath;
const Cajero = db.cajero_ath;
const Entidad = db.entidad;
const User = db.user;
const Ciudad = db.ciudad;
const Op = db.Op;

// Create and Save a new Book
exports.create = (req, res) => {
  // Validate request
  if (!req.body.id_cajero) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }
  // Create a Book
  const program = {
    fecha_vencimiento: req.body.fecha_vencimiento,
    prioridad: req.body.prioridad,
    categoria: req.body.categoria,
    tipo_llamada: req.body.tipo_llamada,
    llamada: req.body.llamada,
    titulo: req.body.titulo,
    descripcion: req.body.descripcion,
    codigo_cajero: req.body.codigo_cajero,
    tipo_servicio: req.body.tipo_servicio,
    requiere_cita: req.body.requiere_cita,
    subcateogoria: req.body.subcateogoria,
    id_cajero: req.body.id_cajero,
  };

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


exports.findAll = async (req, res) => {

await  ProgramacionAth.findAndCountAll({
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
      attributes:[ 'codigo','regional_id'],
      include: [{ model: Ciudad,attributes:[ 'ciudad'] },{ model: Entidad,attributes:[ 'imagen'] }
      
      ]
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


exports.find = async (req, res) => {
  const id= req.body.id;
  await  ProgramacionAth.findAll({
      limit: 3000000,
      offset: 0,
      where: {id:id}, // conditions
      order: [
        ['id', 'DESC'],
      ],
      include: [{
        model: User,
        attributes:['nombre', 'apellido', 'tipo','email' ],
      }, 
      {
        model: Cajero,
        attributes:[ 'codigo'],
        include: [
          { model: Ciudad,attributes:[ 'ciudad','regional_id'] },
          { model: Entidad,attributes:[ 'imagen'] },
        ]
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
    fecha_vencimiento: req.body.fecha_vencimiento,
    prioridad: req.body.prioridad,
    categoria: req.body.categoria,
    tipo_llamada: req.body.tipo_llamada,
    llamada: req.body.llamada,
    titulo: req.body.titulo,
    descripcion: req.body.descripcion,
    codigo_cajero: req.body.codigo_cajero,
    tipo_servicio: req.body.tipo_servicio,
    requiere_cita: req.body.requiere_cita,
    subcateogoria: req.body.subcateogoria,
    id_cajero: req.body.id_cajero,
  };
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


