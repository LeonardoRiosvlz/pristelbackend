const { authJwt } = require("../middlewares");
const controller = require("../controllers/auth.controller");
const upload = require('../libs/storage');
const cpUpload = upload.fields([{ name: 'filename', maxCount: 1 }])


module.exports = app => {
    const tercerosController = require("../controllers/terceros.controller.js");
  
    const router = require("express").Router();
  
    // Create a new cargo
    router.post("/",[cpUpload,authJwt.verifyToken, authJwt.isAdmin], tercerosController.create);
  
    // Retrieve all cargos
    router.get("/", tercerosController.findAll);
  
    // Update a cargo with id
    router.put("/",[cpUpload,authJwt.verifyToken, authJwt.isAdmin], tercerosController.update);
  
    // Delete a cargo with id
    router.post("/delete",[cpUpload,authJwt.verifyToken, authJwt.isAdmin], tercerosController.delete);

  
    app.use("/api/terceros", router);
  };
  