//obtenemos el modelo TipDocModel con toda la funcionalidad
var DoctorModelo = require("../models/DoctorModelo");
var express = require("express");
var router = express.Router();

//creamos el ruteo de la clase
module.exports = function () {

  router.post("/login", function (req, res) {
    var email = req.body.login_correo_doc;
    var password = req.body.login_contrasena_doc;
  
    // Consultar la base de datos para verificar la autenticación
    DoctorModelo.authenticateDoctor(email, password, function (error, data) {
      if (data && data.length > 0) {
        // Autenticación exitosa
        res.status(200).json({ msg: "Autenticación exitosa" });
      } else {
        // Autenticación fallida
        res.status(401).json({ msg: "Credenciales incorrectas" });
      }
    });
  });


  //---------------------------------------------------------------
  //Muestra el método CRUL Listar que muestra todos los tpos de documentos
  router.get("/", function (req, res) {
    DoctorModelo.getDoctores(function (error, data) {
      res.status(200).json(data);
    });
  });

  //---------------------------------------------------------------
  //Muestra el método CRUL read(listar ), que muestra solo un tipo de catalogo
  router.get("/Esp/:tip", function (req, res) {
    var tip = req.params.tip;

    //solo actualizamos si el tip es un número
    if (!isNaN(tip)) {
      DoctorModelo.getDoctorTipo(tip, function (error, data) {
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
      DoctorModelo.getDoctor(id, function (error, data) {
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
      nom1_doc: req.body.nom1_doc,
      nom2_doc: req.body.nom2_doc ? req.body.nom2_doc : '',
      apell1_doc: req.body.apell1_doc,
      apell2_doc: req.body.apell2_doc ? req.body.apell2_doc : '',
      nacimiento_doc: req.body.nacimiento_doc,
      horario_doc: req.body.horario_doc,
      tipo_docu_doc: req.body.tipo_docu_doc,
      num_doc_doc: req.body.num_doc_doc,
      sexo_doc: req.body.sexo_doc,
      tipo_usuario_doc: req.body.tipo_usuario_doc,
      tipo_espe_doc: req.body.tipo_espe_doc,
      login_correo_doc: req.body.login_correo_doc,
      login_contrasena_doc: req.body.login_contrasena_doc
    };

    //usamos la funcion para insertar
    DoctorModelo.insertDoctor(UniversalData, function (error, data) {
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
      id_doctor: req.body.id_doctor,
      nom1_doc: req.body.nom1_doc,
      nom2_doc: req.body.nom2_doc ? req.body.nom2_doc : '',
      apell1_doc: req.body.apell1_doc,
      apell2_doc: req.body.apell2_doc ? req.body.apell2_doc : '',
      nacimiento_doc: req.body.nacimiento_doc,
      horario_doc: req.body.horario_doc,
      tipo_docu_doc: req.body.tipo_docu_doc,
      num_doc_doc: req.body.num_doc_doc,
      sexo_doc: req.body.sexo_doc,
      tipo_usuario_doc: req.body.tipo_usuario_doc,
      tipo_espe_doc: req.body.tipo_espe_doc,
      login_correo_doc: req.body.login_correo_doc,
      login_contrasena_doc: req.body.login_contrasena_doc
    };

    //usamos la funcion para actualizar
    DoctorModelo.updateDoctor(UniversalData, function (error, data) {
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
      id_doctor: req.body.id_doctor,
    };

    //usamos la funcion para actualizar
    DoctorModelo.deleteDoctor(UniversalData, function (error, data) {
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
