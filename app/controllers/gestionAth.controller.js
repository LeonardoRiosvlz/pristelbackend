const db = require("../models");
const Gestion = db.gestionAth;
const Notificacion = db.notificacion;
const ProgramacionAth = db.programacion_ath;
const User = db.user;
const Op = db.Op;

// Create and Save a new Book
exports.create = async (req, res) => {
  // Validate request
  if (!req.body.asunto) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }
  // Create a Book
  const body={};

  if (req.files['gallery_antes']) {
    let  gallery = req.files['gallery_antes']  
    for (let index = 0; index < gallery.length; index++) {
        gallery[index]=`http://127.0.0.1:5000/public/${gallery[index].filename}`      
    }
    body.evidencias_antes=gallery
  }
  if (req.files['gallery_durante']) {
    let  gallery = req.files['gallery_durante']  
    for (let index = 0; index < gallery.length; index++) {
        gallery[index]=`http://127.0.0.1:5000/public/${gallery[index].filename}`      
    }
    body.evidencias_durante=gallery
  }
  if (req.files['gallery_despues']) {
    let  gallery = req.files['gallery_despues']  
    for (let index = 0; index < gallery.length; index++) {
        gallery[index]=`http://127.0.0.1:5000/public/${gallery[index].filename}`      
    }
    body.evidencias_despues=gallery
  }
  body.asunto= req.body.asunto;
  body.descripcion= req.body.descripcion;
  body.observaciones= req.body.observaciones;
  body.id_programacion= req.body.id_programacion;
  // Save Book in database
 await Gestion.create(body)
    .then(data => {
      res.send(data);
      const datos = {
        titulo: `Gestion realizada `,
        descripcion: `Se realizó una gestión para el consecutivo (ATH-${req.body.id_programacion})`,
        origen: "",
        modulo: "llamadas_ATH",
        icon: "ri-hammer-line",
        color: "avatar-title bg-success rounded-circle font-size-16",
        uid: req.body.coordinador_id,
        canal: "",
      };
      CrearNotificacion(datos);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Book."
      });
    });

    ProgramacionAth.update({
      status:"En proceso"
    },{
      where: { id: req.body.id_programacion }
    })
      .then(num => {

      })
      .catch(err => {

      });
  };



async function CrearNotificacion(datos){
  // Save
  await  Notificacion.create(datos)
  .then( data => {
    notificar(data);
  })
  .catch(err => {
    res.status(500).send({
      message: err.message || "Some error occurred while creating the Book."
    });
    return;
  });
}

async function notificar(data){
await  User.findByPk(data.uid)
.then(datas => {
 console.log(datas);
 global.io.to(datas.canal).emit('cliente', data);
})
.catch(err => {
 res.status(500).send({
   message: `erro al editar el cargo= ${id}`
 });
});

}




exports.find = async (req, res) => {
const id =req.body.id;
await  Gestion.findAll({
    limit: 3000000,
    offset: 0,
    where: {id_programacion: id}, // conditions
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
    await  Abonos.findAndCountAll({
        limit: 3000000,
        offset: 0,
        where: { }, // conditions
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

 await Abonos.findByPk(id)
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
  const body={};

  if (req.files['gallery_antes']) {
    let  gallery = req.files['gallery_antes']  
    for (let index = 0; index < gallery.length; index++) {
        gallery[index]=`http://127.0.0.1:5000/public/${gallery[index].filename}`      
    }
    body.evidencias_antes=gallery
  }
  if (req.files['gallery_durante']) {
    let  gallery = req.files['gallery_durante']  
    for (let index = 0; index < gallery.length; index++) {
        gallery[index]=`http://127.0.0.1:5000/public/${gallery[index].filename}`      
    }
    body.evidencias_durante=gallery
  }
  if (req.files['gallery_despues']) {
    let  gallery = req.files['gallery_despues']  
    for (let index = 0; index < gallery.length; index++) {
        gallery[index]=`http://127.0.0.1:5000/public/${gallery[index].filename}`      
    }
    body.evidencias_despues=gallery
  }
  body.asunto= req.body.asunto;
  body.descripcion= req.body.descripcion;
  body.observaciones= req.body.observaciones;
  body.id_programacion= req.body.id_programacion;
  const id = req.body.id;

 await Gestion.update(body,{
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







// Update a Book by the id in the request
exports.respuesta = async (req, res) => {
  const body={};
  body.status= req.body.status;
  body.observaciones_analista= req.body.observaciones_analista;
  body.vencimiento_tecnico= req.body.vencimiento_tecnico;
  const id = req.body.id;

 await Gestion.update(body,{
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "editado satisfactoriamente."
        });
        if (req.body.status==="Devuelta") {
          const datos = {
            titulo: `Gestión devuelta (ATH-${req.body.id_programacion})`,
            descripcion: `Observaciones: ${req.body.observaciones_analista}`,
            origen: "",
            modulo: "llamadas_ATH",
            icon: "ri-reply-fill",
            color: "avatar-title bg-danger rounded-circle font-size-16",
            uid: req.body.tecnico_id,
            canal: "",
          };
          CrearNotificacion(datos);
        }else{
          const datos = {
            titulo: `Gestión aprobada: (ATH-${req.body.id_programacion})`,
            descripcion: `El analista aprobo su gestión para esta llamada`,
            origen: "",
            modulo: "llamadas_ATH",
            icon: "ri-check-fill",
            color: "avatar-title bg-success rounded-circle font-size-16",
            uid: req.body.tecnico_id,
            canal: "",
          };
          CrearNotificacion(datos);
        }

        
      } else {
        res.send({
          message: `No puede editar el registro con el  el =${id}. Tal vez el cargo no existe o la peticion es vacia!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error al intentar editar el cargo con el id=" + id
      });
    });

    ProgramacionAth.update({
      status:req.body.status,
      vencimiento_tecnico:req.body.vencimiento_tecnico,
    },{
      where: { id: req.body.id_programacion }
    })
      .then(num => {

      })
      .catch(err => {

      });
};



// Delete a Book with the specified id in the request
exports.delete = async (req, res) => {

  const id = req.body.id;
 await Gestion.destroy({
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

