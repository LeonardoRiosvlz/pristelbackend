const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const config = require("./app/config/config.js");

const app = express();

const corsOptions = {
  origin: "http://localhost:8080"
};

app.use(cors(corsOptions));
app.use(express.urlencoded({extended: true})); 
  
// parse requests of content-type - application/json
//app.use(bodyParser.json());
// parse requests of content-type - application/x-www-form-urlencoded
//app.use(bodyParser.urlencoded({ extended: true }));

// database
const db = require("./app/models");
const Role = db.role;
db.sequelize.sync().then(() => {
 //initial(); // Just use it in development, at the first time execution!. Delete it in production
});

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Hi there, welcome to this tutorial." });
});

// api routes
app.use('/public',express.static(`${__dirname}/app/storage/imgs`));
require("./app/routes/book.routes")(app);
require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);
require("./app/routes/cargo.routes")(app);
require("./app/routes/area.routes")(app);
require("./app/routes/terceros.routes")(app);
require("./app/routes/categoria.routes")(app);
require("./app/routes/entidades.routes")(app);
require("./app/routes/permisos.routes")(app);
// Cajeros

require("./app/routes/cajeros_ath.routes")(app);
// fin Cajeros
// Programacion

require("./app/routes/programacion_ath.routes")(app);
//  fin Programacion 
// set port, listen for requests
const PORT = config.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Just use it in development, at the first time execution!. Delete it in production
function initial() {
  Role.create({
    id: 1,
    name: "tecnico"
  });

  Role.create({
    id: 2,
    name: "coordinador"
  });

  Role.create({
    id: 3,
    name: "admin"
  });
}
