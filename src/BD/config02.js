const sql1 = 'mysql';
const sql2 = 'mysql2';

var mysql = require('mysql');

function Connection() {
    this.pool = null;
  
    this.init = function() {
      this.pool = mysql.createPool({
        connectionLimit: process.env.DB_BASE_POOL,
        host: process.env.DB_BASE_HOST,
        user: process.env.DB_BASE_USER,
        password: process.env.DB_BASE_PASS,
        database: process.env.DB_BASE_BUDGET,
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