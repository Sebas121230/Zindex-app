var connection = require("../conexion");
//creamos un objeto para ir almacenandotodo lo que necesitemos
var CalificacionModelo = {};

//---------------------------------------------------------------
//obtenemos todos los Catalogos Universales
CalificacionModelo.getCalificaciones = function (callback) {
  if (connection) {
    var sql =
      "SELECT cal.id_calificacion, cal.num_calificacion, cal.comen_calificacion, cal.id_cita_calificacion AS 'Id_cita_Calif', CONCAT(p.nom1_pac, ' ', p.nom2_pac, ' ', p.apell1_pac, ' ', p.apell2_pac) AS 'Nombre_Paciente', " +
      "CONCAT(d.nom1_doc, ' ', d.nom2_doc, ' ', d.apell1_doc, ' ', d.apell2_doc) AS 'Nombre_Doctor', DATE_FORMAT(c.fecha_cita, ' %H:%i %d/%m/%Y ') AS 'fecha_cita' FROM calificacion cal " +
      "INNER JOIN cita c ON cal.id_cita_calificacion = c.id_cita " +
      "INNER JOIN paciente p ON c.id_paciente_cita = p.id_paciente " +
      "INNER JOIN doctor d ON c.id_doctor_cita = d.id_doctor";

    connection.query(sql, function (error, rows) {
      if (error) {
        throw error;
      } else {
        callback(null, rows);
        //callback(null, JSON.stringify(rows));
      }
    });
  }
};

//---------------------------------------------------------------
//obtenemos un tipo de Catalogo Universal
CalificacionModelo.getCalificacionTipo = function (calif, callback) {
  if (connection) {
    var sql =
      "SELECT cal.id_calificacion , cal.num_calificacion , cal.comen_calificacion , cal.id_cita_calificacion , CONCAT(p.nom1_pac, ' ', p.nom2_pac, ' ', p.apell1_pac, ' ', p.apell2_pac) AS 'Nombre_Paciente', " +
      "CONCAT(d.nom1_doc, ' ', d.nom2_doc, ' ', d.apell1_doc, ' ', d.apell2_doc) AS 'Nombre_Doctor', DATE_FORMAT(c.fecha_cita, ' %H:%i %d/%m/%Y ') AS 'fecha_cita' FROM calificacion cal " +
      "INNER JOIN cita c ON cal.id_cita_calificacion = c.id_cita " +
      "INNER JOIN paciente p ON c.id_paciente_cita = p.id_paciente " +
      "INNER JOIN doctor d ON c.id_doctor_cita = d.id_doctor " +
      "WHERE cal.num_calificacion = " +
      connection.escape(calif);
    (";");

    connection.query(sql, function (error, rows) {
      //se muestra el mensaje correspondiente
      if (error) {
        throw error;
      } else {
        callback(null, rows);
        //callback(null, JSON.stringify(rows));
      }
    });
  }
};

//Solo calicaciones por Especialidad
CalificacionModelo.getCalificacionTipoEsp = function (califesp, callback) {
  if (connection) {
    var sql =
      "SELECT cal.id_calificacion AS 'ID de Calificación', cal.num_calificacion AS 'Número de Calificación', cal.comen_calificacion AS 'Comentario'," +
      "CONCAT(p.nom1_pac, ' ', p.nom2_pac, ' ', p.apell1_pac, ' ', p.apell2_pac) AS 'Nombre del Paciente'," +
      "CONCAT(d.nom1_doc, ' ', d.nom2_doc, ' ', d.apell1_doc, ' ', d.apell2_doc) AS 'Nombre del Doctor'," +
      "cu.nom_catalogo AS 'Especialidad del Doctor'," +
      "cal.id_cita_calificacion AS 'ID de Cita'" +
      "FROM calificacion cal" +
      " INNER JOIN cita c ON cal.id_cita_calificacion = c.id_cita" +
      " INNER JOIN paciente p ON c.id_paciente_cita = p.id_paciente" +
      " INNER JOIN doctor d ON c.id_doctor_cita = d.id_doctor" +
      " INNER JOIN catalogo_universal cu ON d.tipo_espe_doc = cu.id_catalogo_universal" +
      " WHERE d.tipo_espe_doc = " +
      connection.escape(califesp) +
      ";";

    connection.query(sql, function (error, rows) {
      //se muestra el mensaje correspondiente
      if (error) {
        throw error;
      } else {
        callback(null, rows);
        //callback(null, JSON.stringify(rows));
      }
    });
  }
};

