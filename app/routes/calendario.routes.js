const { authJwt } = require("../middlewares");
const controller = require("../controllers/auth.controller");
const upload = require('../libs/storage');
const cpUpload = upload.fields([{ name: 'filename', maxCount: 1 }])


module.exports = app => {
    const calendarioController = require("../controllers/calendario.controller.js");
  
    const router = require("express").Router();
  

     // Retrieve all cargos
     router.get("/coordinador",[cpUpload,authJwt.verifyToken], calendarioController.findAth);
  

  
    app.use("/api/calendario", router);
  };
  