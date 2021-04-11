const { authJwt } = require("../middlewares");
const controller = require("../controllers/auth.controller");
const upload = require('../libs/storage');
const cpUpload = upload.fields([{ name: 'filename', maxCount: 1 }])


module.exports = app => {
    const categoriaController = require("../controllers/categoria.controller.js");
  
    const router = require("express").Router();
  
    // Create a new cargo
    router.post("/",[cpUpload,authJwt.verifyToken, authJwt.isAdmin], categoriaController.create);
  
    // Retrieve all cargos
    router.get("/", categoriaController.findAll);
  
    // Update a cargo with id
    router.put("/",[cpUpload,authJwt.verifyToken, authJwt.isAdmin], categoriaController.update);
  
    // Delete a cargo with id
    router.post("/delete",[cpUpload,authJwt.verifyToken, authJwt.isAdmin], categoriaController.delete);

  
    app.use("/api/categorias", router);
  };
  