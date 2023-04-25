// IMPORT DEPENDENCIES

const mysql = require("mysql2");

// CREATE DATABASE CONNECTION

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'rootpassword',
        database: 'employee_db'
    },
    console.log(`Connected to employee database`)
);

module.exports = db;