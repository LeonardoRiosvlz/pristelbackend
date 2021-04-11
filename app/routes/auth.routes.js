const { verifySignUp } = require("../middlewares");
const { authJwt } = require("../middlewares");
const controller = require("../controllers/auth.controller");
const upload = require('../libs/storage');
const cpUpload = upload.fields([{ name: 'filename', maxCount: 1 },{ name: 'firma', maxCount: 1 }]) 

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );

    next();
  });

  app.post(
    "/api/auth/signup",
    [ cpUpload,verifySignUp.checkDuplicateUsernameOrEmail],controller.signup
  );

  app.post("/api/auth/update", [cpUpload,authJwt.verifyToken] ,controller.update);

  app.post("/api/auth/signin", [cpUpload], controller.signin);

  app.post('/auth/forgot-password',[cpUpload],controller.resetPass);
  
  app.put('/auth/recover-password',[cpUpload, authJwt.verifyToken],controller.recoverPass);
};
 