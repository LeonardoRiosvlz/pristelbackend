const config = require("../config/config");
const db = require("../models");
const jwt = require("jsonwebtoken");
const User = db.user;
const Op = db.Op;

// Retrieve all Books from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;

  User.findAndCountAll({
    limit: 10000000,
    offset: 0,
    where: {}, // conditions
  })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.send(500).send({
        message: err.message || "Ocurrio un erro al acceder ."
      });
    });
};
// Retrieve all Books from the database.
exports.findAllContacto = (req, res) => {
  const title = req.query.title;

  User.findAndCountAll({
    limit: 10000000,
    offset: 0,
    attributes: ['id', 'nombre', 'apellido', 'cargo', 'telefono'],
    where: {}, // conditions
  })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.send(500).send({
        message: err.message || "Ocurrio un erro al acceder ."
      });
    });
};
// Find a single with an id
exports.findTecnico = (req, res) => {
  const codigo = req.body.codigo;
  console.log(req);
  User.findAll({
    where: {
      codigo: codigo,
      tipo: 'Tecnico',
      status: 'activo'
    },
     attributes: ['nombre', 'apellido','id','email',  'codigo', 'telefono','imagen','direccion','tipo_tecnico','cuenta','nombre_cuenta'] })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving books."
      });
    });
};

exports.findCoordinadores = (req, res) => {
  const title = req.query.title;

  User.findAll({
    where: {tipo:"Coordinador"}, // conditions
    attributes: ['nombre', 'apellido','id', 'email',]
  })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.send(500).send({
        message: err.message || "Ocurrio un erro al acceder ."
      });
    });
};

exports.findAdministrador = async (req, res) => {


 await User.findAll({
    where: {tipo:"Administrador"}, // conditions
    attributes: ['nombre', 'apellido','id', 'email',]
  }).then(data => {
      res.send(data);
    })
    .catch(err => {
      res.send(500).send({
        message: err.message || "Ocurrio un erro al acceder ."
      });
    });
};



exports.findregional = async (req, res) => {
  const id= req.body.id;
  console.log(id);
  await  User.findAll({
      limit: 3000000,
      offset: 0,
      where: {
        regional:id
      }, // conditions
      order: [
        ['id', 'DESC'],
      ],
      attributes:['nombre', 'apellido','imagen','imagen','id' ,'codigo'],
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
  



exports.findOne = (req, res) => {
  const id = req.userId

  User.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: `Error = ${id}`
      });
    });
};


// Update a Book by the id in the request
exports.updateCanal = (req, res) => {

  const id = req.userId;
  User.update({
    canal: req.body.canal,
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
          message: `No puede editar el canal con el id =${id}. Tal vez el cargo no existe o la peticion es vacia!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error al intentar editar el canal con el id=" + id
      });
    });
};



// Update a Book by the id in the request
exports.update = (req, res) => {
  const id = req.userId;
  const body={};
  if(req.files['filename']){
    const { filename } = req.files['filename'][0]
    body.imagen= `http://localhost:5000/public/${filename}`;
    console.log(body.imagen);
  }
  if(req.files['firma']){
    const { firma } = req.files['firma'][0]
    body.firma= `http://localhost:5000/public/${firma}`;
    console.log(body.imagen);
  }
  if (req.codigo) {
    body.codigo= req.body.codigo;
  }
  if (req.entidad) {
    body.entidad= req.body.entidad;
  }
  body.direccion= req.body.nombrdireccion;
  body.status= req.body.status;
  body.nombre= req.body.nombre;
  body.apellido= req.body.apellido;
  body.sexo= req.body.sexo;
  body.telefono= req.body.telefono;
  body.regional= req.body.regional;
  body.dependencia= req.dependencia;
  if(req.body.tipo_tecnico){
    body.tipo_tecnico= req.body.tipo_tecnico;
  }
  if(req.body.tipo_cuenta){
    body.tipo_cuenta= req.body.tipo_cuenta;
  }
  if(req.body.nombre_cuenta){
    body.nombre_cuenta= req.body.nombre_cuenta;
  }
  if(req.body.cuenta){
    body.cuenta= req.body.cuenta;
  }

  User.update(body,{
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        User.findOne({
          where: {
            id: id
          }
        }).then(user => {

            let token = jwt.sign({ id: user.id,rol: user.tipo, email: user.email,nombre: user.nombre,apellido: user.apellido,imagen: user.imagen}, config.auth.secret, {
              expiresIn: 86400 // 24 hours
            });
            res.status(200).send({
              accessToken: token
            });
          })
          .catch(err => {
            res.status(500).send({ message: err.message });
          });




      } else {
        res.send({
          message: `Error al intentar editar este usuario`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error"
      });
    });
};

exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};

exports.userBoard = (req, res) => {
  res.status(200).send("User Content.");
};

exports.adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};

exports.moderatorBoard = (req, res) => {
  res.status(200).send("Moderator Content.");
};
 