let express = require("express"); //guarda express que nosotros intalamos
let bodyParser = require("body-parser"),
  port = 3000; //rmanejo de cuerpo de la "pagina" y puerto
let http = require("http"); //protocolo de intercambio de archivos
let path = require("path"); //direccion
var cors = require('cors');
let morgan = require("morgan");

let Universal = require("./src/routes/UniversalRuta");
let Paciente = require("./src/routes/PacienteRuta");
let Doctor = require("./src/routes/DoctorRuta");
let Cita = require("./src/routes/CitaRuta");
let Calificacion = require("./src/routes/CalificacionRuta");
let Contacto = require("./src/routes/ContactoRuta");
let Informes = require("./src/routes/InformesRuta");

var app = express(); //recibe un constructor
app.use(cors());
// todos los entornos

app.set("port", process.env.PORT || port); //metodo para recibir puerto y proceso

app.use(bodyParser.json({ type: "application/json", limit: "10mb" })); //recibe un cuerpo y un objeto json

app.use(bodyParser.urlencoded({ extended: false })); //recibe url codificada

app.use(express.static(path.join(__dirname, "public"))); //recibe direccion

app.use(morgan("dev"));

//================================================================

app.use(function (req, res, next) {
  // Stio web al que desea permitir que se conecte

  res.setHeader("Access-Control-Allow-Origin", "http://localhost:4200");

  // A que métodos que desea dar permisos

  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  // A que encabezados se les va a dar permiso

  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );

  //Establezca en verdadero si necesita que el sitio web incluya cookies en las solicitudes enviadas

  //a la API (por ejemplo, en caso de que use sesiones)

  res.setHeader("Access-Control-Allow-Credentials", true);

  // Pase a la siguiente capa de middleware

  next();
});

//============================================================

app.use("/Universal", Universal());
app.use("/Paciente", Paciente());
app.use("/Doctor", Doctor());
app.use("/Cita", Cita());
app.use("/Calificacion", Calificacion());
app.use("/Contacto", Contacto());
app.use("/Informes", Informes());

http.createServer(app).listen(app.get("port"), function () {
  console.log("Servidor Express escuchando por el puerto " + app.get("port"));
});

module.exports = app;
