const db = require('./connection');


// Create a class for the database queries
class DbQuery {
    constructor(db){
        this.db = db;
    }

// Add methods to the class
    addDepartment(data){
        const values = [data.department_name];
        return this.db.query('INSERT INTO department (department_name) VALUES (?)', values);
    }

    addRole(data){
        const values = [data.title, data.salary, data.department_id];
        return this.db.query('INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)', values);
    }

    addEmployee(data){
        const values = [data.first_name, data.last_name, data.role_id, data.manager_id];
        return this.db.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)', values);
    }

    deleteEmployee(data){
        const values = [data.employee_id];
        return this.db.query('DELETE FROM employee WHERE id = ?', values);
    }

    updateEmployeeRoleById(data){
        const values = [data.role_id, data.employee_id];
        return this.db.query('UPDATE employee SET role_id = ? WHERE id = ?', values);
    }

    updateEmployeeManagerById(data){
        const values = [data.manager_id, data.employee_id];
        return this.db.query('UPDATE employee SET manager_id = ? WHERE id = ?', values);
    }

    getDepartments(){
        return this.db.query('SELECT * FROM department');
    }

    getEmployeeByDepartmentId(data){
        const values = [data.department_id];
        return this.db.query('SELECT e.first_name AS "first name", e.last_name AS "last name", d.department_name AS department FROM employee e INNER JOIN role r ON e.role_id = r.id INNER JOIN department d ON r.department_id = d.id WHERE d.id = ?', values);
    }

    getEmployeeByMgrId(data){
        const values = [data.manager_id];
        return this.db.query('SELECT e.first_name AS "first name", e.last_name AS "last name", CONCAT(mgmt.first_name, " ", mgmt.last_name) AS Manager FROM employee e INNER JOIN employee mgmt ON e.manager_id = mgmt.id WHERE e.manager_id = ?', values);
    }

    getBudgetByDepartment(data){
        return this.db.query('SELECT d.department_name AS department, SUM(r.salary) AS budget FROM role r INNER JOIN department d ON r.department_id = d.id GROUP BY department',);
    }
     
    getRoles(){
        return this.db.query('SELECT r.titles AS title, r.salary, d.department_name AS department FROM role r LEFT JOIN department d ON r.department_id = d.id ORDER BY department, r.id ASC');
    }

    getRoleIds(){
        return this.db.query('SELECT * FROM role');
    }

    getEmployee(){
        return this.db.query('SELECT e.id AS "employee_Id", e.first_name AS "first_name", e.last_name AS "last_name", department.department_name AS department, role.salary AS salary, role.title AS role, CONCAT(mgmt.first_name, " ", mgmt.last_name) AS manager FROM employee e LEFT JOIN employee mgmt on e.manager_id = mgmt.id INNDER JOIN role ON e.role_id = role.id LEFT JOIN department ON role.department_id = department.id ORDER BY e.id;');
    }

    getEmployeeRaw(){
        return this.db.query('SELECT e.id, e.first_name, e.last_name FROM employee e');
    }

    getNonManagers(){
        return this.db.query('SELECT id, CONCAT(first_name, " ", last_name) AS employee_name FROM employee WHERE manager_id IS NOT NULL');
    }


    getManagers(){
        return this.db.query('SELECT id, CONCAT(first_name, " ", last_name) AS manager_name FROM employee WHERE manager_id IS NULL');
    }

}

// Export the class
module.exports = new DbQuery(db);
