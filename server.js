const inquirer = require("inquirer");
const consoleTable = require("console.table"); // this is the package that will allow us to print the table in the console
const inputChoices = require('./lib/inputChoices'); // this is the file that contains the choices for the inquirer prompts
const sql = require('./db/query_lib');



//roleArr = roleChoices

//mgmtArr = mgmtChoices


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
    
    const roleChoices = await inputChoices.roleChoices();
    const mgmtChoices = await inputChoices.mgmtChoices();

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
const jobRoles = await inputChoices.deptChoices(); //correct this line accordingly to get the correct data from the database

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

const deleteEmployee = async () =>{
    const employeeChoices = await inputChoices.NonMgmtChoices();

    const employee = await inquirer.prompt ([

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

// Update an employee's role

const updateRole = async () =>{
    const roleChoices = await inputChoices.roleChoices();
    const employeeChoices = await inputChoices.employeeChoices();
    const employee = await inquirer.prompt ([
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

// Update an employee's manager

const updateEmployeesManager = async () =>{
    const employeeChoices = await inputChoices.NonMgmtChoices();
    const mgmtChoices = await inputChoices.mgmtChoices();
    const employee = await inquirer.prompt ([
        {
            type: 'list',
            name: 'employee_id',
            message: 'Which employee would you like to update?',
            choices: employeeChoices,
            loop: false;
        },
        {
            type: 'list',
            name: 'manager_id',
            message: 'Who is the employees new manager?',
            choices: mgmtChoices,
            loop: false,
        }
    ]);

    await sql.updateEmployeesManagerById(employee);

    chooseRequest();
}

//view all departments

const viewAllDeptartments = () => {
    sql.getDepts()
  
    .then(([rows]) => {
      console.log('\n');
      console.log(inputChoices.getTable(rows));
    })
  
    .then(()=> {
        chooseRequest();
    }) 
  }

// View all roles

const viewAllRoles = () => {
    sql.getRoles()

    .then(([rows]) =>{
        console.log('\n');
        console.log(inputChoices.getTable(rows));
    })
    .then(()=>{
        chooseRequest();
    })
}

// View all employees

const viewAllEmployees = () => {
    sql.getEmployees()

    .then(([rows]) => {
        console.log('\n');
        console.log(inputChoices.getTable(rows));
    })

    .then(()=>{
        chooseRequest();
    })
}

//View all departments and their budget

const viewBudgets = async () => {
    sql.getBudgetByDept()

    .then(([rows]) => {
        console.log('\n');
        console.log(inputChoices.getTable(rows));
    })
 .then(()=>{
     chooseRequest();
 })
}

// View all employees in a specific department
const viewEmployeeByDepartment = async () => {
    const deptChoices = await inputChoices.deptChoices();

    inquirer.prompt([
        {
            type: 'list',
            name: 'department_id',
            message: 'Which department would you like to view employees for?',
            choices: deptChoices,
            loop: false,
        }
    ])

.then((data) => {
    sql.getEmployeeByDeptId(data)
      .then(([rows]) =>{
        console.log('\n');
        console.log(cTable.getTable(rows))
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
    sql.getEmployeeByMgrId(data)
      .then(([rows]) =>{
        console.log('\n');
        console.log(inputChoices.getTable(rows))
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
                'Add a department',
                'Add an employee',
                'Add a role',
                'Delete an employee',
                'Update an employee role',
                'Update an employee manager',
                'View all departments',
                'View all roles',
                'View departments budgets',
                'View employees by department',
                'View employees by manager',
            ],
            loop: false,
        },
    ])

    .then((data) => {
        const {request} = data;
        console.log(request);
    // switch statement to determine which function to run based on the user's choice
    switch (request) {
        case 'Add a department':
            newDepartment();
            break;
        case 'Add an employee':
            newEmployee();
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