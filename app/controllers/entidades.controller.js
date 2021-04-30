const db = require("../models");
const Entidad = db.entidad;
const Permiso = db.permiso;
const User = db.user;
const Op = db.Op;

// Create and Save a new Book
exports.create = async (req, res) => {
  // Validate request
  if (!req.body.empresa) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }
  // Create 
  const body={};
  if(req.files['filename']){
    const { filename } = req.files['filename'][0]
    body.imagen= `http://localhost:5000/public/${filename}`;
    console.log(body.imagen);
  }
  body.nombre= req.body.nombre;
  body.apellido= req.body.apellido;
  body.email= req.body.email;
  body.telefono= req.body.telefono;
  body.empresa= req.body.empresa;
  body.pagina= req.body.pagina;
  body.nit= req.body.nit;
  body.telefono_empresa= req.body.telefono_empresa;
  body.direccion= req.body.direccion;
  body.categorias=req.body.categorias;
  body.valor_contrato= req.body.valor_contrato;
  body.requiere_presupuesto= req.body.requiere_presupuesto;
  body.presupuesto= req.body.presupuesto;
  body.aviso= req.body.aviso;

  // Save in database
await  Entidad.create(body)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "No se pudo crear esta entidad."
      });
    });
};


exports.findAll = async (req, res) => {

 await   Entidad.findAndCountAll({
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
exports.findOne = async (req, res) => {
  const id = req.params.id;

 await Entidad.findByPk(id)
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
  const body={};
  if(req.files['filename']){
    const { filename } = req.files['filename'][0]
    body.imagen= `http://localhost:5000/public/${filename}`;
  
  }
  body.nombre= req.body.nombre;
  body.apellido= req.body.apellido;
  body.email= req.body.email;
  body.telefono= req.body.telefono;
  body.empresa= req.body.empresa;
  body.pagina= req.body.pagina;
  body.nit= req.body.nit;
  body.telefono_empresa= req.body.telefono_empresa;
  body.direccion= req.body.direccion;
  body.categorias=req.body.categorias;
  body.valor_contrato= req.body.valor_contrato;
  body.requiere_presupuesto= req.body.requiere_presupuesto;
  body.presupuesto= req.body.presupuesto;
  body.aviso= req.body.aviso;
 await Entidad.update( body,
    {
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
  Entidad.destroy({
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


exports.create_permiso = (req, res) => {
  // Validate request
  if (!req.body.uid) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }
  // Create a Book
  const permiso = {
    uid: req.body.uid,
    eid: req.body.eid,
  };

  // Save Book in database
  Permiso.create(permiso)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "ocurrio un erro para crear el permismo."
      });
    });
};

exports.findAll_permisos = (req, res) => {
  const id = req.body.id;
  Permiso.findAll({
  limit: 3000000,
  offset: 0,
  where: { eid: id }, // conditions
  order: [
    ['id', 'DESC'],
  ],
  include: [{
    model: User,
    attributes:['nombre', 'apellido', 'tipo','email' ],
  }, 
  {
    model: Entidad,
    attributes:['empresa', 'nit', 'imagen' ],
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


exports.delete_permiso = (req, res) => {
  console.log(req)
  const id = req.body.id;
  Permiso.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Permiso borrado satisfactoriamente!"
        });
      } else {
        res.send({
          message: `No se pudo borrar el permiso con el id=${id}. Tal vez no existe!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "No se pudo borrar el permiso con el id=" + id
      });
    });
};