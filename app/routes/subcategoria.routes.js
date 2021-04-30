const { authJwt } = require("../middlewares");
const controller = require("../controllers/auth.controller");
const upload = require('../libs/storage');
const cpUpload = upload.fields([{ name: 'filename', maxCount: 1 }])


module.exports = app => {
    const subcategoriaController = require("../controllers/subcategoria.controller.js");
  
    const router = require("express").Router();
  
    // Create a new cargo
    router.post("/",[cpUpload,authJwt.verifyToken, authJwt.isAdmin], subcategoriaController.create);
    
    // Create a new cargo
    router.post("/find",[cpUpload,authJwt.verifyToken, authJwt.isAdmin], subcategoriaController.find); 

    // Retrieve all cargos
    router.get("/", subcategoriaController.findAll);
  
    // Update a cargo with id
    router.put("/",[cpUpload,authJwt.verifyToken, authJwt.isAdmin], subcategoriaController.update);
  
    // Delete a cargo with id
    router.post("/delete",[cpUpload,authJwt.verifyToken, authJwt.isAdmin], subcategoriaController.delete);

  
    app.use("/api/subcategorias", router);
  };
  