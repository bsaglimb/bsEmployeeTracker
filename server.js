const inquirer = require("inquirer");

const sql = require('./db/query_lib');

// add a department
const newDepartment = async () =>{
    const department = await inquirer.prompt ([

        {
            type: 'input',
            name: 'name',
            message: 'What is the name of the department?',
            validate: (name) =>{
                if (name){
                    return true;
                } else {
                    console.log('Please enter a department name!');
                    return false;
                }
            },
        },
    ]);
    await sql.addDepartment(department);

    chooseRequest();
};

// add an employee
const newEmployee = async () =>{
    
    
    const employee = await inquirer.prompt ([

        {
        type: 'input',
        name: 'first_name',
        message: 'What is the employees first name?',
        validate: (first_name) =>{
            if (first_name && isNaN(first_name)){
                return true;
            } else {
                console.log('Please enter a name!')
                return false;
            }
        },
    },

    {
        type: 'list',
        name: 'role_id',
        message: 'What is the employees role?',
        choices: employeeRoles,
        loop: false,
    },
    {
        type: 'list',
        name: 'manager_id',
        message: 'Who is the employees manager?',
        choices: mgmt,
        loop: false,
    }
]);

    await sql.addEmployee(employee);

    chooseRequest();
};

// add a role

const newRole = async () =>{
const jobRoles = await sql.getDepartments(); //correct this line accordingly to get the correct data from the database

    const role = await inquirer.prompt ([

        {
            type: 'input',
            name: 'title',
            message: 'What is the name of the job role?',
            validate: (title) =>{
                if (title){
                    return true;
                } else {
                    console.log('Please enter a job role!');
                    return false;
                }
            },
        },

        {
            type: 'input',
            name: 'salary',
            message: 'What is the salary for this job role?',
            validate: (salary) =>{
                if (salary && !isNaN(salary)){
                    return true;
                } else {
                    console.log('Please enter a salary!');
                    return false;
                }
            },
        },

        {
            type: 'list',
            name: 'department_id',
            message: 'What department is this job role in?',
            choices: jobRoles,
            loop: false,
        }
    ]);
    await sql.addRole(role);

    chooseRequest();
}


// BONUS objectives

// Delete an employee