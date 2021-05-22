const db = require("../models");
const Sac = db.sac;
const Op = db.Op;

const fs = require("fs");
const csv = require("fast-csv");


exports.upload = async (req, res) => {
    try {
      if (req.file == undefined) {
        return res.status(400).send("Agregue un archivo CSV!");
      }
  
      let tutorials = [];
      let path = "./app/storage/uploads/" + req.file.filename;
      deleteAll();
      fs.createReadStream(path)
        .pipe(csv.parse({ headers: true , delimiter: ';' }))
        .on("error", (error) => {
          throw error.message;
        })
        .on("data", (row) => {
          tutorials.push(row);
        })
        .on("end", () => {
          Sac.bulkCreate(tutorials)
            .then(() => {
              res.status(200).send({
                message:
                  "Uploaded the file successfully: " + req.file.originalname,
              });
            })
            .catch((error) => {
              res.status(500).send({
                message: "Fail to import data into database!",
                error: error.message,
              });
            });
        });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        message: "Could not upload the file: " + req.file.originalname,
      });
    }
  };
  


// Create and Save a new Book
exports.create = async (req, res) => {
  // Validate request
  if (!req.body.precio) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }
  // Create a Book
  const sac = {
    item: req.body.item,
    descripcion: req.body.descripcion,
    medida: req.body.medida,
    precio: req.body.precio,
  };

  // Save Book in database
 await Sac.create(sac)
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

 await Sac.findAndCountAll({
    limit: 3000000,
    offset: 0,
    where: {}, // conditions
    order: [
      ['id', 'ASC'],
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


// Update a Book by the id in the request
exports.update = async (req, res) => {
  console.log(req)
  const id = req.body.id;

 await Sac.update({
    item: req.body.item,
    descripcion: req.body.descripcion,
    medida: req.body.medida,
    precio: req.body.precio
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
          message: `No puede editar el item con el  el =${id}. Tal vez el item no existe o la peticion es vacia!`
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
 await Sac.destroy({
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
async function deleteAll(){
  Sac.destroy({
    where: {},
    truncate: true
  })
    .then(nums => {

    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while removing all books."
      });
    });
};