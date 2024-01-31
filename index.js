const inquirer = require("inquirer");
require("console.table"); // this is the package that will allow us to print the table in the console
const inputChoices = require('./lib/inputChoices.js'); // this is the file that contains the choices for the inquirer prompts
const sql = require('./db/query_lib.js'); // this is the file that contains the database queries



// add a department
const newDepartment = async () => {
    const department = await inquirer.prompt([

        {
            type: 'input',
            name: 'department_name',
            message: 'What is the name of the department?',
            validate: (name) => {
                if (name) {
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

const newEmployee = async () => {

    const roleData =  await sql.getRoles()

    
    const roleChoices =  roleData[0].map(({title, id})=> ({
        name: title,
        value: id
    }))
    
   
    const mgmtChoices = await inputChoices.mgmtChoices();

    const employee = await inquirer.prompt([

        {
            type: 'input',
            name: 'first_name',
            message: 'What is the employees first name?',
            validate: (first_name) => {
                if (first_name && isNaN(first_name)) {
                    return true;
                } else {
                    console.log('Please enter a name!')
                    return false;
                }
            },
        },
        {
            type: 'input',
            name: 'last_name',
            message: 'What is the employees last name?',
            validate: (first_name) => {
                if (first_name && isNaN(first_name)) {
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
            choices: roleChoices,
        },
        {
            type: 'list',
            name: 'manager_id',
            message: 'Who is the employees manager?',
            choices: mgmtChoices,
        }
    ]);
    

    await sql.addEmployee(employee);

    chooseRequest();
};

// add a role

const newRole = async () => {
    const jobRoles = await inputChoices.deptChoices(); // this is the array of departments that will be used as choices in the inquirer prompt

    const role = await inquirer.prompt([
        {
            type: 'input',
            name: 'title',
            message: 'What is the name of the job role?',
            validate: (title) => (title ? true : 'Please enter a job role!'),
        },
        {
            type: 'input',
            name: 'salary',
            message: 'What is the salary for this job role?',
            validate: (salary) => (salary && !isNaN(salary) ? true : 'Please enter a valid salary!'),
        },
        {
            type: 'input',
            name: 'department_id',
            message: 'What department is this job role in?',
            choices:jobRoles.map((jobRole) => ({ name: jobRole.department.department_name, value: jobRole.department.id })),
        },
    ]);
    
    await sql.addRole(role);

    chooseRequest();
}


// Update an employee's role

const updateRole = async () => {
    const roleChoices = await inputChoices.roleChoices();
    const employeeChoices = await inputChoices.employeeChoices();
    const employee = await inquirer.prompt([
        {
            type: 'list',
            name: 'employee_id',
            message: 'Which employee would you like to update?',
            choices: employeeChoices,
            loop: false,
        },
        {
            type: 'list',
            name: 'role_id',
            message: 'What is the employees new role?',
            choices: roleChoices,
            loop: false,
        }
    ]);

    await sql.updateEmployeeRoleById(employee);

    chooseRequest();
}


// BONUS objectives

// Delete an employee

const deleteEmployee = async () => {
    const employeeChoices = await inputChoices.nonMgmtChoices();

    const employee = await inquirer.prompt([

        {
            type: 'list',
            name: 'employee_id',
            message: 'Which employee would you like to delete?',
            choices: employeeChoices,
            loop: false,
        }
    ]);
    await sql.deleteEmployee(employee);

    chooseRequest();
}

// Update an employee's manager

const updateEmployeesManager = async () => {
    const employeeChoices = await inputChoices.nonMgmtChoices();
    const mgmtChoices = await inputChoices.mgmtChoices();
    const employee = await inquirer.prompt([
        {
            type: 'list',
            name: 'employee_id',
            message: 'Which employee would you like to update?',
            choices: employeeChoices,
        },
        {
            type: 'list',
            name: 'manager_id',
            message: 'Who is the employees new manager?',
            choices: mgmtChoices, 
        }
    ]);

    await sql.updateEmployeeManagerById(employee);

    chooseRequest();
}

//view all departments

const viewAllDeptartments = () => {
    sql.getDepartments()

        .then(([rows]) => {
            console.log('\n');
            console.table(rows);
            chooseRequest();
        })
}

// View all roles

const viewAllRoles = () => {
    sql.getRoles().then(([rows]) => {
        console.log('\n');
        console.table(rows);
        chooseRequest();
    })

}

// View all employees

const viewAllEmployees = () => {
    sql.getAllEmployees().then(([rows]) => {
            console.log('\n');
            console.table((rows));
            chooseRequest();
        })
}

//View all departments and their budget

const viewBudgets = async () => {
    sql.getBudgetByDept().then(([rows]) => {
            console.log('\n');
            console.table(rows);
        })
        .then(() => {
            chooseRequest();
        })
}

// View all employees in a specific department
const viewEmployeeByDepartment = async () => {
    const deptChoices = await inputChoices.deptChoices();

    inquirer.prompt([
        {
            type: 'input',
            name: 'department_id',
            message: 'Which department would you like to view employees for?',
            choices: deptChoices,
        }
    ])

        .then((data) => {
            sql.getEmployeeByDepartmentId(data)
                .then(([rows]) => {
                    console.log('\n');
                    console.table(rows)
                    chooseRequest();
                })
        })
}

// View all employees managed by a specific manager

const viewEmployeeByMgr = async () => {
    const mgmtChoices = await inputChoices.mgmtChoices();
    inquirer.prompt([
        {
            type: 'list',
            name: 'manager_id',
            message: 'Which manager would you like to view employees for?',
            choices: mgmtChoices,
            loop: false,
        }
    ])

        .then((data) => {
            sql.getEmployeeByMgrId(data).then(([rows]) => {
                    console.log('\n');
                    console.table(rows)
                    chooseRequest();
                })
        })

}

const chooseRequest = async () => {
    inquirer.prompt([
        {
            type: 'list',
            name: 'request',
            message: 'What would you like to do?',
            choices: [
                'View all departments',
                'View all roles',
                'View all employees',
                'Add a department',
                'Add a role',
                'Add an employee',
                'Update an employee role',
                'Delete an employee',
                'Update an employee manager',
                'View departments budgets',
                'View employees by department',
                'View employees by manager',
            ]
        },
    ])

        .then((data) => {
            const { request } = data;
            console.log(request);
            // switch statement to determine which function to run based on the user's choice
            switch (request) {
                case 'Add a department':
                    newDepartment();
                    break;
                case 'Add an employee':
                    newEmployee();
                    break;
                case 'Add a role':
                    newRole();
                    break;
                case 'Delete an employee':
                    deleteEmployee();
                    break;
                case 'Update an employee role':
                    updateRole();
                    break;
                case 'Update an employee manager':
                    updateEmployeesManager();
                    break;
                case 'View all departments':
                    viewAllDeptartments();
                    break;
                case 'View all employees':
                    viewAllEmployees();
                    break;
                case 'View all roles':
                    viewAllRoles();
                    break;
                case 'View departments budgets':
                    viewBudgets();
                    break;
                case 'View employees by department':
                    viewEmployeeByDepartment();
                    break;
                case 'View employees by manager':
                    viewEmployeeByMgr();
                    break;

                default:
                    break;
            }
        })
}

chooseRequest();