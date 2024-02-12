// setup model
// id (primary key)
// title (string) 
// salary (decimal)
// department_id (integer)const db = require('../db/connection');

const db = require('../db/connection');

class Role {
  // Method to get all roles
  static getAllRoles() {
    return db.promise().query('SELECT * FROM roles');
  }

  // Method to add a role
  static addRole(title, salary, department_id) {
    return db.promise().query('INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)', [title, salary, department_id]);
  }
}

module.exports = Role;