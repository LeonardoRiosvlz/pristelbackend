const { authJwt } = require("../middlewares");
const controller = require("../controllers/auth.controller");
const upload = require('../libs/storage');
const cpUpload = upload.fields([{ name: 'filename', maxCount: 1 }])


module.exports = app => {
    const formatoController = require("../controllers/formato.controller.js");
  
    const router = require("express").Router();
  
    // Create a new cargo
    router.post("/",[cpUpload,authJwt.verifyToken, authJwt.isAdmin], formatoController.create);

    // Create a new cargo
    router.post("/status",[cpUpload,authJwt.verifyToken, authJwt.isAdmin], formatoController.status);

    // Retrieve all cargos
    router.get("/", formatoController.findAll);
  
    // Update a cargo with id
    router.put("/",[cpUpload,authJwt.verifyToken, authJwt.isAdmin], formatoController.update);
  
    // Delete a cargo with id
    router.post("/delete",[cpUpload,authJwt.verifyToken, authJwt.isAdmin], formatoController.delete);

  
    app.use("/api/formatos", router);
  };
  