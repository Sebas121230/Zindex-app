//obtenemos el modelo TipDocModel con toda la funcionalidad
var CalificacionModelo = require("../models/CalificacionModelo");
var express = require("express");
var router = express.Router();

//creamos el ruteo de la clase
module.exports = function () {
  //---------------------------------------------------------------
  //Muestra el método CRUL Listar que muestra todos los tpos de documentos
  router.get("/", function (req, res) {
    CalificacionModelo.getCalificaciones(function (error, data) {
      res.status(200).json(data);
    });
  });

  //---------------------------------------------------------------
  //Muestra el método CRUL read(listar ), que muestra solo un tipo de catalogo
  router.get("/Calif/:calif", function (req, res) {
    var calif = req.params.calif;

    //solo actualizamos si el tip es un número
    if (!isNaN(calif)) {
      CalificacionModelo.getCalificacionTipo(calif, function (error, data) {
        //si el tipo de catalogo existe lo mostramos en formato json
        if (typeof data !== "undefined" && data.length > 0) {
          res.status(200).json(data);
        }
        //en otro caso mostramos una respuesta conforme no existe
        else {
          res.status(400).json({ msg: 'Registro no Existe' });
        }
      });
    } //si hay algún error
    else {
      res.status(500).json({ msg: "error" });
    }
  });

  router.get("/Esp/:califesp", function (req, res) {
    var califesp = req.params.califesp;

    //solo actualizamos si el tip es un número
    if (!isNaN(califesp)) {
      CalificacionModelo.getCalificacionTipoEsp(califesp, function (error, data) {
        //si el tipo de catalogo existe lo mostramos en formato json
        if (typeof data !== "undefined" && data.length > 0) {
          res.status(200).json(data);
        }
        //en otro caso mostramos una respuesta conforme no existe
        else {
          res.json(404, { msg: "Registro no Existe" });
        }
      });
    } //si hay algún error
    else {
      res.status(500).json({ msg: "error" });
    }
  });

  //---------------------------------------------------------------
  //Muestra el método CRUL read(leer), que muestra el catalogo universal solicitado
  router.get("/Id/:id", function (req, res) {
    var id = req.params.id;

    //solo actualizamos si la id es un número
    if (!isNaN(id)) {
      CalificacionModelo.getCalificacion(id, function (error, data) {
        //si el tipo de documento existe lo mostramos en formato json
        if (typeof data !== "undefined" && data.length > 0) {
          res.status(200).json(data);
        }
        //en otro caso mostramos una respuesta conforme no existe
        else {
          res.json(404, { msg: "Registro no Existe" });
        }
      });
    } //si hay algún error
    else {
      res.status(500).json({ msg: "error" });
    }
  });

  //---------------------------------------------------------------
  //Muestra y captura los datos del método CRUL crear, usando el verbo post
  router.post("/", function (req, res) {
    //creamos un objeto Json con los datos del Catalogo Universal
    var UniversalData = {
      num_calificacion: req.body.num_calificacion,
      comen_calificacion: req.body.comen_calificacion,
      id_cita_calificacion: req.body.id_cita_calificacion,
    };

    //usamos la funcion para insertar
    CalificacionModelo.insertCalificacion(
      UniversalData,
      function (error, data) {
        //console.log(" 44 tipo doc " +TipDocData.tipo_documento+"  ini  "+TipDocData.iniciales_tip_doc);
        //se muestra el mensaje correspondiente
        if (data) {
          res.status(200).json(data);
        } else {
          res.status(500).send({ error: "boo:(" });
        }
      }
    );
  });

  //---------------------------------------------------------------
  //Muestra y captura los datos para el método CRUL update (actualizar), usando el verbo put
  router.put("/", function (req, res) {
    //almacenamos los datos de la petición en un objeto son Catalogo Universal

    var UniversalData = {
      id_calificacion: req.body.id_calificacion,
      num_calificacion: req.body.num_calificacion,
      comen_calificacion: req.body.comen_calificacion,
      id_cita_calificacion: req.body.id_cita_calificacion,
    };

    //usamos la funcion para actualizar
    CalificacionModelo.updateCalificacion(
      UniversalData,
      function (error, data) {
        //se muestra el mensaje correspondiente
        if (data && data.msg) {
          res.status(200).json(data);
        } else {
          res.status(500).send({ error: "boo:(" });
        }
      }
    );
  });

  router.delete("/", function (req, res) {
    //almacenamos los datos de la petición en un objeto son Catalogo Universal

    var UniversalData = {
      id_calificacion: req.body.id_calificacion,
    };

    //usamos la funcion para actualizar
    CalificacionModelo.deleteCalificacion(
      UniversalData,
      function (error, data) {
        //se muestra el mensaje correspondiente
        if (data && data.msg) {
          res.status(200).json(data);
        } else {
          res.status(500).send({ error: "boo:(" });
        }
      }
    );
  });

  //exportamos el objeto para tenerlo disponible en EL APP
  return router;
};
