const inquirer = require('inquirer');
const connection = require('./db/connection');
require('console.table');
var path = require('path');
var fs =require('fs');


connection.connect(function(){
    questions();
})

const questions = () => {
    inquirer.prompt([
        {
            type: 'list',
            name: 'action',
            message: 'What would you like to do?',
            choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role'],
        },
    ])
    
    .then((answer) => {
        switch (answer.action) {
          case "Add a department":
            addDepartment();
            break;
  
          case "Add an employee":
            addEmployee();
            break;
  
          case "Add a role":
            addRole();
            break;
  
          case "View all departments":
            viewDeparments();
            break;
  
          case "View all employees":
            viewEmployees();
            break;
  
          case "View all roles":
            viewRoles();
            break;

          case "Update an employee role":
          updateRoles();
          break;
  
        }
    });
};
function addRole() {
     connection.query('SELECT * FROM department', function(err, data) {
          const allDepartments = data.map(department => {
              return{
                  name: department.name,
                  value: department.id
              }
          })

          inquirer.prompt([{
              type: 'input',
              name: 'title',
              message: 'Enter a new title'
          },{
              type: 'input',
              name: 'salary',
              message: 'Enter new salary'
          },
          {
              type: 'list',
              name: 'department_id',
              message: 'Choose the following department',
              choices: allDepartments
          }
        ]).then(function(answers) {
            connection.query(`INSERT INTO roles(title, salary,department_id) VALUES('${answers.title}', '${answers.salary}',${answers.department_id} )`, function(err, data) {
                console.log('Your new role has been added')
                questions();
            } )
        })
     })
}

function addEmployee() {
    connection.query('SELECT * FROM employee', function(err, data) {
        const allEmployee = data.map(employee => {
            return{
                name: employee.name,
                value: employee.id
                }
            })

    inquirer.prompt([{
        type: 'input',
        name: 'first_name',
        message: 'What is the first name of the new employee?'
    },
    {
        type: 'input',
        name:'last_name',
        message: 'What is the last name of the new employee?'
    },
    {
        type: 'input',
        name: 'role_id',
        message: 'What is role id?'
    },
    {
        type: 'input',
        name: 'manager_id',
        message: 'Who is the manager?'
    }
    ]).then(function(answers){
        connection.query(`INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES('${answers.first}', '${answers.last}', '${answers.role_id}','${answers.manager_id}')`, function(err, data) {
            console.log('Your new employee has been added')
            questions();
        })
    })
})
}


function addDepartment() {
     inquirer.prompt({
         type: 'input',
         name: 'department',
         message: 'What is your new department?'
     })
     .then(function(answers){
       connection.query(`INSERT INTO department (name) VALUES('${answers.department}') `, function(err, data){
           console.log('Your new department has been added')
           questions();
       })
     })
}

function viewDeparments() {
    connection.query('SELECT * FROM department', function(err, data){
       console.table(data)
       questions();
    })
}

function viewRoles() {
    connection.query('SELECT * FROM roles', function(err, data){
       console.table(data)
       questions();
    })
}

function viewEmployees() {
    connection.query('SELECT * FROM employee', function(err, data){
       console.table(data)
       questions();
    })
}

function updateRoles() {
    connection.query(`SELECT * FROM `)
}