//---------------------------------------------------------------
//---------------------------------------------------------------
//obtenemos un Catalogo Universal por su id
CalificacionModelo.getCalificacion = function (id, callback) {
  if (connection) {
    var sql =
    "SELECT cal.id_calificacion, cal.num_calificacion, cal.comen_calificacion, cal.id_cita_calificacion AS 'Id_cita_Calif', CONCAT(p.nom1_pac, ' ', p.nom2_pac, ' ', p.apell1_pac, ' ', p.apell2_pac) AS 'Nombre_Paciente', " +
    "CONCAT(d.nom1_doc, ' ', d.nom2_doc, ' ', d.apell1_doc, ' ', d.apell2_doc) AS 'Nombre_Doctor', DATE_FORMAT(c.fecha_cita, ' %H:%i %d/%m/%Y ') AS 'fecha_cita' FROM calificacion cal " +
      "INNER JOIN cita c ON cal.id_cita_calificacion = c.id_cita " +
      "INNER JOIN paciente p ON c.id_paciente_cita = p.id_paciente " +
      "INNER JOIN doctor d ON c.id_doctor_cita = d.id_doctor " +
      "WHERE cal.id_calificacion = " +
      connection.escape(id);
    (";");

    connection.query(sql, function (error, rows) {
      //se muestra el mensaje correspondiente
      if (error) {
        throw error;
      } else {
        callback(null, rows);
        //callback(null, JSON.stringify(rows));
      }
    });
  }
};

//---------------------------------------------------------------
//añadir un nuevo Catalogo Universal

CalificacionModelo.insertCalificacion = function (UniversalData, callback) {
  if (connection) {
    var sql = "INSERT INTO calificacion SET ?";

    connection.query(sql, UniversalData, function (error, result) {
      //se muestra el mensaje correspondiente
      if (error) {
        callback(null, { msg: "Ocurrio un error inesperado" });
      } else {
        callback(null, { msg: "Registro Insertado Satisfactoriamente" });
      }
    });
  }
};

//---------------------------------------------------------------
//actualizar un Catalogo Universal
CalificacionModelo.updateCalificacion = function (UniversalData, callback) {
  if (connection) {
    var sql =
      "UPDATE calificacion SET num_calificacion = " +
      connection.escape(UniversalData.num_calificacion) +
      ",comen_calificacion = " +
      connection.escape(UniversalData.comen_calificacion) +
      ",id_cita_calificacion = " +
      connection.escape(UniversalData.id_cita_calificacion) +
      " WHERE id_calificacion = " +
      connection.escape(UniversalData.id_calificacion) +
      ";";

    connection.query(sql, function (error, result) {
      //se muestra el mensaje correspondiente
      if (error) {
        callback(null, { msg: "Ocurrio un error inesperado" });
      } else {
        callback(null, { msg: "Registro Actualizado Satisfactoriamente" });
      }
    });
  }
};

CalificacionModelo.deleteCalificacion = function (UniversalData, callback) {
  if (connection) {
    var sql =
      "DELETE FROM calificacion WHERE id_calificacion = " +
      connection.escape(UniversalData.id_calificacion) +
      ";";

    connection.query(sql, function (error, result) {
      //se muestra el mensaje correspondiente
      if (error) {
        throw error;
      } else {
        callback(null, { msg: "Registro Eliminado Satisfactoriamente" });
      }
    });
  }
};

module.exports = CalificacionModelo;
