const inquirer = require('inquirer');

const { getAllDepartments } = require('../Department');
const { addRole } = require('../Role');

function addNewRole() {
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
}

module.exports = { addNewRole };
