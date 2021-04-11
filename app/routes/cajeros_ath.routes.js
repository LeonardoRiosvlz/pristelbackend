const { authJwt } = require("../middlewares");
const controller = require("../controllers/auth.controller");
const upload = require('../libs/storage');
const cpUpload = upload.fields([{ name: 'filename', maxCount: 1 }])


module.exports = app => {
    const cajerosAthController = require("../controllers/cajerosAth.controller.js");
  
    const router = require("express").Router();
  
    // Create a new cargo
    router.post("/",[cpUpload,authJwt.verifyToken, authJwt.isAdmin], cajerosAthController.create);
  
    // Retrieve all cargos
    router.get("/", cajerosAthController.findAll);
  
    // Update  with id
    router.put("/",[cpUpload,authJwt.verifyToken, authJwt.isAdmin], cajerosAthController.update);
  
    // Delete  with id
    router.post("/find",[cpUpload,authJwt.verifyToken, authJwt.isAdmin], cajerosAthController.find);

    router.post("/delete",[cpUpload,authJwt.verifyToken, authJwt.isAdmin], cajerosAthController.delete);
  
    app.use("/api/cajeros/ath", router);
  };
  