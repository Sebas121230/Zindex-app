//obtenemos el modelo TipDocModel con toda la funcionalidad
var PacienteModelo = require("../models/PacienteModelo");
var express = require("express");
var router = express.Router();

//creamos el ruteo de la clase
module.exports = function () {

  router.post("/login", function (req, res) {
    var email = req.body.login_correo_pac;
    var password = req.body.login_contrasena_pac;
  
    // Consultar la base de datos para verificar la autenticación
    PacienteModelo.authenticatePaciente(email, password, function (error, data) {
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
    PacienteModelo.getPacientes(function (error, data) {
      res.status(200).json(data);
    });
  });

  //---------------------------------------------------------------
  //Muestra el método CRUL read(listar ), que muestra solo un tipo de catalogo
  router.get("/Doc/:tip", function (req, res) {
    var tip = req.params.tip;

    //solo actualizamos si el tip es un número
    if (!isNaN(tip)) {
      PacienteModelo.getPacienteTipo(tip, function (error, data) {
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
      PacienteModelo.getPaciente(id, function (error, data) {
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
      nom1_pac: req.body.nom1_pac,
      nom2_pac: req.body.nom2_pac ? req.body.nom2_pac : '' ,
      apell1_pac: req.body.apell1_pac,
      apell2_pac: req.body.apell2_pac ? req.body.apell2_pac : '',
      nacimiento_pac: req.body.nacimiento_pac,
      alergias_pac: req.body.alergias_pac,
      estatura_pac: req.body.estatura_pac,
      peso_pac: req.body.peso_pac,
      tipo_doc_pac: req.body.tipo_doc_pac,
      num_doc_pac: req.body.num_doc_pac,
      sexo_pac: req.body.sexo_pac,
      tipo_usuario: req.body.tipo_usuario,
      login_correo_pac: req.body.login_correo_pac,
      login_contrasena_pac: req.body.login_contrasena_pac
    };

    //usamos la funcion para insertar
    PacienteModelo.insertPaciente(UniversalData, function (error, data) {
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
      id_paciente: req.body.id_paciente,
      nom1_pac: req.body.nom1_pac,
      nom2_pac: req.body.nom2_pac ? req.body.nom2_pac : '',
      apell1_pac: req.body.apell1_pac,
      apell2_pac: req.body.apell2_pac ? req.body.apell2_pac : '',
      nacimiento_pac: req.body.nacimiento_pac,
      alergias_pac: req.body.alergias_pac,
      estatura_pac: req.body.estatura_pac,
      peso_pac: req.body.peso_pac,
      tipo_doc_pac: req.body.tipo_doc_pac,
      num_doc_pac: req.body.num_doc_pac,
      sexo_pac: req.body.sexo_pac,
      tipo_usuario: req.body.tipo_usuario,
      login_correo_pac: req.body.login_correo_pac,
      login_contrasena_pac: req.body.login_contrasena_pac
    };

    //usamos la funcion para actualizar
    PacienteModelo.updatePaciente(UniversalData, function (error, data) {
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
      id_paciente: req.body.id_paciente,
    };

    //usamos la funcion para actualizar
    PacienteModelo.deletePaciente(UniversalData, function (error, data) {
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
