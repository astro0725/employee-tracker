INSERT INTO departments (name) VALUES ('Engineering'), ('Human Resources'), ('Marketing'), ('Finance');

INSERT INTO roles (title, salary, department_id) VALUES 
('Software Engineer', 70000, 1),
('Senior Software Engineer', 90000, 1),
('HR Manager', 65000, 2),
('HR Assistant', 45000, 2),
('Marketing Coordinator', 50000, 3),
('Accountant', 55000, 4);

INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES 
('John', 'Doe', 1, NULL),
('Jane', 'Doe', 2, 1),
('Mike', 'Smith', 3, NULL),
('Karen', 'Johnson', 4, 3),
('Chris', 'Davis', 5, NULL),
('Sarah', 'Miller', 6, NULL);
