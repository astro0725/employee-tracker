const inquirer = require('inquirer');

const { getAllDepartments } = require('../Department');
const { getAllRoles } = require('../Role');
const { getAllEmployees, getEmployeeManagers } = require('../Employee');

const { addNewEmployee } = require('./addEmployee');
const { updateEmployeeInfo } = require('./updateEmployee');

const { addNewDepartment } = require('./addDepartment');

const { addNewRole } = require('./addRole');
const { updateRoleInfo } = require('./updateRole');

const { deleteDepartment, deleteRole, deleteEmployee } = require('./deleteObject');

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
      'Update a Role',
      'Update an Employee',
      'Delete a Department',
      'Delete a Role',
      'Delete an Employee',
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
        addNewDepartment(options);
        break;
      case 'Add a Role':
        addNewRole(options);
        break;
      case 'Add an Employee':
        addNewEmployee(options);
        break;
      case 'Update an Employee':
        updateEmployeeInfo(options);
        break;
      case 'Update a Role':
        updateRoleInfo(options);
        break;
      case 'Delete a Department':
        deleteDepartment(options);
        break;
      case 'Delete a Role':
        deleteRole(options);
        break;
      case 'Delete an Employee':
        deleteEmployee(options);
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