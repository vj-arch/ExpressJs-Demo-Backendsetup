
const mysql = require("mysql");


var mysqlconnection = mysql.createConnection({

    host: "localhost",
    user : "root",
    password : "password",
    database : "rehamo",
    multipleStatements: true
});

module.exports = mysqlconnection;