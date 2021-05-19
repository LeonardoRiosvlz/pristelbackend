const { authJwt } = require("../middlewares");
const upload = require('../libs/storage');
const cpUpload = upload.fields([{ name: 'filename', maxCount: 1 }])


module.exports = app => {
    const programacionAthController = require("../controllers/programacionAth.controller.js");
  
    const router = require("express").Router();
  
    // Create a new cargo
    router.post("/",[cpUpload,authJwt.verifyToken], programacionAthController.create);
  
    // Create a new cargo
    router.post("/find",[cpUpload,authJwt.verifyToken], programacionAthController.find);

    // Create a new cargo
     router.post("/programar",[cpUpload,authJwt.verifyToken], programacionAthController.programar);
    
     // Create a new cargo
    router.post("/escalar",[cpUpload,authJwt.verifyToken], programacionAthController.escalar);

    // Create a new cargo
    router.post("/rechazar",[cpUpload,authJwt.verifyToken], programacionAthController.rechazar);

    // Create a new cargo
    router.post("/archivar",[cpUpload,authJwt.verifyToken], programacionAthController.archivar);

   // Create a new cargo
   router.post("/cerrar",[cpUpload,authJwt.verifyToken], programacionAthController.cerrar);


    // Retrieve all cargos
    router.get("/", programacionAthController.findAll);
  
    // Update  with id
    router.put("/",[cpUpload,authJwt.verifyToken], programacionAthController.update);


    router.post("/delete",[cpUpload,authJwt.verifyToken], programacionAthController.delete);
  
    app.use("/api/programacion/ath", router);
  };
  