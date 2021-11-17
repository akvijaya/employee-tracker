const connection = require('./connection');

class db {
    constructor (connection) {
        this.connection = connection;
    }

    getAllDepartments (){
        return this.connection.promise().query(`SELECT * FROM departments`);
    }
    
    getAllRoles (){
        return this.connection
        .promise()
        .query("SELECT roles.id, roles.title AS Position, roles.salary AS YearlySalary, departments.name AS Department FROM roles LEFT JOIN departments ON roles.department_id = departments.id");
    }

    getAllEmployees (){
        return this.connection
        .promise()
        .query
        ("SELECT employees.id, employees.first_name AS FirstName , employees.last_name AS LastName, departments.name AS Department, roles.salary AS Salary, CONCAT(manager.first_name,' ',manager.last_name )  AS Manager, roles.title AS Position FROM employees LEFT JOIN roles ON employees.role_id = roles.id LEFT JOIN departments ON roles.department_id = departments.id LEFT JOIN employees manager ON manager.id = employees.manager_id ORDER BY employees.id");
    }

    addDepartment (departmentName){
        return this.connection
        .promise()
        .query("INSERT INTO departments (name) VALUES (?)", [departmentName]);
    }

    addRole (roleTitle, roleSalary, roleDepartmentId){
        return this.connection
        .promise()
        .query(
            "INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)",
            [roleTitle, roleSalary, roleDepartmentId]
          );
    }

    addEmployee (answer){
        return this.connection
        .promise()
        .query("INSERT INTO employees SET ?", answer);
    }

    updateAnEmployeeRole(employeeId, roleId) {
        return this.connection
          .promise()
          .query("UPDATE employees SET role_id = ? WHERE id = ?", [
            roleId,
            employeeId,
          ]);
    }

}

module.exports = new db(connection);