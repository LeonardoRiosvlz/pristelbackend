const { authJwt } = require("../middlewares");
const controller = require("../controllers/auth.controller");
const upload = require('../libs/storage');
const cpUpload = upload.fields([
                            { name: 'evidencias', maxCount: 8 },
                            { name: 'filename', maxCount: 1 },
                            ])


module.exports = app => {
    const legalizacionesAthController = require("../controllers/legalizacionesAth.controller.js");
  
    const router = require("express").Router();
  
    // Retrieve all cargos
    router.get("/", legalizacionesAthController.findAll);

    // Create a new cargo
    router.post("/",[cpUpload,authJwt.verifyToken], legalizacionesAthController.create);
  
    // Delete a cargo with id
    router.post("/respuesta",[cpUpload,authJwt.verifyToken, authJwt.isAdmin], legalizacionesAthController.respuesta);

     // Retrieve all cargos
     router.post("/find",[cpUpload,authJwt.verifyToken], legalizacionesAthController.find);
  
    // Update a cargo with id
    router.put("/",[cpUpload,authJwt.verifyToken], legalizacionesAthController.update);

    // Delete a cargo with id
    router.post("/delete",[cpUpload,authJwt.verifyToken], legalizacionesAthController.delete);

  
    app.use("/api/legalizaciones/ath", router);
  };
  