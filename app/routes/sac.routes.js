const { authJwt } = require("../middlewares");
const upload = require('../libs/storage');
const cpUpload = upload.fields([{ name: 'filename', maxCount: 1 }])
const uploads = require("../middlewares/uploads");

module.exports = app => {
    const Controller = require("../controllers/sac.controller.js");
  
    const router = require("express").Router();
  
    // Create a new cargo
    router.post("/csv",[uploads.single("file"),authJwt.verifyToken], Controller.upload);
  
    // Create a new cargo
    router.post("/",[cpUpload,authJwt.verifyToken, authJwt.isAdmin], Controller.create);
  
    

    // Retrieve all cargos
    router.get("/", Controller.findAll);
  
    // Update a cargo with id
    router.put("/",[cpUpload,authJwt.verifyToken, authJwt.isAdmin], Controller.update);
  
    // Delete a cargo with id
    router.post("/delete",[cpUpload,authJwt.verifyToken, authJwt.isAdmin], Controller.delete);
  
    
    app.use("/api/sac", router);
  };