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

// Method to delete a department
  static deleteDepartment(departmentId) {
    return db.promise().query('DELETE FROM departments WHERE id = ?', [departmentId]);
  }
}

module.exports = Department;