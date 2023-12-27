var connection = require("../conexion");
//creamos un objeto para ir almacenandotodo lo que necesitemos
var ContactoModelo = {};

//---------------------------------------------------------------
//obtenemos todos los Catalogos Universales
ContactoModelo.getContactos = function (callback) {
  if (connection) {
    var sql =
      "SELECT c.id_contacto , CONCAT(p.nom1_pac, ' ', p.nom2_pac, ' ', p.apell1_pac, ' ', p.apell2_pac) AS 'Nombre_Paciente'," +
      "CONCAT(d.nom1_doc, ' ', d.nom2_doc, ' ', d.apell1_doc, ' ', d.apell2_doc) AS 'Nombre_Doctor'," +
      " c.contacto,cu.nom_catalogo AS 'Tipo_Contacto' " +
      "FROM contacto c" +
      " LEFT JOIN paciente p ON c.id_paciente_contacto = p.id_paciente" +
      " LEFT JOIN doctor d ON c.id_doctor_contacto = d.id_doctor" +
      " INNER JOIN catalogo_universal cu ON c.tipo_contacto = cu.id_catalogo_universal;";

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
ContactoModelo.getContactoTipo = function (tip, callback) {
  if (connection) {
    var sql =
      "SELECT c.id_contacto , CONCAT(p.nom1_pac, ' ', p.nom2_pac, ' ', p.apell1_pac, ' ', p.apell2_pac) AS 'Nombre_Paciente'," +
      "CONCAT(d.nom1_doc, ' ', d.nom2_doc, ' ', d.apell1_doc, ' ', d.apell2_doc) AS 'Nombre_Doctor'," +
      " c.contacto, c.tipo_contacto AS 'Id Tipo de Contacto', cu.nom_catalogo AS 'Tipo_Contacto' " +
      "FROM contacto c" +
      " LEFT JOIN paciente p ON c.id_paciente_contacto = p.id_paciente" +
      " LEFT JOIN doctor d ON c.id_doctor_contacto = d.id_doctor" +
      " INNER JOIN catalogo_universal cu ON c.tipo_contacto = cu.id_catalogo_universal" +
      " WHERE `tipo_contacto` = " +
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
ContactoModelo.getContacto = function (id, callback) {
  if (connection) {
    var sql =
    "SELECT c.id_contacto, CONCAT(p.nom1_pac, ' ', p.nom2_pac, ' ', p.apell1_pac, ' ', p.apell2_pac) AS 'Nombre_Paciente'," +
    "CONCAT(d.nom1_doc, ' ', d.nom2_doc, ' ', d.apell1_doc, ' ', d.apell2_doc) AS 'Nombre_Doctor'," +
    " c.contacto, c.tipo_contacto AS 'Id Tipo de Contacto', cu.nom_catalogo AS 'Tipo_Contacto' " +
    "FROM contacto c" +
    " LEFT JOIN paciente p ON c.id_paciente_contacto = p.id_paciente" +
    " LEFT JOIN doctor d ON c.id_doctor_contacto = d.id_doctor" +
    " INNER JOIN catalogo_universal cu ON c.tipo_contacto = cu.id_catalogo_universal" +
    " WHERE c.id_contacto = " +
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
//aÃ±adir un nuevo Catalogo Universal

ContactoModelo.insertContacto = function (UniversalData, callback) {
  if (connection) {
    var sql = "INSERT INTO contacto SET ?";

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
ContactoModelo.updateContacto = function (UniversalData, callback) {
  if (connection) {
    var sql =
      "UPDATE contacto SET tipo_contacto = " +
      connection.escape(UniversalData.tipo_contacto) +
      ",contacto = " +
      connection.escape(UniversalData.contacto) +
      ",id_paciente_contacto = " +
      connection.escape(UniversalData.id_paciente_contacto) +
      ",id_doctor_contacto = " +
      connection.escape(UniversalData.id_doctor_contacto) +
      " WHERE id_contacto = " +
      connection.escape(UniversalData.id_contacto) +
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

ContactoModelo.deleteContacto = function (UniversalData, callback) {
  if (connection) {
    var sql =
      "DELETE FROM contacto WHERE id_contacto = " +
      connection.escape(UniversalData.id_contacto) +
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

module.exports = ContactoModelo;