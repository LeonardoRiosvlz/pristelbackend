const { authJwt } = require("../middlewares");
const controller = require("../controllers/auth.controller");
const upload = require('../libs/storage');
const cpUpload = upload.fields([{ name: 'filename', maxCount: 1 }])


module.exports = app => {
    const abonoController = require("../controllers/abono.controller.js");
  
    const router = require("express").Router();
  
    // Create a new cargo
    router.post("/",[cpUpload,authJwt.verifyToken, authJwt.isAdmin], abonoController.create);
  
    // Retrieve all cargos
    router.get("/", abonoController.findAll);

     // Retrieve all cargos
     router.post("/formato",[cpUpload,authJwt.verifyToken], abonoController.findFormato);
  
    // Update a cargo with id
    router.put("/",[cpUpload,authJwt.verifyToken, authJwt.isAdmin], abonoController.update);
  
    // Delete a cargo with id
    router.post("/delete",[cpUpload,authJwt.verifyToken, authJwt.isAdmin], abonoController.delete);

  
    app.use("/api/abonos", router);
  };
  