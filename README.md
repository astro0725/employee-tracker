# Employee Tracker
Employee Tracker is a command-line application designed to help manage a company's employee database. This app allows business owners to view and manage departments, roles, and employees in the company. It is built using Node.js, Inquirer, and MySQL.

## Table of Contents
- [Description](#Description)
- [Features](#Features)
- [Technologies](#Technologies)
- [Installation](#Installation)
- [Usage](#Usage)
- [License](#License)

## Description
The Employee Tracker allows users to easily interact with the company’s employee database through the command line. The application enables users to view departments, roles, and employees in the company. Additionally, it supports adding new departments, roles, and employees. Users can also update employee roles. This tool simplifies managing employee data for business owners, allowing them to maintain a well-organized structure for tracking employee roles, salaries, and department assignments.

The application connects to a MySQL database and provides an intuitive interface that requires no knowledge of SQL commands. With the use of Inquirer, the app guides users through a series of questions and displays data in an easy-to-read format using console.table.

## Technologies
Node.js: JavaScript runtime environment.
Inquirer.js (v8.2.4): Command-line prompts.
MySQL2: For database management and querying.
console.table: To display MySQL query results in a formatted table.

## Installation
- Clone the repository:
`git clone https://github.com/astro0725/employee-tracker.git`
- Navigate to the project directory:
`cd employee-tracker`
- Install the dependencies:
`npm install`
- Set up the MySQL database:
  - Log in to MySQL and create the database using the schema:
`SOURCE db/schema.sql;`
  - (Optional) Populate the database with seed data:
`SOURCE db/seeds.sql;`
- Start the application:
`npm start`

## Usage
Once you run the application, you will be presented with a list of actions:
- View all departments: Displays all departments with their names and IDs.
- View all roles: Displays job titles, role IDs, department names, and salaries.
- View all employees: Displays employee data, including IDs, first/last names, job titles, departments, salaries, and managers.
- Add a department: Prompts you to enter a new department name and adds it to the database.
- Add a role: Prompts you to enter the role name, salary, and department to add a new role.
- Add an employee: Prompts you to enter the employee's first name, last name, role, and manager to add a new employee.
- Update an employee role: Prompts you to select an employee and assign them a new role.

## License
![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg) <br/>
This project is licensed under the MIT license. For more details, see [this link](https://opensource.org/licenses/MIT).
