const { escape } = require("mysql");
var connection = require("../conexion");

var InformesModelo = {};

InformesModelo.getInformesCalif = function (calif, callback) {
  if (connection) {
    var sql =
      "SELECT " +
      "  doctor.nom1_doc AS 'NOMBRE DEL DOCTOR', " +
      "  calificacion.num_calificacion AS 'CALIFICACION DE LA CITA', " +
      "  cita.comen_cita AS 'COMENTARIO', " +
      "  catalogo_universal.nom_catalogo AS 'ESTADO DE LA CITA', " +
      "  cita.fecha_cita AS 'FECHA DE LA CITA', " +
      "  catalogo_universal_especialidad.nom_catalogo AS 'ESPECIALIDAD DEL DOCTOR' " +
      "FROM cita " +
      "LEFT JOIN calificacion ON cita.id_cita = calificacion.id_cita_calificacion " +
      "LEFT JOIN paciente ON cita.id_paciente_cita = paciente.id_paciente " +
      "INNER JOIN catalogo_universal ON cita.tipo_estado_cita = catalogo_universal.id_catalogo_universal " +
      "LEFT JOIN doctor ON cita.id_doctor_cita = doctor.id_doctor " +
      "LEFT JOIN catalogo_universal AS catalogo_universal_especialidad ON doctor.tipo_espe_doc = catalogo_universal_especialidad.id_catalogo_universal " +
      "WHERE calificacion.num_calificacion <" +
      connection.escape(calif) +
      "AND cita.fecha_cita BETWEEN '2023-11-01' AND '2023-11-30';";

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

InformesModelo.getInformesEsp = function (est, esp, callback) {
    if (connection) {
      var sql =
        "SELECT c.id_calificacion AS 'Id Calificacion', c.num_calificacion AS 'Numero de Calificacion', c.comen_calificacion AS 'Comentarios',cu.nom_catalogo AS 'Especialidad',c_u.nom_catalogo AS 'Estado de la Cita',CONCAT(d.nom1_doc, ' ', d.nom2_doc, ' ', d.apell1_doc, ' ', d.apell2_doc) AS 'Nombre del Doctor' " +
        "FROM calificacion c " +
        "INNER JOIN cita ci ON c.id_cita_calificacion = ci.id_cita " +
        "INNER JOIN catalogo_universal c_u ON ci.tipo_estado_cita = c_u.id_catalogo_universal " +
        "INNER JOIN Doctor d ON ci.id_doctor_cita = d.id_doctor " +
        "INNER JOIN catalogo_universal cu ON d.tipo_espe_doc = cu.id_catalogo_universal " +
        "WHERE ci.tipo_estado_cita = " +
        connection.escape(est) +
        " AND d.tipo_espe_doc = " +
        connection.escape(esp) +
        " AND ci.fecha_cita BETWEEN '2023-10-01' AND '2023-11-30';";  
  
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

module.exports = InformesModelo;
