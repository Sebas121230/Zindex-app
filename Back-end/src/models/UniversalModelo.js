var connection = require("../conexion");
//creamos un objeto para ir almacenandotodo lo que necesitemos
var UniversalModelo = {};

//---------------------------------------------------------------
//obtenemos todos los Catalogos Universales
UniversalModelo.getUniversales = function (callback) {
  if (connection) {
    var sql =
      "SELECT id_catalogo_universal , nom_catalogo , tipo_catalogo FROM catalogo_universal";

    connection.query(sql, function (error, rows) {
      if (error) {
        console.log(error)
        throw error;
      } else {
        callback(null, rows);
        //callback(null, JSON.stringify(rows));
      }
    });
  }
};

UniversalModelo.getUniversalIdTip = function (tipcat, id, callback) {
  if (connection) {
    var sql =
      "SELECT id_catalogo_universal , nom_catalogo AS 'Nombre del Catalogo', tipo_catalogo AS 'Tipo Catalogo'FROM catalogo_universal " +
      "WHERE tipo_catalogo  = " + connection.escape(tipcat) +
      "AND id_catalogo_universal = " + connection.escape(id) + ";";

    connection.query(sql, function (error, rows) {
      if (error) {
        console.log(error)
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
UniversalModelo.getUniversalTipo = function (tip, callback) {
  if (connection) {
    var sql =
      "SELECT `id_catalogo_universal`, `nom_catalogo`, `tipo_catalogo` FROM `catalogo_universal` WHERE `tipo_Catalogo` = " +
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
UniversalModelo.getUniversal = function (id, callback) {
  if (connection) {
    var sql = "SELECT id_catalogo_universal, `nom_catalogo`, `tipo_catalogo` FROM `catalogo_universal` WHERE `id_catalogo_universal` = " +
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

UniversalModelo.getUniversalDoc = function (callback) {
  if (connection) {
    var sql =
      "SELECT id_catalogo_universal, nom_catalogo FROM catalogo_universal WHERE tipo_catalogo = 2";

    connection.query(sql, function (error, rows) {
      if (error) {
        console.log(error)
        throw error;
      } else {
        callback(null, rows);
        //callback(null, JSON.stringify(rows));
      }
    });
  }
};

UniversalModelo.getUniversalSexo = function (callback) {
  if (connection) {
    var sql =
      "SELECT id_catalogo_universal, nom_catalogo FROM catalogo_universal WHERE tipo_catalogo = 4";

    connection.query(sql, function (error, rows) {
      if (error) {
        console.log(error)
        throw error;
      } else {
        callback(null, rows);
        //callback(null, JSON.stringify(rows));
      }
    });
  }
};

UniversalModelo.getUniversalUsuario = function (callback) {
  if (connection) {
    var sql =
      "SELECT id_catalogo_universal, nom_catalogo FROM catalogo_universal WHERE tipo_catalogo = 6";

    connection.query(sql, function (error, rows) {
      if (error) {
        console.log(error)
        throw error;
      } else {
        callback(null, rows);
        //callback(null, JSON.stringify(rows));
      }
    });
  }
};

UniversalModelo.getUniversalEspecialidad = function (callback) {
  if (connection) {
    var sql =
      "SELECT id_catalogo_universal, nom_catalogo FROM catalogo_universal WHERE tipo_catalogo = 5";

    connection.query(sql, function (error, rows) {
      if (error) {
        console.log(error)
        throw error;
      } else {
        callback(null, rows);
        //callback(null, JSON.stringify(rows));
      }
    });
  }
};

UniversalModelo.getUniversalContacto = function (callback) {
  if (connection) {
    var sql =
      "SELECT id_catalogo_universal, nom_catalogo FROM catalogo_universal WHERE tipo_catalogo = 3";

    connection.query(sql, function (error, rows) {
      if (error) {
        console.log(error)
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

UniversalModelo.insertUniversal = function (UniversalData, callback) {
  if (connection) {
    var sql = "INSERT INTO catalogo_universal SET ?";
    connection.query(sql, UniversalData, function (error, result) {
      //se muestra el mensaje correspondiente
      if (error) {
        callback(null, { msg: "Se presento un error" });
        throw error;
      } else {
        callback(null, { msg: "Registro Insertado" });
      }
    });
  }
};

//---------------------------------------------------------------
//actualizar un Catalogo Universal
UniversalModelo.updateUniversal = function (UniversalData, callback) {
  if (connection) {
    var sql =
      "UPDATE `catalogo_universal` SET `nom_catalogo` = " +
      connection.escape(UniversalData.nom_catalogo) +
      ", `tipo_catalogo` = " +
      connection.escape(UniversalData.tipo_catalogo) +
      " WHERE `id_catalogo_universal` = " +
      connection.escape(UniversalData.id_catalogo_universal) +
      ";";

    connection.query(sql, function (error, result) {
      //se muestra el mensaje correspondiente
      if (error) {
        throw error;
      } else {
        callback(null, { msg: "Registro Actualizado" });
      }
    });
  }
};

UniversalModelo.deleteUniversal = function (UniversalData, callback) {
  if (connection) {
    var sql =
      "DELETE FROM `catalogo_universal` WHERE `id_catalogo_universal` = " +
      connection.escape(UniversalData.id_catalogo_universal) +
      ";";
    connection.query(sql, function (error, result) {
      //se muestra el mensaje correspondiente
      if (error) {
        throw error;
      } else {
        callback(null, { msg: "Registro Eliminado" });
      }
    });
  }
};

module.exports = UniversalModelo;
