const { authJwt } = require("../middlewares");
const controller = require("../controllers/auth.controller");
const upload = require('../libs/storage');
const cpUpload = upload.fields([{ name: 'filename', maxCount: 1 }])


module.exports = app => {
    const areaController = require("../controllers/areas.controller.js");
  
    const router = require("express").Router();
  
    // Create a new cargo
    router.post("/",[cpUpload,authJwt.verifyToken, authJwt.isAdmin], areaController.create);
  
    // Retrieve all cargos
    router.get("/", areaController.findAll);
  
    // Update a cargo with id
    router.put("/",[cpUpload,authJwt.verifyToken, authJwt.isAdmin], areaController.update);
  
    // Delete a cargo with id
    router.post("/delete",[cpUpload,authJwt.verifyToken, authJwt.isAdmin], areaController.delete);

  
    app.use("/api/areas", router);
  };
  