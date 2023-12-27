var connection = require("../conexion");
//creamos un objeto para ir almacenandotodo lo que necesitemos
var DoctorModelo = {};
//login
DoctorModelo.authenticateDoctor = function (email, password, callback) {
  if (connection) {
    var sql =
      "SELECT id_doctor, login_correo_doc, login_contrasena_doc FROM doctor " +
      "WHERE login_correo_doc = " +
      connection.escape(email) +
      " AND login_contrasena_doc = " +
      connection.escape(password);

    connection.query(sql, function (error, rows) {
      if (error) {
        throw error;
      } else {
        callback(null, rows);
      }
    });
  }
};

//---------------------------------------------------------------
//obtenemos todos los Catalogos Universales
DoctorModelo.getDoctores = function (callback) {
  if (connection) {
    var sql =
      "SELECT d.id_doctor ,CONCAT( d.nom1_doc , ' ',d.nom2_doc,' ', d.apell1_doc,' ' , d.apell2_doc) AS 'nom_doc', DATE_FORMAT(d.nacimiento_doc, ' %d/%m/%Y ') AS 'nacimiento_doc' , d.horario_doc, " +
      "cu.nom_catalogo AS 'tipo_doc', d.num_doc_doc, cus.nom_catalogo AS 'Sexo', cuu.nom_catalogo AS 'tipo_usuario', cue.nom_catalogo AS 'Especialidad', d.login_correo_doc FROM doctor d" +
      " INNER JOIN catalogo_universal cu ON cu.id_catalogo_universal = d.tipo_docu_doc" +
      " INNER JOIN catalogo_universal cus ON cus.id_catalogo_universal = d.sexo_doc" +
      " INNER JOIN catalogo_universal cuu ON cuu.id_catalogo_universal = d.tipo_usuario_doc" +
      " INNER JOIN catalogo_universal cue ON cue.id_catalogo_universal = d.tipo_espe_doc";

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
DoctorModelo.getDoctorTipo = function (tip, callback) {
  if (connection) {
    var sql =
      "SELECT d.id_doctor, CONCAT( d.nom1_doc ,' ', d.nom2_doc,' ', d.apell1_doc,' ' , d.apell2_doc) AS 'nom_doc', DATE_FORMAT(d.nacimiento_doc, ' %d/%m/%Y ') AS 'nacimiento_doc', d.horario_doc , " +
      "cu.nom_catalogo AS 'tipo_doc', d.num_doc_doc, cus.nom_catalogo AS 'Sexo', cuu.nom_catalogo AS 'tipo_usuario', d.tipo_espe_doc, cue.nom_catalogo AS 'Especialidad', d.login_correo_doc FROM doctor d" +
      " INNER JOIN catalogo_universal cu ON cu.id_catalogo_universal = d.tipo_docu_doc" +
      " INNER JOIN catalogo_universal cus ON cus.id_catalogo_universal = d.sexo_doc" +
      " INNER JOIN catalogo_universal cuu ON cuu.id_catalogo_universal = d.tipo_usuario_doc" +
      " INNER JOIN catalogo_universal cue ON cue.id_catalogo_universal = d.tipo_espe_doc" +
      " WHERE d.tipo_espe_doc = " +
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
DoctorModelo.getDoctor = function (id, callback) {
  if (connection) {
    var sql =
    "SELECT d.id_doctor ,CONCAT( d.nom1_doc , ' ',d.nom2_doc,' ', d.apell1_doc,' ' , d.apell2_doc) AS 'nom_doc', DATE_FORMAT(d.nacimiento_doc, ' %d/%m/%Y ') AS 'nacimiento_doc' , d.horario_doc, " +
    "cu.nom_catalogo AS 'tipo_doc', d.num_doc_doc, cus.nom_catalogo AS 'Sexo', cuu.nom_catalogo AS 'tipo_usuario', cue.nom_catalogo AS 'Especialidad', d.login_correo_doc FROM doctor d" +
    " INNER JOIN catalogo_universal cu ON cu.id_catalogo_universal = d.tipo_docu_doc" +
    " INNER JOIN catalogo_universal cus ON cus.id_catalogo_universal = d.sexo_doc" +
    " INNER JOIN catalogo_universal cuu ON cuu.id_catalogo_universal = d.tipo_usuario_doc" +
    " INNER JOIN catalogo_universal cue ON cue.id_catalogo_universal = d.tipo_espe_doc" +
    " WHERE d.id_doctor = " +
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

//---------------------------------------------------------------
//añadir un nuevo Catalogo Universal

DoctorModelo.insertDoctor = function (UniversalData, callback) {
  if (connection) {
    var sql = "INSERT INTO doctor SET ?";

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

//---------------------------------------------------------------
//actualizar un Catalogo Universal
DoctorModelo.updateDoctor = function (UniversalData, callback) {
  if (connection) {
    var sql =
      "UPDATE doctor SET nom1_doc = " +
      connection.escape(UniversalData.nom1_doc) +
      ",nom2_doc = " +
      connection.escape(UniversalData.nom2_doc) +
      ",apell1_doc = " +
      connection.escape(UniversalData.apell1_doc) +
      ",apell2_doc = " +
      connection.escape(UniversalData.apell2_doc) +
      ",nacimiento_doc = " +
      connection.escape(UniversalData.nacimiento_doc) +
      ",horario_doc = " +
      connection.escape(UniversalData.horario_doc) +
      ",tipo_docu_doc = " +
      connection.escape(UniversalData.tipo_docu_doc) +
      ",num_doc_doc = " +
      connection.escape(UniversalData.num_doc_doc) +
      ",sexo_doc = " +
      connection.escape(UniversalData.sexo_doc) +
      ",tipo_usuario_doc = " +
      connection.escape(UniversalData.tipo_usuario_doc) +
      ",tipo_espe_doc = " +
      connection.escape(UniversalData.tipo_espe_doc) +
      ",login_correo_doc = " +
      connection.escape(UniversalData.login_correo_doc) +
      ",login_contrasena_doc = " +
      connection.escape(UniversalData.login_contrasena_doc) +
      " WHERE id_doctor = " +
      connection.escape(UniversalData.id_doctor) +
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

DoctorModelo.deleteDoctor = function (UniversalData, callback) {
  if (connection) {
    var sql =
      "DELETE FROM doctor WHERE id_doctor = " +
      connection.escape(UniversalData.id_doctor) +
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

module.exports = DoctorModelo;
