const { authJwt } = require("../middlewares");
const controller = require("../controllers/auth.controller");
const upload = require('../libs/storage');
const cpUpload = upload.fields([{ name: 'filename', maxCount: 1 }])


module.exports = app => {
    const entidadController = require("../controllers/entidades.controller.js");
  
    const router = require("express").Router();
  

    router.post("/",[cpUpload,authJwt.verifyToken, authJwt.isAdmin], entidadController.create_permiso);

    router.post("/get",[cpUpload,authJwt.verifyToken, authJwt.isAdmin], entidadController.findAll_permisos);


    router.post("/delete",[cpUpload,authJwt.verifyToken, authJwt.isAdmin], entidadController.delete_permiso);

  
    app.use("/api/permisos", router);
  };
  