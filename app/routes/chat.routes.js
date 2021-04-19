const { authJwt } = require("../middlewares");
const controller = require("../controllers/auth.controller");
const upload = require('../libs/storage');
const cpUpload = upload.fields([{ name: 'filename', maxCount: 1 }])


module.exports = app => {
    const chatController = require("../controllers/chat.controller.js");
  
    const router = require("express").Router();
  
    // Create a new cargo
    router.post("/sala",[cpUpload,authJwt.verifyToken, authJwt.isAdmin], chatController.createSala);
  
    // Retrieve all cargos
    router.get("/salas",[cpUpload,authJwt.verifyToken], chatController.findAll);
    router.get("/invitaciones",[cpUpload,authJwt.verifyToken], chatController.invitaciones);
    router.post("/crear",[cpUpload,authJwt.verifyToken], chatController.createSala);
    router.post("/suscribir",[cpUpload,authJwt.verifyToken,authJwt.isAdminSala], chatController.suscribir);
    router.post("/mensaje",[cpUpload,authJwt.verifyToken], chatController.mensajes);
    router.post("/expulsar",[cpUpload,authJwt.verifyToken,authJwt.isAdminSala], chatController.expulsar);
    router.post("/salas",[cpUpload,authJwt.verifyToken], chatController.findSala);
    // Update a cargo with id
    router.put("/",[cpUpload,authJwt.verifyToken], chatController.update);
  
    // Delete a cargo with id
    router.post("/delete",[cpUpload,authJwt.verifyToken,authJwt.isAdminSala], chatController.delete);
    router.post("/clear",[cpUpload,authJwt.verifyToken,authJwt.isAdminSala], chatController.clear);
  
    app.use("/api/chat", router);
  };
  