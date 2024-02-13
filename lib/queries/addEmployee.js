const inquirer = require('inquirer');

const { getAllRoles } = require('../Role');
const { getEmployeeManagers, addEmployee } = require('../Employee');

function addNewEmployee() {
  getAllRoles().then(([roles]) => {
    const roleChoices = roles.map(role => ({
      name: role.title,
      value: role.id
    }));
    getEmployeeManagers().then(([managers]) => {
      const managerChoices = managers.map(manager => ({
        name: `${manager.first_name} ${manager.last_name}`,
        value: manager.id
      }));
      managerChoices.unshift({ name: 'None', value: null });
      inquirer.prompt([
        {
          type: 'input',
          name: 'firstName',
          message: "What is the employee's first name?",
          validate: input => input ? true : "First name cannot be empty."
        },
        {
          type: 'input',
          name: 'lastName',
          message: "What is the employee's last name?",
          validate: input => input ? true : "Last name cannot be empty."
        },
        {
          type: 'list',
          name: 'roleId',
          message: "What is the employee's role?",
          choices: roleChoices
        },
        {
          type: 'list',
          name: 'managerId',
          message: "Who is the employee's manager?",
          choices: managerChoices
        }
      ]).then(({ firstName, lastName, roleId, managerId }) => {
        addEmployee(firstName, lastName, roleId, managerId).then(() => {
          console.log(`Added ${firstName} ${lastName} to the database.`);
          options();
        });
      });
    });
  });
}

module.exports = { addNewEmployee };
