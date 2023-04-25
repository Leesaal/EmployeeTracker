// IMPORT PACKAGES

const e = require("express");
const inquirer = require("inquirer");
const connection = require("./db/connection.js");
require("console.table");


// CREATE MENU

const menu = () => {
    console.log("EMPLOYEE TRACKER");
    inquirer.prompt([
        {
        name: "start",
        type: "list",
        message: "What would you like to do? ",
        choices: [
            "View all departments",
            "View all roles",
            "View all employees",
            "Add a department",
            "Add a role",
            "Add an employee",
            "Update an employee role",
            "Exit",
        ],
    }
])  
    .then((answer) => {
        switch (answer.start) {
            case "View all departments":
                viewAllDepartments();
                break;

            case "View all roles":
                viewAllRoles();
                break;
            
            case "View all employees":
                viewAllEmployees();
                break;

            case "Add a department":
                addDepartment();
                break;

            case "Add a role":
                addRole();
                break;

            case "Add an employee":
                addEmployee();
                break;
            
            case "Update an employee role":
                updateEmployeeRole();
                break;

            case "Exit":
                exit();
                break;
        }
    });
};


// VIEW ALL DEPARTMENTS

function viewAllDepartments() {
    const query = `SELECT department.id, department.name
    FROM department;`;
    connection
    .promise()
    .query(query)
    .then((data) => {
        console.table(data[0]);
        menu();
    })  
};


// VIEW ALL ROLES

function viewAllRoles() {
    const query = `SELECT role.id, role.title, role.salary, department.name AS department
    FROM role
    LEFT JOIN department ON
    role.department_id = department.id;`;
    connection
    .promise()
    .query(query)
    .then((data) => {
        console.table(data[0]);
        menu();
    })
}

// VIEW ALL EMPLOYEES

function viewAllEmployees() {
    
}

menu();
