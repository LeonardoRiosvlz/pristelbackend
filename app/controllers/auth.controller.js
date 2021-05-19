const config = require("../config/config");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const bcrypt = require("bcryptjs");
const db = require("../models");
const { user } = require("../models");
const { text } = require("body-parser");
const User = db.user;
const Role = db.role;
const Op = db.Op;

exports.signup = (req, res) => {

  if(req.files['filename']){
    const { filename } = req.files['filename'][0]
    req.body.imagen= `http://localhost:5000/public/${filename}`
  }
  if(req.files['firma']){
    const { filename } = req.files['firma'][0]
    req.body.firma= `http://localhost:5000/public/${filename}`;
  }
  User.create({
    username: req.body.username,
    email: req.body.email,
    nombre: req.body.nombre,
    apellido: req.body.apellido,
    sexo: req.body.sexo,
    entidad: req.body.entidad,
    cargo: req.body.cargo,
    codigo: req.body.codigo,
    telefono: req.body.telefono,
    imagen: req.body.imagen,
    tipo: req.body.tipo,
    tipo: req.body.regional,
    status: req.body.status,
    direccion: req.body.direccion,
    tipo_tecnico: req.body.tipo_tecnico,
    tipo_cuenta: req.body.tipo_cuenta,
    nombre_cuenta: req.body.nombre_cuenta,
    cuenta: req.body.cuenta,
    password: bcrypt.hashSync(req.body.password, 8)
  })
    .then(user => {
        // User role 1
    res.send({ 
      message: "User was registered successfully!",
      user:user
     });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

 

// Update a Book by the id in the request
exports.update = (req, res) => {
  const id = req.body.id;
  const body={};
  if(req.files['filename']){
    const { filename } = req.files['filename'][0]
    body.imagen= `http://localhost:5000/public/${filename}`
  }
  if(req.files['firma']){
    const { filename } = req.files['firma'][0]
    body.firma= `http://localhost:5000/public/${filename}`;
  }
  body.nombre= req.body.nombre;
  body.apellido= req.body.apellido;
  body.sexo= req.body.sexo;
  body.entidad= req.body.entidad;
  body.cargo= req.body.cargo;
  body.codigo= req.body.codigo;
  body.telefono= req.body.telefono;
  body.tipo= req.body.tipo;
  body.regional= req.body.regional;
  body.direccion= req.body.direccion;
  body.status= req.body.status;
  body.dependencia= req.body.dependencia;
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
        res.send({
          message: "User was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update User with id=${id}. Maybe USer was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating User with id=" + id
      });
    });
};

exports.signin = (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({
    where: {
      email: email
    }
  }).then(user => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }
      let passwordIsValid = bcrypt.compareSync(
        password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }

      let token = jwt.sign({ id: user.id,rol: user.tipo, email: user.email,nombre: user.nombre,apellido: user.apellido}, config.auth.secret, {
        expiresIn: '365d' // 24 hours
      });
      res.status(200).send({
        id: user.id,
        username: user.username,
        rol: user.tipo,
        email: user.email,
        accessToken: token
      });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};


exports.resetPass = (req, res) => {
  const email = req.body.email;
  User.findOne({
    where: {
      email: email
    }
  }).then(user => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }
      let token = jwt.sign({ id: user.id,rol: user.tipo, email: user.email,nombre: user.nombre,apellido: user.apellido}, config.auth.secret, {
        expiresIn: 4000 // 24 hours
      });

      const transporter = nodemailer.createTransport({

        host: 'demist.grupoinnovaec.com',
        port: 465,
        secure: true, // use SSL
        auth: {
            user: 'info@demist.grupoinnovaec.com',
            pass: 'demistinfo'
        }

    });

    const mailOptions={
      from:"Remitente",
      to:"luzguerrera935@gmail.com",
      subject:"Enviado desde",
      message: `http://localhost:8080/#/resetpass/${token}`
    }

    transporter.sendMail(mailOptions, (error, info)=>{
      if(error){
        res.status(500).send(error.message);

      }else{
        console.log("email enviado ") 
        res.status(200).send({
          message:  `http://localhost:8080/#/resetpass/${token}`
        });
      }
    })
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

// Update a Book by the id in the request
exports.recoverPass = (req, res) => {
  const id = req.userId;
  User.update({
    password: bcrypt.hashSync(req.body.password, 8)
  },{
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Contraseña editada!!."
        });
      } else {
        res.send({
          message: `No se pudo editar la contraseña!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating User with id=" + id
      });
    });
};