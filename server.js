const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const config = require("./app/config/config.js");

const app = express();
const server = require('http').Server(app);

const corsOptions = {
  origin: "http://localhost:8080"
};

app.use(cors(corsOptions));
app.use(express.urlencoded({extended: true})); 

// database
const db = require("./app/models");
const Role = db.role;
db.sequelize.sync().then(() => {
 //initial(); // Just use it in development, at the first time execution!. Delete it in production
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
require("./app/routes/subcategoria.routes")(app);
require("./app/routes/entidades.routes")(app);
require("./app/routes/permisos.routes")(app);
require("./app/routes/notificacion.routes")(app);
require("./app/routes/formato.routes")(app);
require("./app/routes/chat.routes")(app);
require("./app/routes/imputaciones.routes")(app);
require("./app/routes/abonos.routes")(app);
require("./app/routes/seguridad.routes")(app);
require("./app/routes/regional.routes")(app);
require("./app/routes/ciudades.routes")(app);
require("./app/routes/trazabilidad_ath.routes")(app);
require("./app/routes/album.routes")(app); 
// Cajeros

require("./app/routes/cajeros_ath.routes")(app);
// fin Cajeros
// Programacion

require("./app/routes/programacion_ath.routes")(app);
//  fin Programacion 
// set port, listen for requests

 
// Middleware para Vue.js router modo history
const history = require('connect-history-api-fallback');
app.use(history());
app.use(express.static(path.join(__dirname, 'app/public')));


const PORT = config.PORT;
const servidor =app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const io = require('socket.io')(servidor);
global.io = io; //added
io.on('connection', function(socket) {
 
    socket.on('servidor', function(data) {
  
        //io.emit('MESSAGE', data)
        io.to(data.user).emit('cliente', data);
    });
});

module.exports = {

    servidor

}