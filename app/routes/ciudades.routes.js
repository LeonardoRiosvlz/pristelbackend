const { authJwt } = require("../middlewares");
const controller = require("../controllers/auth.controller");
const upload = require('../libs/storage');
const cpUpload = upload.fields([{ name: 'filename', maxCount: 1 }])


module.exports = app => {
    const ciudadesController = require("../controllers/ciudades.controller.js");
  
    const router = require("express").Router();
  
    // Create a new cargo
    router.post("/",[cpUpload,authJwt.verifyToken, authJwt.isAdmin], ciudadesController.create);
 
    // Create a new cargo
    router.post("/find",[cpUpload,authJwt.verifyToken], ciudadesController.findRegional);
    
    // Retrieve all cargos
    router.get("/", ciudadesController.findAll);

    // Update a cargo with id
    router.put("/",[cpUpload,authJwt.verifyToken, authJwt.isAdmin], ciudadesController.update);
  
    // Delete a cargo with id
    router.post("/delete",[cpUpload,authJwt.verifyToken, authJwt.isAdmin], ciudadesController.delete);

  
    app.use("/api/ciudad", router);
  };
  