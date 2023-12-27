//obtenemos el modelo TipDocModel con toda la funcionalidad
var CitaModelo = require("../models/CitaModelo");
var express = require("express");
var router = express.Router();

//creamos el ruteo de la clase
module.exports = function () {
  //---------------------------------------------------------------
  //Muestra el método CRUL Listar que muestra todos los tpos de documentos
  router.get("/", function (req, res) {
    CitaModelo.getCitas(function (error, data) {
      res.status(200).json(data);
    });
  });

  //---------------------------------------------------------------
  //Muestra el método CRUL read(listar ), que muestra solo un tipo de catalogo
  router.get("/Est/:tip", function (req, res) {
    var tip = req.params.tip;

    //solo actualizamos si el tip es un número
    if (!isNaN(tip)) {
      CitaModelo.getCitaTipo(tip, function (error, data) {
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
      CitaModelo.getCitaId(id, function (error, data) {
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

  router.get("/IdPac/:idPaciente", function (req, res) {
    var idPaciente = req.params.idPaciente;

    //solo actualizamos si la id es un número
    if (!isNaN(idPaciente)) {
      CitaModelo.getCita(idPaciente, function (error, data) {
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

  //INFORME POR CALIFICACION 
  router.post("/Informe/",function (req,res)
  {
    var parametros =
    {
      calificacion: req.body.calificacion,
      fechaInicio: req.body.fechaInicio,
      fechaFin: req.body.fechaFin
    }

    CitaModelo.postInformeCalificacionCita(parametros,function(error,data)
    {
      if(data)
      {
        res.status(200).json(data);
      }
      else
      {
        res.status(500).send({error: "Hubo un error"});
      }
    });
  });

  //INFORME POR ESTADO DE LA CITA Y ESPECIALIDAD REQUERIDA
  router.post("/InformeEs",function(req,res)
  { 
    var parametros = 
    {
      estado: req.body.estado,
      especialidad: req.body.especialidad,
      fechaInicio: req.body.fechaInicio,
      fechaFin: req.body.fechaFin
    }

    CitaModelo.postInformeEspeCita(parametros,function(error,data)
    {
      if(data)
      {
        res.status(200).json(data);
      }
      else
      {
        res.status(500).send({error: "Hubo un error"});
      }
    });
  });

  //---------------------------------------------------------------
  //Muestra y captura los datos del método CRUL crear, usando el verbo post
  router.post("/", function (req, res) {
    //creamos un objeto Json con los datos del Catalogo Universal
    var UniversalData = {
      fecha_cita: req.body.fecha_cita,
      tipo_estado_cita: req.body.tipo_estado_cita,
      id_paciente_cita: req.body.id_paciente_cita,
      id_doctor_cita: req.body.id_doctor_cita,
      comen_cita: req.body.comen_cita,
    };

    //usamos la funcion para insertar
    CitaModelo.insertCita(UniversalData, function (error, data) {
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
      id_cita: req.body.id_cita,
      fecha_cita: req.body.fecha_cita,
      tipo_estado_cita: req.body.tipo_estado_cita,
      id_paciente_cita: req.body.id_paciente_cita,
      id_doctor_cita: req.body.id_doctor_cita,
      comen_cita: req.body.comen_cita,
    };

    //usamos la funcion para actualizar
    CitaModelo.updateCita(UniversalData, function (error, data) {
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
      id_cita: req.body.id_cita,
    };

    //usamos la funcion para actualizar
    CitaModelo.deleteCita(UniversalData, function (error, data) {
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
