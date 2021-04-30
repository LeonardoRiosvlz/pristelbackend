const { authJwt } = require("../middlewares");
const controller = require("../controllers/auth.controller");
const upload = require('../libs/storage');
const cpUpload = upload.fields([{ name: 'filename', maxCount: 1 }])


module.exports = app => {
    const trazabilidadController = require("../controllers/trazabilidadAth.controller.js");
  
    const router = require("express").Router();
  
    // Create a new cargo
    router.post("/",[cpUpload,authJwt.verifyToken, authJwt.isAdmin], trazabilidadController.create);
  
    // Retrieve all cargos
    router.get("/", trazabilidadController.findAll);
  
    // Update a cargo with id
    router.put("/",[cpUpload,authJwt.verifyToken, authJwt.isAdmin], trazabilidadController.update);

     // Update a cargo with id
    router.post("/find",[cpUpload,authJwt.verifyToken, authJwt.isAdmin], trazabilidadController.trazos);
  
    // Delete a cargo with id
    router.post("/delete",[cpUpload,authJwt.verifyToken, authJwt.isAdmin], trazabilidadController.delete);

  
    app.use("/api/trazabilidad_ath", router);
  };
  