USE organization;

INSERT INTO departments (name)
VALUES
    ('Operations'),
    ('Engineering'),
    ('Strategy'),
    ('Research and Development');

INSERT INTO roles (title, salary, department_id)
VALUES
    ('CEO', 1044000, 1),
    ('COO', 480000, 1),
    ('VP', 350000, 2),
    ('VP, Finance', 453000, 4),
    ('Software Engineer', 35000, 2),
    ('Software Architect', 35000, 2);
    

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
    ('Abi', 'Vijay', 1, NULL),
    ('Sal', 'Lee', 3, 1),
    ('Osma', 'Khan', 2, NULL),
    ('Nes', 'James', 4, 3),
    ('Mateo', 'Patel', 5, NULL),
    ('Zack', 'Singh', 6, NULL);