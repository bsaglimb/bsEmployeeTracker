// db/query_lib.js
const db = require('./connection.js') ;

// Create a class for the database queries
class DbQuery {
    constructor(db) {
        this.db = db;
    }

    // Add methods to the class
    async addDepartment(data) {
        const values = [data.department_name];
        return this.db.promise().query('INSERT INTO department (department_name) VALUES (?)', values);
    }

    async addRole(data) {
        const values = [data.title, data.salary, data.department_id];
        return this.db.promise().query('INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)', values);
    }

    async addEmployee(data) {
        const values = [data.first_name, data.last_name, data.role_id, data.manager_id];
        return this.db.promise().query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)', values);
    }

    async deleteEmployee(data) {
        const values = [data.employee_id];
        return this.db.promise().query('DELETE FROM employee WHERE id = ?', values);
    }

    async updateEmployeeRoleById(data) {
        const values = [data.role_id, data.employee_id];
        return this.db.promise().query('UPDATE employee SET role_id = ? WHERE id = ?', values);
    }

    async updateEmployeeManagerById(data) {
        const values = [data.manager_name, data.employee_name];
        return this.db.promise().query('UPDATE employee SET manager_id = ? WHERE id = ?', values);
    }

    async getDepartments() {
        return this.db.promise().query('SELECT * FROM department');
    }

    async getDepartmentsByIds(departmentId) {
        return this.db.promise().query('SELECT * FROM department WHERE id = ?', [departmentId]);
    }

    async getAllEmployees() {
        return this.db.promise().query('SELECT * FROM employee');
    }

    async getEmployeeByDepartmentId(data) {
        const values = [data.department_id];
        return this.db.promise().query('SELECT e.first_name AS "first name", e.last_name AS "last name", d.department_name AS department FROM employee e INNER JOIN role r ON e.role_id = r.id INNER JOIN department d ON r.department_id = d.id WHERE d.id = ?', values);
    }

    async getEmployeeByMgrId(data) {
        const values = [data.manager_id];
        return this.db.promise().query('SELECT e.first_name AS "first name", e.last_name AS "last name", CONCAT(mgmt.first_name, " ", mgmt.last_name) AS Manager FROM employee e INNER JOIN employee mgmt ON e.manager_id = mgmt.id WHERE e.manager_id = ?', values);
    }

    async getBudgetByDept(data) {
        return this.db.promise().query('SELECT d.department_name AS department, SUM(r.salary) AS budget FROM role r INNER JOIN department d ON r.department_id = d.id GROUP BY department');
    }

    async getRoles() {
        return this.db.promise().query('SELECT r.id, r.title AS title, r.salary, d.department_name AS department FROM role r LEFT JOIN department d ON r.department_id = d.id ORDER BY department, r.id ASC');
    }

    async getRoleIds() {
        return this.db.promise().query('SELECT * FROM role');
    }

    async getEmployee() {
        return this.db.promise().query('SELECT e.id AS "employee_Id", e.first_name AS "first_name", e.last_name AS "last_name", department.department_name AS department, role.salary AS salary, role.title AS role, CONCAT(mgmt.first_name, " ", mgmt.last_name) AS manager FROM employee e LEFT JOIN employee mgmt on e.manager_id = mgmt.id LEFT JOIN role ON e.role_id = role.id LEFT JOIN department ON role.department_id = department.id ORDER BY e.id');
    }

    async getEmployeeRaw() {
        return this.db.promise().query('SELECT e.id, e.first_name, e.last_name FROM employee e');
    }

    async nonMgmtChoices() {
        return this.db.promise().query('SELECT id, CONCAT(first_name, " ", last_name) AS employee_name FROM employee WHERE manager_id IS NOT NULL');
    }

    async mgmtChoices() {
        return this.db.promise().query('SELECT id, CONCAT(first_name, " ", last_name) AS manager_name FROM employee WHERE manager_id IS NULL');
    }
}

// Export the class
module.exports = new DbQuery(db);

