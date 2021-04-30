const db = require("../models");
const Ciudades = db.ciudad
const Regional = db.regional
const Op = db.Op;

// Create and Save a new Book
exports.create = async (req, res) => {
  // Validate request
  if (!req.body.regional_id) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }
  // Create a Book
  const body={};
  body.dep= req.body.dep;
  body.departamento= req.body.departamento;
  body.ciudad= req.body.ciudad;
  body.metrica_critico= req.body.metrica_critico;
  body.valor_critico= req.body.valor_critico;
  body.metrica_alto= req.body.metrica_alto;
  body.valor_alto= req.body.valor_alto;
  body.metrica_mediano= req.body.metrica_mediano;
  body.valor_mediano= req.body.valor_mediano;
  body.metrica_bajo= req.body.metrica_bajo;
  body.valor_bajo= req.body.valor_bajo;
  body.regional_id= req.body.regional_id;

  // Save Book in database
 await Ciudades.create(body)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Book."
      });
    });
};


exports.findFormato = async (req, res) => {
const id =req.body.id;
await  Ciudades.findAll({
    limit: 3000000,
    offset: 0,
    where: {formato_id: id}, // conditions
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


exports.findAll = async (req, res) => {
    const id =req.body.id;
    await  Ciudades.findAndCountAll({
        limit: 3000000,
        offset: 0,
        where: {}, // conditions
        order: [
          ['id', 'DESC'],
        ],
        include: [  
          {
            model: Regional,
            attributes:['id','nombre']
          }
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


    exports.findRegional = async (req, res) => {
      const id =req.body.id;
      await  Ciudades.findAll({
          limit: 3000000,
          offset: 0,
          where: { regional_id: id}, // conditions
          order: [
            ['id', 'DESC'],
          ]
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

 await Ciudades.findByPk(id)
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
  // Create a Book
  const id =req.body.id
  const body={};
  body.dep= req.body.dep;
  body.departamento= req.body.departamento;
  body.ciudad= req.body.ciudad;
  body.metrica_critico= req.body.metrica_critico;
  body.valor_critico= req.body.valor_critico;
  body.metrica_alto= req.body.metrica_alto;
  body.valor_alto= req.body.valor_alto;
  body.metrica_mediano= req.body.metrica_mediano;
  body.valor_mediano= req.body.valor_mediano;
  body.metrica_bajo= req.body.metrica_bajo;
  body.valor_bajo= req.body.valor_bajo;
  body.regional_id= req.body.regional_id;

 await Ciudades.update(body,{
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
 await Ciudades.destroy({
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

