const inquirer = require('inquirer');

const { updateEmployeeDepartment, updateEmployeeRole, updateEmployeeManager } = require('../Employee');
const { getAllDepartments } = require('../Department');
const { getAllRoles } = require('../Role');

function updateEmployeeInfo(employeeId, options) {
  inquirer.prompt([
    {
      type: 'list',
      name: 'updateChoice',
      message: 'What would you like to update?',
      choices: ['Department', 'Role', 'Manager']
    }
  ]).then(({ updateChoice }) => {
    switch (updateChoice) {
      case 'Department':
        getAllDepartments().then(([departments]) => {
          inquirer.prompt([
            {
              type: 'list',
              name: 'departmentId',
              message: 'Which department does the employee belong to now?',
              choices: departments.map(department => ({ name: department.name, value: department.id }))
            }
          ]).then(({ departmentId }) => {
            updateEmployeeDepartment(employeeId, departmentId).then(() => {
              console.log('Employee department updated successfully.');
              askForMoreChanges(employeeId, options);
            });
          });
        });
        break;
      case 'Role':
        getAllRoles().then(([roles]) => {
          inquirer.prompt([
            {
              type: 'list',
              name: 'roleId',
              message: 'What is the new role of the employee?',
              choices: roles.map(role => ({ name: role.title, value: role.id }))
            }
          ]).then(({ roleId }) => {
            updateEmployeeRole(employeeId, roleId).then(() => {
              console.log('Employee role updated successfully.');
              askForMoreChanges(employeeId, options);
            });
          });
        });
        break;
      case 'Manager':
        getAllEmployees().then(([managers]) => {
          inquirer.prompt([
            {
              type: 'list',
              name: 'managerId',
              message: 'Who is the new manager of the employee?',
              choices: managers.map(manager => ({ name: `${manager.first_name} ${manager.last_name}`, value: manager.id }))
            }
          ]).then(({ managerId }) => {
            updateEmployeeManager(employeeId, managerId).then(() => {
              console.log('Employee manager updated successfully.');
              askForMoreChanges(employeeId, options);
            });
          });
        });
        break;
    }
  });
}

function askForMoreChanges(employeeId, options) {
  inquirer.prompt([
    {
      type: 'confirm',
      name: 'confirmChange',
      message: 'Would you like to update anything else for this employee?',
    }
  ]).then(({ confirmChange }) => {
    if (confirmChange) {
      updateEmployeeInfo(employeeId, options);
    } else {
      options();
    }
  });
}

module.exports = { updateEmployeeInfo };
