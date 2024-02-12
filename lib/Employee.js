// setup model
// id (primary key)
//  first name (string) 
// last name (string)
// role_id (integer)
// manager_id (integer)

// associations, manager, role, department

const db = require('../db/connection');

class Employee {
  // Method to get all employees
  static getAllEmployees() {
    return db.promise().query(`
      SELECT e.id, e.first_name, e.last_name, r.title, d.name AS department, r.salary, CONCAT(m.first_name, ' ', m.last_name) AS manager
      FROM employees e
      LEFT JOIN roles r ON e.role_id = r.id
      LEFT JOIN departments d ON r.department_id = d.id
      LEFT JOIN employees m ON e.manager_id = m.id
    `);
}

  // Method to add an employee
  static addEmployee(first_name, last_name, role_id, manager_id) {
    return db.promise().query('INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)', [first_name, last_name, role_id, manager_id]);
  }

  // Method to update an employee's manager
  static updateEmployeeManager(employee_id, manager_id) {
      return db.promise().query('UPDATE employees SET manager_id = ? WHERE id = ?', [manager_id, employee_id]);
  }

  // Method to list potential managers
  static getPotentialManagers() {
    return db.promise().query('SELECT id, first_name, last_name FROM employees WHERE id NOT IN (SELECT DISTINCT manager_id FROM employees WHERE manager_id IS NOT NULL)');
  }
}
