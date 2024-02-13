const inquirer = require('inquirer');

const { getAllDepartments } = require('../Department');
const { getAllRoles } = require('../Role');
const { getAllEmployees } = require('../Employee');

const { deleteDepartment } = require('../Department');
const { deleteRole } = require('../Role');
const { deleteEmployee } = require('../Employee');

function deleteDepartment() {
  getAllDepartments().then(([departments]) => {
    inquirer.prompt([
      {
        type: 'list',
        name: 'departmentId',
        message: 'Which department would you like to delete?',
        choices: departments.map(department => ({ name: department.name, value: department.id }))
      }
    ]).then(({ departmentId }) => {
      deleteDepartment(departmentId).then(() => {
        console.log('Department deleted successfully.');
        options();
      });
    });
  });
}

function deleteRole() {
  getAllRoles().then(([roles]) => {
    inquirer.prompt([
      {
        type: 'list',
        name: 'roleId',
        message: 'Which role would you like to delete?',
        choices: roles.map(role => ({ name: role.title, value: role.id }))
      }
    ]).then(({ roleId }) => {
      deleteRole(roleId).then(() => {
        console.log('Role deleted successfully.');
        options();
      });
    });
  });
}

function deleteEmployee() {
  getAllEmployees().then(([employees]) => {
    inquirer.prompt([
      {
        type: 'list',
        name: 'employeeId',
        message: 'Which employee would you like to delete?',
        choices: employees.map(employee => ({ name: `${employee.first_name} ${employee.last_name}`, value: employee.id }))
      }
    ]).then(({ employeeId }) => {
      deleteEmployee(employeeId).then(() => {
        console.log('Employee deleted successfully.');
        options();
      });
    });
  });
}

module.exports = { 
  deleteDepartment, 
  deleteRole, 
  deleteEmployee 
};
