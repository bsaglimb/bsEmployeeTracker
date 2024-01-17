INSERT INTO department (department_name)
VALUES
       ("Database Administrator"),
       ("Backend developer"),
       ("Frontend developer"),
       ("FullStack developer"),

INSERT INTO role (title, salary, department_id)
VALUES ("Database Manager", 90000, 1),
       ("Database Lead", 80000, 1),
       ("Database Representative", 45000, 1),
       ("Backend Manager", 85000, 2),
       ("Backend Lead", 75000, 2),
       ("Backend Representative", 40000, 2),
       ("Frontend Manager", 80000, 3),
       ("Frontend Lead", 70000, 3),
       ("Frontend Representative", 35000, 3),
       ("FullStack Manager", 120000, 4),
       ("FullStack Lead", 100000, 4),
       ("FullStack Representative", 85000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Sally", "Smith", 1, NULL),
       ("Allie", "Miller", 2, 1),
       ("Tim", "Allen", 3, 1),
       ("Barbara", "Hicks", 4, NULL),
       ("Lisa", "Jones", 5, 4),
       ("John", "Henderson", 6, 4),
       ("Sarah", "Anderson", 7, NULL),
       ("Kaitlin", "Waver", 8, 7),
       ("Bill", "Paulson", 9, 7),
       ("Tori", "Thomson", 10, NULL),
       ("Jeryy", "Peterson", 11, 10),
       ("Larry", "David", 12, 10);