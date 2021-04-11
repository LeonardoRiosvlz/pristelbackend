const { authJwt } = require("../middlewares");
const controller = require("../controllers/auth.controller");
const upload = require('../libs/storage');
const cpUpload = upload.fields([{ name: 'filename', maxCount: 1 }])


module.exports = app => {
    const visitasAthController = require("../controllers/visitasAth.controller.js");
  
    const router = require("express").Router();
  
    // Create a new cargo
    router.post("/",[cpUpload,authJwt.verifyToken, authJwt.isAdmin], visitasAthController.create);
  
    // Retrieve all cargos
    router.get("/", visitasAthController.findAll);
  
    // Update a cargo with id
    router.put("/",[cpUpload,authJwt.verifyToken, authJwt.isAdmin], visitasAthController.update);
  
    // Delete a cargo with id
    router.post("/delete",[cpUpload,authJwt.verifyToken, authJwt.isAdmin], visitasAthController.delete);

  
    app.use("/api/ath/visitas", router);
  };
  