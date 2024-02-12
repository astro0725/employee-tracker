const inquirer = require('inquirer');

const { getAllDepartments, addDepartment } = require('./Department');
const { getAllRoles, addRole } = require('./Role');
const { getAllEmployees, addEmployee, updateEmployeeDepartment, updateEmployeeRole, updateEmployeeManager } = require('./Employee');

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
            },
            {
              type: 'list',
              name: 'updateChoice',
              message: 'What would you like to update?',
              choices: ['Department', 'Role', 'Manager']
            }
          ]).then(({ employeeId, updateChoice }) => {
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
                      options();
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
                      options();
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
                      options();
                    });
                  });
                });
                break;
            }
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

module.exports = options;