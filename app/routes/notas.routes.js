const { authJwt } = require("../middlewares");
const controller = require("../controllers/auth.controller");
const upload = require('../libs/storage');
const cpUpload = upload.fields([{ name: 'filename', maxCount: 1 }])


module.exports = app => {
    const notasController = require("../controllers/notas.controller.js");
  
    const router = require("express").Router();
  
    // Create a new cargo
    router.post("/",[cpUpload,authJwt.verifyToken,], notasController.create);
  
    // Create a new cargo
    router.post("/find",[cpUpload,authJwt.verifyToken], notasController.find);

  
    // Update a cargo with id
    router.put("/",[cpUpload,authJwt.verifyToken], notasController.update);
  
    // Delete a cargo with id
    router.post("/delete",[cpUpload,authJwt.verifyToken], notasController.delete);

  
    app.use("/api/notas", router);
  };
  