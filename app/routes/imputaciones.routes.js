const { authJwt } = require("../middlewares");
const controller = require("../controllers/auth.controller");
const upload = require('../libs/storage');
const cpUpload = upload.fields([{ name: 'filename', maxCount: 1 }])


module.exports = app => {
    const cargoController = require("../controllers/imputaciones.controller.js");
  
    const router = require("express").Router();
  
    // Create a new cargo
    router.post("/",[cpUpload,authJwt.verifyToken, authJwt.isAdmin], cargoController.create);
  
    router.post("/find",[cpUpload,authJwt.verifyToken, authJwt.isAdmin], cargoController.findOne);

    // Retrieve all cargos
    router.get("/", cargoController.findAll);
  
    // Update a cargo with id
    router.put("/",[cpUpload,authJwt.verifyToken, authJwt.isAdmin], cargoController.update);
  
    // Delete a cargo with id
    router.post("/delete",[cpUpload,authJwt.verifyToken, authJwt.isAdmin], cargoController.delete);

  
    app.use("/api/imputaciones", router);
  };
  