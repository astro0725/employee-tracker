const db = require('../db/connections');

class Department {
// Method to get all departments
  static getAllDepartments() {
    return db.promise().query('SELECT * FROM departments');
  }

// Method to add a department
  static addDepartment(name) {
    return db.promise().query('INSERT INTO departments (name) VALUES (?)', [name]);
  }
}

module.exports = Department;