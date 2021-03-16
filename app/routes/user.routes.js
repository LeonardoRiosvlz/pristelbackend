const { authJwt } = require("../middlewares");
const controller = require("../controllers/user.controller");
const upload = require('../libs/storage');
const cpUpload = upload.fields([{ name: 'filename', maxCount: 1 }])

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );

    next();
  });

  // Retrieve all Books
  app.get("/user/all",[authJwt.verifyToken], controller.findAll);
  
  app.get("/user/pefil",[authJwt.verifyToken], controller.findOne);

  app.put("/user/pefil",[cpUpload ,authJwt.verifyToken], controller.update);
  
  app.get("/api/test/all", controller.allAccess);

  app.get("/api/test/user", [authJwt.verifyToken], controller.userBoard);

  app.get(
    "/api/test/mod",
    [authJwt.verifyToken, authJwt.isModerator],
    controller.moderatorBoard
  );

  app.get(
    "/api/test/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.adminBoard
  );
};