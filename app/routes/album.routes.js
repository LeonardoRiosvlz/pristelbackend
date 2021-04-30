const { authJwt } = require("../middlewares");
const controller = require("../controllers/auth.controller");
const upload = require('../libs/storage');
const cpUpload = upload.fields([{ name: 'perimetro', maxCount: 1 },{ name: 'site', maxCount: 1 },{ name: 'frente', maxCount: 1 },{ name: 'fachada', maxCount: 1 }])


module.exports = app => {
    const albumController = require("../controllers/album.controller.js");
  
    const router = require("express").Router();
  
    // Create a new cargo
    router.post("/",[cpUpload,authJwt.verifyToken, authJwt.isAdmin], albumController.create);
  
    // Create a new cargo
    router.post("/find",[cpUpload,authJwt.verifyToken, authJwt.isAdmin], albumController.find);


    // Retrieve all cargos
    router.get("/", albumController.findAll);
  
    // Update a cargo with id
    router.put("/",[cpUpload,authJwt.verifyToken, authJwt.isAdmin], albumController.update);

  
    // Delete a cargo with id
    router.post("/delete",[cpUpload,authJwt.verifyToken, authJwt.isAdmin], albumController.delete);

  
    app.use("/api/album", router);
  };
  