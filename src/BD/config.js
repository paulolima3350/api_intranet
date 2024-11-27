const sql1 = 'mysql';
const sql2 = 'mysql2';

var mysql = require(process.env.NODE_ENV === 'production'? sql1 : sql2);

const acessoProducao = () => {

  function Connection() {
    this.pool = null;
  
    this.init = function() {
      this.pool = mysql.createPool({
        connectionLimit: process.env.DB_POOL,
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_BASE,
        dateStrings: 'date',
        multipleStatements: true
      });
    };
  
    this.acquire = function(callback) {
      if(process.env.NODE_ENV === 'development') this.init() 
      this.pool.getConnection(function(err, connection) {
        callback(err, connection);
      });
    };
  }
  module.exports = new Connection;

}

const acessoDesenvolvimento = () => {

  const Connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    port: process.env.DB_PORT,
    password: process.env.DB_PASS,
    database: process.env.DB_BASE
  })
  module.exports = Connection;

}

process.env.NODE_ENV === 'production'? acessoProducao() : acessoDesenvolvimento();



