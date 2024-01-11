const inquirer = require("inquirer");

const sql = require('./db/query_lib');

// adds a department
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

