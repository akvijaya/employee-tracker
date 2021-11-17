const inquirer = require("inquirer");
const db = require("./db");


const mainMenu =  () => {
 inquirer.prompt([
    {
      name: 'action',
      type: 'list',
      message: 'Choose an action',
      choices: [
        'View All Departments',
        'View All Roles',
        'View All Employees',
        'Add a Department',
        'Add a Role',
        'Add an Employee',
        'Update an Employee Role',
        'Exit'
      ],
    },
  ])
  .then ((data) => {
  switch (data.action) {
    case 'View All Departments':
      viewDepartment();
      break;

    case 'View All Roles':
      viewRole();
      break;

    case 'View All Employees':
      viewEmployees();
      break;

    case 'Add a Department':
      departmentAdd();
      break

    case 'Add a Role':
      roleAdd();
      break

    case 'Add an Employee':
      employeeAdd();
      break

    case 'Update an Employee Role':
      employeeUpdate();
      break

    case 'Exit':
      connection.end();
      break;
    }
  })
    .catch((err) => console.log("Error message: ", err));
};

function viewDepartment() {
  db.getAllDepartments().then(([rows]) => {
    console.table(rows);
    return mainMenu();
  });
}

function viewRole() {
  db.getAllRoles().then(([rows]) => {
    console.table(rows);
    return mainMenu();
  });
}

function viewEmployees() {
  db.getAllEmployees().then(([rows]) => {
    console.table(rows);
    return mainMenu();
  });
}

async function departmentAdd() {
  const answer = await inquirer.prompt([
    {
      type: "input",
      name: "name",
      message: "What is the name of the new department?"
    },
  ]);

  const dname = answer.name;

  db.addDepartment(dname).then(() => {
    return mainMenu();
  });
}

async function roleAdd() {
  const answer = await inquirer.prompt([
    {
      type: "input",
      name: "name",
      message: "What is the title of the new role?",
    },
    {
      type: "input",
      name: "salary",
      message: "What is the salary for this role?",
    },
    {
      type: "input",
      name: "department",
      message: "Which department does this new role belong to?",
    },
  ]);

  db.addRole(answer.name, answer.salary, answer.department).then(() => {
    return mainMenu();
  });
}



async function employeeAdd() {
  const answer = await inquirer.prompt([
    {
      type: "input",
      name: "first_name",
      message: "Please enter the first name:",
    },
    {
      type: "input",
      name: "last_name",
      message: "Please enter tje last name:",
    },
    {
      type: "input",
      name: "role_id",
      message: "Please select a role between 1 through 5:",
    },
    {
      type: "input",
      name: "manager_id",
      message: "Please select a manager between 1 through 5:",
    },
  ]);

  db.addEmployee(answer).then(() => {
    return mainMenu();
  });
}

async function employeeUpdate() {
  const answer = await inquirer.prompt([
    {
      type: "input",
      name: "id",
      message: "Please enter employee id",
    },
    {
      type: "input",
      name: "role_id",
      message: "Please select role from 1 through 5",
    },
  ]);

  db.updateAnEmployeeRole(answer.id, answer.role_id).then(() => {
    return mainMenu();
  });
}

mainMenu();