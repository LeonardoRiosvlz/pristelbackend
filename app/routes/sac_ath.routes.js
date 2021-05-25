const { authJwt } = require("../middlewares");
const controller = require("../controllers/auth.controller");
const upload = require('../libs/storage');
const cpUpload = upload.fields([{ name: 'filename', maxCount: 1 }])


module.exports = app => {
    const Controller = require("../controllers/sacAth.controller.js");
  
    const router = require("express").Router();
  
    // Create a new cargo
    router.post("/",[cpUpload,authJwt.verifyToken], Controller.create);
  
    // Retrieve all cargos
    router.get("/", Controller.findAll);

    // Update a cargo with id
    router.put("/",[cpUpload,authJwt.verifyToken], Controller.update);
  
    // Delete a cargo with id
    router.post("/delete",[cpUpload,authJwt.verifyToken], Controller.delete);

  
    app.use("/api/sac/ath", router);
  };
  