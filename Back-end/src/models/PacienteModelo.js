var connection = require("../conexion");
//creamos un objeto para ir almacenandotodo lo que necesitemos
var PacienteModelo = {};

PacienteModelo.authenticatePaciente = function (email, password, callback) {
  if (connection) {
    var sql =
      "SELECT id_paciente, login_correo_pac, login_contrasena_pac FROM paciente " +
      "WHERE login_correo_pac = " +
      connection.escape(email) +
      " AND login_contrasena_pac = " +
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
PacienteModelo.getPacientes = function (callback) {
  if (connection) {
    var sql =
      "SELECT p.id_paciente,CONCAT (p.nom1_pac , ' ', p.nom2_pac ,' ', p.apell1_pac,' ', p.apell2_pac) AS 'nombre_pac' , DATE_FORMAT(p.nacimiento_pac, ' %d/%m/%Y ') AS 'nacimiento_pac', p.alergias_pac , p.estatura_pac , " +
      "p.peso_pac, cu.nom_catalogo AS 'tipo_doc', p.num_doc_pac, cus.nom_catalogo AS 'sexo_pac', cuu.nom_catalogo AS 'usuario', p.login_correo_pac FROM paciente p" +
      " INNER JOIN catalogo_universal cu ON cu.id_catalogo_universal = p.tipo_doc_pac" +
      " INNER JOIN catalogo_universal cus ON cus.id_catalogo_universal = p.sexo_pac" +
      " INNER JOIN catalogo_universal cuu ON cuu.id_catalogo_universal = p.tipo_usuario";

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
PacienteModelo.getPacienteTipo = function (tip, callback) {
  if (connection) {
    var sql =
      "SELECT p.id_paciente, CONCAT (p.nom1_pac , ' ', p.nom2_pac ,' ', p.apell1_pac,' ', p.apell2_pac) AS 'nombre_pac', DATE_FORMAT(p.nacimiento_pac, ' %d/%m/%Y ') AS 'nacimiento_pac' , p.alergias_pac, p.estatura_pac, " +
      "p.peso_pac,p.tipo_doc_pac, cu.nom_catalogo AS 'tipo_doc', p.num_doc_pac , cus.nom_catalogo AS 'sexo_pac' , cuu.nom_catalogo AS 'usuario', p.login_correo_pac  FROM paciente p" +
      " INNER JOIN catalogo_universal cu ON cu.id_catalogo_universal = p.tipo_doc_pac" +
      " INNER JOIN catalogo_universal cus ON cus.id_catalogo_universal = p.sexo_pac" +
      " INNER JOIN catalogo_universal cuu ON cuu.id_catalogo_universal = p.tipo_usuario" +
      " WHERE p.tipo_doc_pac = " +
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
PacienteModelo.getPaciente = function (id, callback) {
  if (connection) {
    var sql =
    "SELECT p.id_paciente, CONCAT (p.nom1_pac , ' ', p.nom2_pac ,' ', p.apell1_pac,' ', p.apell2_pac) AS 'nombre_pac', DATE_FORMAT(p.nacimiento_pac, ' %d/%m/%Y ') AS 'nacimiento_pac' , p.alergias_pac, p.estatura_pac, " +
    "p.peso_pac,p.tipo_doc_pac, cu.nom_catalogo AS 'tipo_doc', p.num_doc_pac , cus.nom_catalogo AS 'sexo_pac' , cuu.nom_catalogo AS 'usuario', p.login_correo_pac  FROM paciente p" +
      " INNER JOIN catalogo_universal cu ON cu.id_catalogo_universal = p.tipo_doc_pac" +
      " INNER JOIN catalogo_universal cus ON cus.id_catalogo_universal = p.sexo_pac" +
      " INNER JOIN catalogo_universal cuu ON cuu.id_catalogo_universal = p.tipo_usuario" +
      " WHERE p.id_paciente = " +
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

PacienteModelo.insertPaciente = function (UniversalData, callback) {
  if (connection) {
    var sql = "INSERT INTO paciente SET ?";

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
PacienteModelo.updatePaciente = function (UniversalData, callback) {
  if (connection) {
    var sql =
      "UPDATE paciente SET nom1_pac = " +
      connection.escape(UniversalData.nom1_pac) +
      ",nom2_pac = " +
      connection.escape(UniversalData.nom2_pac) +
      ",apell1_pac = " +
      connection.escape(UniversalData.apell1_pac) +
      ",apell2_pac = " +
      connection.escape(UniversalData.apell2_pac) +
      ",nacimiento_pac = " +
      connection.escape(UniversalData.nacimiento_pac) +
      ",alergias_pac = " +
      connection.escape(UniversalData.alergias_pac) +
      ",estatura_pac = " +
      connection.escape(UniversalData.estatura_pac) +
      ",peso_pac = " +
      connection.escape(UniversalData.peso_pac) +
      ",tipo_doc_pac = " +
      connection.escape(UniversalData.tipo_doc_pac) +
      ",num_doc_pac = " +
      connection.escape(UniversalData.num_doc_pac) +
      ",sexo_pac = " +
      connection.escape(UniversalData.sexo_pac) +
      ",tipo_usuario = " +
      connection.escape(UniversalData.tipo_usuario) +
      ",login_correo_pac = " +
      connection.escape(UniversalData.login_correo_pac) +
      ",login_contrasena_pac = " +
      connection.escape(UniversalData.login_contrasena_pac) +
      " WHERE id_paciente = " +
      connection.escape(UniversalData.id_paciente) +
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

PacienteModelo.deletePaciente = function (UniversalData, callback) {
  if (connection) {
    var sql =
      "DELETE FROM paciente WHERE id_paciente = " +
      connection.escape(UniversalData.id_paciente) +
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

module.exports = PacienteModelo;
