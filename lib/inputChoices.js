const sql = require('../db/query_lib');

// This Script calls the DB and creates objects to pass through to inquirer interfact to create the choices for the user to select from.

const deptChoices = async () => {
    const tempArr = await sql.getDepartments();
    const choices = tempArr[0];

    let choicesArr = [];

    choices.forEach(element => {
        let valueObject = {
            name: element.department_name,
            value: element.id
        }
        choicesArr.push(valueObject);
    });
    return choicesArr;
}

const mgmtChoices = async () => {
    const tempArr = await sql.getManagers();
    const choices = tempArr[0];

    let choicesArr = [];

    choices.forEach(element => {
        let valueObject = {
            name: element.manager_name,
            value: element.id
        }
        choicesArr.push(valueObject);
    });

    return choicesArr;
}

const nonMgmtChoices = async () => {
    const tempArr = await sql.getNonManagers();
    const choices = tempArr[0];

    let choicesArr = [];

    choices.forEach(element => {
        let valueObject = {
            name: element.employee_name,
            value: element.id
        }
        choicesArr.push(valueObject);
    });
    return choicesArr;
}

const roleChoices = async () => {
    const tempArr = await sql.getRoleIds();
    const choices = tempArr[0];

    let choicesArr = [];

    choices.forEach(element => {
        let valueObject = {
            name: element.title,
            value: element.id
        }
        choicesArr.push(valueObject);
    });
    return choicesArr;
}

const employeeChoices = async () => {
    const tempArr = await sql.getEmployeeRaw();

    const choices = tempArr[0];

    let choicesArr = [];

    choices.forEach(element => {
        let valueObject = {
            name: element.first_name + " " + element.last_name,
            value: element.id
        }
        choicesArr.push(valueObject);
    });
    return choicesArr;
}

module.exports = { deptChoices, mgmtChoices, roleChoices, employeeChoices, nonMgmtChoices}