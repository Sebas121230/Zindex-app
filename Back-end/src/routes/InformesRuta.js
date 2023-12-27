var InformesModelo = require("../models/InformesModelo");
var express = require("express");
var router = express.Router();

module.exports = function () {
  //---------------------------------------------------------------
  //Muestra el método CRUL Listar que muestra todos los tipos de documentos

  router.get("/:calif", function (req, res) {
    var calif = req.params.calif;

    //solo actualizamos si el tip es un número
    if (!isNaN(calif)) {
      InformesModelo.getInformesCalif(calif, function (error, data) {
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

  router.get("/:est/:esp", function (req, res) {
    var esp = req.params.esp;
    var est = req.params.est

    //solo actualizamos si el tip es un número
    if (!isNaN(esp) && !isNaN(est)) {
      InformesModelo.getInformesEsp(est,esp, function (error, data) {
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

  return router;
};
