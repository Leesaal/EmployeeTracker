const inquirer = require("inquirer");
const connection = require(".db/connection.js");
const { allowedNodeEnvironmentFlags } = require("process");
require("console.table");

const menu = () => {
    console.log("EMPLOYEE TRACKER");
    inquirer.createPromptModule({
        name: "start",
        type: "list",
        message: "Please choose an action",
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
    })
    .then((answer) => {
        switch (answer.start) {
            case "View all departments":
                ViewAllDepartments();
                break;

            case "View all roles":
                ViewAllRoles();
                break;
            
            case "View all employees":
                ViewAllEmployees();
                break;

            case "Add a department":
                AddDepartment();
                break;

            case "Add a role":
                AddRole();
                break;

            case "Add an employee":
                AddEmployee();
                break;
            
            case "Update an employee role":
                UpdateEmployeeRole();
                break;
        }
    });
};

// VIEW ALL DEPARTMENTS

