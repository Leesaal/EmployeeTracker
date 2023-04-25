// IMPORT DEPENDENCIES

const mysql = require("mysql2");

// CREATE DATABASE CONNECTION

const db = mysql.createConnection(
    {
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: 'rootpassword',
        database: 'employee_db'
    },
    console.log(`Connected to employee database`)
);

module.exports = db;