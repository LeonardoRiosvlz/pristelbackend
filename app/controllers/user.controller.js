const config = require("../config/config");
const db = require("../models");
const jwt = require("jsonwebtoken");
const User = db.user;
const Op = db.Op;

// Retrieve all Books from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;

  User.findAndCountAll({
    limit: 10,
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
exports.update = (req, res) => {
  const id = req.userId;
  const body={};
  if(req.files['filename']){
    const { filename } = req.files['filename'][0]
    body.imagen= `http://localhost:5000/public/${filename}`;
    console.log(body.imagen);
  }
  if (req.codigo) {
    body.codigo= req.body.codigo;
  }
  if (req.entidad) {
    body.entidad= req.body.entidad;
  }

  body.nombre= req.body.nombre;
  body.apellido= req.body.apellido;
  body.sexo= req.body.sexo;
  body.telefono= req.body.telefono;


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
