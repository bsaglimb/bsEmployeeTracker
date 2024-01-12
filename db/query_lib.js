const db = require('./connection');

class DbQuery {
    constructor(db){
        this.db = db;
    }

    addDepartment(data){
        return this.db
            .promise()
            .query('INSERT INTO department (department_name) VALUES (?)', values);
    }

    addRole(data){
        const values = [data.title, data.salary, data.department_id];
        return this.db
        .promise()
        .query('INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)', values);
    }

    addEmployee(data){
        const values = [data.first_name, data.last_name, data.role_id, data.manager_id];
        return this.db
        .promise()
        .query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)', values);
    }

    deleteEmployee(data){
        const values = [data.employee_id];
        return this.db
        .promise()
        .query('DELETE FROM employee WHERE id = ?', values);
    }

    updateEmployeeRoleById(data){
        const values = [data.role_id, data.employee_id];
        return this.db
        .promise()
        .query('UPDATE employee SET role_id = ? WHERE id = ?', values);
    }

    updateEmployeeManagerById(data){
        const values = [data.manager_id, data.employee_id];
        return this.db
        .promise()
        .query('UPDATE employee SET manager_id = ? WHERE id = ?', values);
    }

    getDepartments(){
        return this.db
        .promise()
        .query('SELECT * FROM department');
    }

    getEmployeeByDepartmentId(data){
        const values = [data.department_id];
        return this.db
        .promise()
        .query('SELECT e.first_name AS "first name", e.last_name AS "last name", d.department_name AS department FROM employee e INNER JOIN role r ON e.role_id = r.id INNER JOIN department d ON r.department_id = d.id WHERE d.id = ?', values);
    }

    

}