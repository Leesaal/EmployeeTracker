// IMPORT PACKAGES

const e = require("express");
const inquirer = require("inquirer");
const { exit } = require("process");
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
                Exit();
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
    const query = `SELECT role.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee
    LEFT JOIN role ON employee.role_id = role.id
    LEFT JOIN department ON role.department_id = department.id
    LEFT JOIN employee manager ON manager.id = employee.manager_id;`;
    connection
    .promise()
    .query(query)
    .then((data) => {
        console.table(data[0]);
        menu();
    })
}


// ADD A DEPARTMENT

function addDepartment() {
    inquirer
    .prompt([
        {
            type: "input",
            name: "name",
            message: "What is the name of the department? ",
        },
    ])
    .then((data) => {
        const { name } = data;
        connection
        .query(
            `INSERT INTO department (name) VALUES (?)`, 
            [name],
            (err, res)  => {
                if (err) throw err;
                console.log(`Department ${name} now added`);
                viewAllDepartments();
            }
        );
    });
}


// ADD A ROLE

function addRole() {
    const query = `SELECT department.name
    FROM department`;
    connection
    .query(query, (err, data) => {
        if (err) throw err;
    

        // CREATE DEPARTMENT NAMES LIST

        const departmentNames = data.map((item) => `${item.name}`);
    
    inquirer
    .prompt([
        {
            type: "input",
            name: "title",
            message: "What is the name of the role? ",
        },
        {
            type: "input",
            name: "salary",
            message: "What is the salary of the role? ",
        },
        {
            type: "list",
            name: "department_name",
            message: "Which department does the role belong to? ",
            choices: [...departmentNames],
        }
    ])
    .then(function (answer) {
        const query = `INSERT INTO role 
        SET ?`
        connection
        .query(query, {
            title: answer.title,
            salary: answer.salary,
            department_id: answer.department_name
        },
        function (err, res) {
            
            console.table(res);
            console.log("New role added");
            viewAllRoles();
        }
        )}
        );
        });
    };



// ADD AN EMPLOYEE

function addEmployee() {
    const query = `SELECT role`
}


// UPDATE AN EMPLOYEE ROLE

function updateEmployeeRole() {

}


// EXIT

function Exit() {
    console.log("Bye!");
    connection
    .end();
}


// SHOW MENU

menu();
