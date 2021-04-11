const { authJwt } = require("../middlewares");
const upload = require('../libs/storage');
const cpUpload = upload.fields([{ name: 'filename', maxCount: 1 }])


module.exports = app => {
    const programacionAthController = require("../controllers/programacionAth.controller.js");
  
    const router = require("express").Router();
  
    // Create a new cargo
    router.post("/",[cpUpload,authJwt.verifyToken, authJwt.isAdmin], programacionAthController.create);
  
    // Retrieve all cargos
    router.get("/", programacionAthController.findAll);
  
    // Update  with id
    router.put("/",[cpUpload,authJwt.verifyToken, authJwt.isAdmin], programacionAthController.update);


    router.post("/delete",[cpUpload,authJwt.verifyToken, authJwt.isAdmin], programacionAthController.delete);
  
    app.use("/api/programacion/ath", router);
  };
  