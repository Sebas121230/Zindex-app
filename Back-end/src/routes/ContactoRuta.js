//obtenemos el modelo TipDocModel con toda la funcionalidad
var ContactoModelo = require("../models/ContactoModelo");
var express = require("express");
var router = express.Router();

//creamos el ruteo de la clase
module.exports = function () {
  //---------------------------------------------------------------
  //Muestra el método CRUL Listar que muestra todos los tpos de documentos
  router.get("/", function (req, res) {
    ContactoModelo.getContactos(function (error, data) {
      res.status(200).json(data);
    });
  });


  //---------------------------------------------------------------
  //Muestra el método CRUL read(listar ), que muestra solo un tipo de catalogo
  router.get("/Cont/:tip", function (req, res) {
    var tip = req.params.tip;

    //solo actualizamos si el tip es un número
    if (!isNaN(tip)) {
      ContactoModelo.getContactoTipo(tip, function (error, data) {
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
      ContactoModelo.getContacto(id, function (error, data) {
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
      tipo_contacto: req.body.tipo_contacto,
      contacto: req.body.contacto,
      id_paciente_contacto: req.body.id_paciente_contacto,
      id_doctor_contacto: req.body.id_doctor_contacto,
    };

    //usamos la funcion para insertar
    ContactoModelo.insertContacto(UniversalData, function (error, data) {
      //console.log(" 44 tipo doc " +TipDocData.tipo_documento+"  ini  "+TipDocData.iniciales_tip_doc);
      //se muestra el mensaje correspondiente
      if (data) {
        res.status(200).json(data);
      } else {
        res.status(500).send({ error: "boo:(" });
      }
    });
  });

  //---------------------------------------------------------------
  //Muestra y captura los datos para el método CRUL update (actualizar), usando el verbo put
  router.put("/", function (req, res) {
    //almacenamos los datos de la petición en un objeto son Catalogo Universal

    var UniversalData = {
      id_contacto: req.body.id_contacto,
      tipo_contacto: req.body.tipo_contacto,
      contacto: req.body.contacto,
      id_paciente_contacto: req.body.id_paciente_contacto,
      id_doctor_contacto: req.body.id_doctor_contacto,
    };

    //usamos la funcion para actualizar
    ContactoModelo.updateContacto(UniversalData, function (error, data) {
      //se muestra el mensaje correspondiente
      if (data && data.msg) {
        res.status(200).json(data);
      } else {
        res.status(500).send({ error: "boo:(" });
      }
    });
  });

  router.delete("/", function (req, res) {
    //almacenamos los datos de la petición en un objeto son Catalogo Universal

    var UniversalData = {
      id_contacto: req.body.id_contacto,
    };

    //usamos la funcion para actualizar
    ContactoModelo.deleteContacto(UniversalData, function (error, data) {
      //se muestra el mensaje correspondiente
      if (data && data.msg) {
        res.status(200).json(data);
      } else {
        res.status(500).send({ error: "boo:(" });
      }
    });
  });

  //exportamos el objeto para tenerlo disponible en EL APP
  return router;
};
