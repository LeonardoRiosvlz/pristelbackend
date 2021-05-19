const { authJwt } = require("../middlewares");
const controller = require("../controllers/auth.controller");
const upload = require('../libs/storage');
const cpUpload = upload.fields([
                            { name: 'filename', maxCount: 1 },
                            { name: 'gallery_antes', maxCount: 8 },
                            { name: 'gallery_durante', maxCount: 8 },
                            { name: 'gallery_despues', maxCount: 8 },
                            ])


module.exports = app => {
    const gestionAthController = require("../controllers/gestionAth.controller.js");
  
    const router = require("express").Router();
  
    // Create a new cargo
    router.post("/",[cpUpload,authJwt.verifyToken, authJwt.isAdmin], gestionAthController.create);
  
    // Retrieve all cargos
    router.get("/", gestionAthController.findAll);

     // Retrieve all cargos
     router.post("/find",[cpUpload,authJwt.verifyToken], gestionAthController.find);
  
    // Update a cargo with id
    router.put("/",[cpUpload,authJwt.verifyToken, authJwt.isAdmin], gestionAthController.update);
  
    // Delete a cargo with id
    router.post("/respuesta",[cpUpload,authJwt.verifyToken, authJwt.isAdmin], gestionAthController.respuesta);

    // Delete a cargo with id
    router.post("/delete",[cpUpload,authJwt.verifyToken, authJwt.isAdmin], gestionAthController.delete);

  
    app.use("/api/gestion", router);
  };
  