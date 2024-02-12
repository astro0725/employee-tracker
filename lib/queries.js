const inquirer = require('inquirer');

// use arrow keys to select from list of options
const mainMenu = () => {
  return [
    {
      type: 'list',
      name: 'action',
      message: 'What would you like to do?',
      choices: [
        'View All Departments',
        'View All Managers',
        'View All Roles',
        'View All Employees',
        'Add a Department',
        'Add a Manager',
        'Add a Role',
        'Add an Employee',
        'Update an Employee Role',
        'Exit'
      ]
    }
  ];
};


// Other questions to add (if there is no name/title input, only select from list of options): 
// If add a department: "What is the name of the department?" (user input)
// If add a manager: "What is the manager's first name?" (user input)
// "what is the manager's last name?" (user input)
// "what is the manager's department?" (user input)
// after complete action return to main menu: "would you like to return to the main menu?"
// if add a role: "What is the title of the role?" (user input)
// if add a role: "What is the salary of the role?" (user input)
// if add a role: "What is the department of the role?" (user input)
// after complete action return to main menu: "would you like to return to the main menu?"
// if add an employee: "What is the employee's first name?" (user input)
// "waht is the employee's last name?" (user input)
// "what is the employee's role?" (user input)
// "who is the employee's manager?" (user input)
// after complete: adds inputs to db and returns to main menu: "would you like to return to the main menu?"
// if update employee role: "which employee's role would you like to update?" (user select)

module.exports = {
  mainMenu,
};
