var connection = require("../conexion");
//creamos un objeto para ir almacenandotodo lo que necesitemos
var CitaModelo = {};

//---------------------------------------------------------------
//obtenemos todos los Catalogos Universales
CitaModelo.getCitas = function (callback) {
  if (connection) {
    var sql =
      "SELECT c.id_cita ,  DATE_FORMAT(c.fecha_cita, ' %H:%i %d/%m/%Y ') AS 'fecha_cita', c.comen_cita, cue.nom_catalogo AS 'Estado_cita', p.id_paciente AS 'Id Paciente',CONCAT(p.nom1_pac, ' ', p.nom2_pac, ' ', p.apell1_pac, ' ', p.apell2_pac) AS 'Nombre_Paciente',d.id_doctor AS 'Id_Doctor' ,CONCAT(d.nom1_doc, ' ', d.nom2_doc, ' ', d.apell1_doc, ' ', d.apell2_doc) AS 'Nombre_Doctor', cu.nom_catalogo AS 'Especialidad' " +
      "FROM cita c " +
      "INNER JOIN paciente p ON c.id_paciente_cita = p.id_paciente " +
      "INNER JOIN doctor d ON c.id_doctor_cita = d.id_doctor " +
      "INNER JOIN catalogo_universal cu ON d.tipo_espe_doc = cu.id_catalogo_universal " +
      "INNER JOIN catalogo_universal cue ON c.tipo_estado_cita = cue.id_catalogo_universal ";

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
CitaModelo.getCitaTipo = function (tip, callback) {
  if (connection) {
    var sql =
      "SELECT c.id_cita , DATE_FORMAT(c.fecha_cita, ' %H:%i %d/%m/%Y ') AS 'fecha_cita' , c.comen_cita, c.tipo_estado_cita ,cuc.nom_catalogo AS 'tipo_estado', p.id_paciente AS 'Id Paciente',CONCAT(p.nom1_pac, ' ', p.nom2_pac, ' ', p.apell1_pac, ' ', p.apell2_pac) AS 'Nombre_Paciente',d.id_doctor AS 'Id Doctor' ,CONCAT(d.nom1_doc, ' ', d.nom2_doc, ' ', d.apell1_doc, ' ', d.apell2_doc) AS 'Nombre_Doctor', cu.nom_catalogo AS 'Especialidad' " +
      "FROM cita c " +
      "INNER JOIN paciente p ON c.id_paciente_cita = p.id_paciente " +
      "INNER JOIN doctor d ON c.id_doctor_cita = d.id_doctor " +
      "INNER JOIN catalogo_universal cu ON d.tipo_espe_doc = cu.id_catalogo_universal " +
      "INNER JOIN catalogo_universal cuc ON c.tipo_estado_cita = cuc.id_catalogo_universal " +
      "WHERE c.tipo_estado_cita = " +
      connection.escape(tip) +
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
CitaModelo.getCitaId = function (id, callback) {
  if (connection) {
    var sql =
    "SELECT c.id_cita ,  DATE_FORMAT(c.fecha_cita, ' %H:%i %d/%m/%Y ') AS 'fecha_cita', c.comen_cita, cue.nom_catalogo AS 'Estado_cita', p.id_paciente AS 'Id Paciente',CONCAT(p.nom1_pac, ' ', p.nom2_pac, ' ', p.apell1_pac, ' ', p.apell2_pac) AS 'Nombre_Paciente',d.id_doctor AS 'Id_Doctor' ,CONCAT(d.nom1_doc, ' ', d.nom2_doc, ' ', d.apell1_doc, ' ', d.apell2_doc) AS 'Nombre_Doctor', cu.nom_catalogo AS 'Especialidad' " +
    "FROM cita c " +
      "INNER JOIN paciente p ON c.id_paciente_cita = p.id_paciente " +
      "INNER JOIN doctor d ON c.id_doctor_cita = d.id_doctor " +
      "INNER JOIN catalogo_universal cu ON d.tipo_espe_doc = cu.id_catalogo_universal " +
      "INNER JOIN catalogo_universal cue ON c.tipo_estado_cita = cue.id_catalogo_universal " +
      "WHERE c.id_cita = " +
      connection.escape(id) +
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

//Solo puede traer las citas de Un Paciente en Especifico
CitaModelo.getCita = function (idPaciente, callback) {
  if (connection) {
    var sql =
      "SELECT c.id_cita AS 'Id Cita', c.fecha_cita , c.tipo_estado_cita, CONCAT(p.nom1_pac, ' ', p.nom2_pac, ' ', p.apell1_pac, ' ', p.apell2_pac) AS 'Nombre Paciente',d.id_doctor AS 'Id Docotor', CONCAT(d.nom1_doc, ' ', d.nom2_doc, ' ', d.apell1_doc, ' ', d.apell2_doc) AS 'Nombre Doctor', cu.nom_catalogo AS 'Especialidad' " +
      "FROM cita c " +
      "INNER JOIN paciente p ON c.id_paciente_cita = p.id_paciente " +
      "INNER JOIN doctor d ON c.id_doctor_cita = d.id_doctor " +
      "INNER JOIN catalogo_universal cu ON d.tipo_espe_doc = cu.id_catalogo_universal " +
      "WHERE c.id_paciente_cita = " +
      connection.escape(idPaciente) +
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

CitaModelo.postInformeCalificacionCita = function(parametros,callback)
{
  if(connection)
  {
    var sql =
    "SELECT " +  
      "  doctor.nom1_doc AS 'NOMBRE_DEL_DOCTOR', " +
      "  calificacion.num_calificacion AS 'CALIFICACION_DE_LA_CITA', " +
      "  cita.comen_cita AS 'COMENTARIO', " +
      "  catalogo_universal.nom_catalogo AS 'ESTADO_DE_LA_CITA', " +
      "  DATE_FORMAT(cita.fecha_cita, ' %H:%i %d/%m/%Y ') AS 'FECHA_DE_LA_CITA', " +
      "  catalogo_universal_especialidad.nom_catalogo AS 'ESPECIALIDAD_DEL_DOCTOR' " +
      "FROM cita " +
      "LEFT JOIN calificacion ON cita.id_cita = calificacion.id_cita_calificacion " +
      "LEFT JOIN paciente ON cita.id_paciente_cita = paciente.id_paciente " +
      "INNER JOIN catalogo_universal ON cita.tipo_estado_cita = catalogo_universal.id_catalogo_universal " +
      "LEFT JOIN doctor ON cita.id_doctor_cita = doctor.id_doctor " +
      "LEFT JOIN catalogo_universal AS catalogo_universal_especialidad ON doctor.tipo_espe_doc = catalogo_universal_especialidad.id_catalogo_universal " +
      "WHERE calificacion.num_calificacion <" +
      connection.escape(parametros.calificacion) +
      " AND cita.fecha_cita BETWEEN "+connection.escape(parametros.fechaInicio)+" AND "+connection.escape(parametros.fechaFin)+";";

      connection.query(sql,function(error,row)
      {
        if (error)
        {
          throw error;
        }
        else
        {
          callback(null, row);
        }
      })
  }
}

CitaModelo.postInformeEspeCita = function(parametros,callback)
{
  if(connection)
  {
    var sql = 
    "SELECT c.id_calificacion AS 'Id_Calificacion', c.num_calificacion AS 'Numero_de_Calificacion', c.comen_calificacion AS 'Comentarios',cu.nom_catalogo AS 'Especialidad',c_u.nom_catalogo AS 'Estado_de_la_Cita',CONCAT(d.nom1_doc, ' ', d.nom2_doc, ' ', d.apell1_doc, ' ', d.apell2_doc) AS 'Nombre_del_Doctor' " +
        "FROM calificacion c " +
        "INNER JOIN cita ci ON c.id_cita_calificacion = ci.id_cita " +
        "INNER JOIN catalogo_universal c_u ON ci.tipo_estado_cita = c_u.id_catalogo_universal " +
        "INNER JOIN Doctor d ON ci.id_doctor_cita = d.id_doctor " +
        "INNER JOIN catalogo_universal cu ON d.tipo_espe_doc = cu.id_catalogo_universal " +
        "WHERE ci.tipo_estado_cita = " +
        connection.escape(parametros.estado) +
        " AND d.tipo_espe_doc = " +
        connection.escape(parametros.especialidad) +
        " AND ci.fecha_cita BETWEEN "+connection.escape(parametros.fechaInicio)+" AND "+connection.escape(parametros.fechaFin)+";";  

    // console.log(sql)
    connection.query(sql,function(error,row)
    {
      if (error)
      {
        throw error;
      }
      else
      {
        callback(null, row);
      }
    });
  };
};

//---------------------------------------------------------------
//aÃ±adir un nuevo Catalogo Universal

CitaModelo.insertCita = function (UniversalData, callback) {
  if (connection) {
    var sql = "INSERT INTO cita SET ?";

    connection.query(sql, UniversalData, function (error, result) {
      //se muestra el mensaje correspondiente
      if (error) {
        callback(null, { msg: "Se presento un error" });
        throw error;
      } else {
        callback(null, { msg: "Registro Insertado Satisfactoriamente" });
      }
    });
  }
};

//---------------------------------------------------------------S
//actualizar un Catalogo Universal
CitaModelo.updateCita = function (UniversalData, callback) {
  if (connection) {
    var sql =
      "UPDATE cita SET fecha_cita = " +
      connection.escape(UniversalData.fecha_cita) +
      ",tipo_estado_cita = " +
      connection.escape(UniversalData.tipo_estado_cita) +
      ",id_paciente_cita = " +
      connection.escape(UniversalData.id_paciente_cita) +
      ",id_doctor_cita = " +
      connection.escape(UniversalData.id_doctor_cita) +
      ",comen_cita = " +
      connection.escape(UniversalData.comen_cita) +
      " WHERE id_cita = " +
      connection.escape(UniversalData.id_cita) +
      ";";

    connection.query(sql, function (error, result) {
      //se muestra el mensaje correspondiente
      if (error) {
        throw error;
      } else {
        callback(null, { msg: "Registro Actualizado Satisfactoriamente" });
      }
    });
  }
};

CitaModelo.deleteCita = function (UniversalData, callback) {
  if (connection) {
    var sql =
      "DELETE FROM cita WHERE id_cita = " +
      connection.escape(UniversalData.id_cita) +
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

module.exports = CitaModelo;