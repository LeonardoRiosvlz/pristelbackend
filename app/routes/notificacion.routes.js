const { authJwt } = require("../middlewares");
const controller = require("../controllers/auth.controller");
const upload = require('../libs/storage');
const cpUpload = upload.fields([{ name: 'filename', maxCount: 1 }])


module.exports = app => {
    const notificacionController = require("../controllers/Notificacion.controller.js");
  
    const router = require("express").Router();
  
    // Create a new cargo
    router.post("/",[cpUpload,authJwt.verifyToken, authJwt.isAdmin], notificacionController.create);
  
    // Retrieve all cargos
    router.get("/",authJwt.verifyToken, notificacionController.findAll);
  
    // Update a cargo with id
    router.put("/",[cpUpload,authJwt.verifyToken, authJwt.isAdmin], notificacionController.update);
  
    // Delete a cargo with id
    router.post("/delete",[cpUpload,authJwt.verifyToken, authJwt.isAdmin], notificacionController.delete);

  
    app.use("/api/notificacion", router);
  };
  