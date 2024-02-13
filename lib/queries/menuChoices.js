const inquirer = require('inquirer');

const { getAllDepartments, addDepartment } = require('../Department');
const { getAllRoles, addRole } = require('../Role');
const { updateEmployeeInfo } = require('./updateEmployee');
const { getAllEmployees, getEmployeeManagers, addEmployee } = require('../Employee');

// use arrow keys to select from list of options
function options() {
  inquirer.prompt([
  {
    type: 'list',
    name: 'action',
    message: 'What would you like to do?',
    choices: [
      'View All Departments',
      'View All Roles',
      'View All Managers',
      'View All Employees',
      'Add a Department',
      'Add a Role',
      'Add an Employee',
      'Update an Employee',
      'Exit'
      ]
  }
  ]).then((answers) => {
    switch (answers.action) {
      case 'View All Departments':
        getAllDepartments().then(([rows]) => {
          console.table(rows);
          options();
        });
      break;
      case 'View All Roles':
        getAllRoles().then(([rows]) => {
          console.table(rows);
            options();
        });
      break;
      case 'View All Managers':
        getEmployeeManagers().then(([rows]) => {
          console.table(rows);
          options();
        });
      break;
      case 'View All Employees':
        getAllEmployees().then(([rows]) => {
          console.table(rows);
          options();
        });
      break;
      case 'Add a Department':
        inquirer.prompt([
          {
            type: 'input',
            name: 'departmentName',
            message: 'What is the name of the department?'
          }
          ]).then(({ departmentName }) => {
            addDepartment(departmentName).then(() => {
              console.log(`Added ${departmentName} to the database.`);
              options();
            });
          });
      break;
      case 'Add a Role':
        getAllDepartments().then(([departments]) => {
          inquirer.prompt([
            {
              type: 'input',
              name: 'title',
              message: 'What is the title of the role?'
            },
            {
              type: 'input',
              name: 'salary',
              message: 'What is the salary of the role?'
            },
            {
              type: 'list',
              name: 'departmentId',
              message: 'Which department does the role belong to?',
              choices: departments.map(department => ({ name: department.name, value: department.id }))
            }
          ]).then(({ title, salary, departmentId }) => {
          addRole(title, salary, departmentId).then(() => {
            console.log(`Added ${title} role to the database.`);
            options();
          });
        });
      });
      break;
      case 'Add an Employee':
        getAllRoles().then(([roles]) => {
          inquirer.prompt([
          ]).then(({ firstName, lastName, roleId, managerId }) => {
            addEmployee(firstName, lastName, roleId, managerId).then(() => {
              console.log(`Added ${firstName} ${lastName} to the database.`);
              options();
              });
            });
        });
      break;
      case 'Update an Employee':
        getAllEmployees().then(([employees]) => {
          inquirer.prompt([
            {
              type: 'list',
              name: 'employeeId',
              message: 'Which employee would you like to update?',
              choices: employees.map(employee => ({ name: `${employee.first_name} ${employee.last_name}`, value: employee.id }))
            }
          ]).then(({ employeeId }) => {
            updateEmployeeInfo(employeeId, options); 
          });
        });
      break;
      case 'Exit':
        console.log('Goodbye!');
        db.end();
      break;
      default:
        console.log('Invalid action');
        options();
      }
    }).catch((err) => {
      console.error('Error: ', err);
    });
}

module.exports = { options };