DROP DATABASE IF EXISTS attendance;
CREATE DATABASE attendance;
USE attendance;

/*INSERT INTO encodings (id_student, name, encodings) VALUES('6969', 'Juan', '\xf7')*/

CREATE TABLE students (
  carnet VARCHAR(30) PRIMARY KEY,
  fullname VARCHAR(200) NOT NULL,
  email VARCHAR(100) NOT NULL,
  cellphone VARCHAR(12),
  grade INT(10) NOT NULL,
  created_at TIMESTAMP
);

/*FOREIGN KEY (id_student) REFERENCES students(carnet);*/
CREATE TABLE encodings (
  id INT PRIMARY KEY AUTO_INCREMENT,
  id_student VARCHAR(30) NOT NULL,
  name VARCHAR(100),
  encodings BLOB,
  created_at TIMESTAMP
);


CREATE TABLE professors (
  id INT PRIMARY KEY AUTO_INCREMENT,
  fullname VARCHAR(200) NOT NULL,
  email VARCHAR(100) NOT NULL,
  cellphone VARCHAR(12),
  isAdmin BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP
);
CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  id_professor int not null,
  username varchar(30) unique not null,
  password varchar(50) not null,
  created_at TIMESTAMP,
  FOREIGN KEY (id_professor) REFERENCES professors(id)
);
CREATE TABLE classrooms (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(20) NOT NULL
);

CREATE TABLE classes (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  id_classroom INT NOT NULL,
  id_professor INT NOT NULL,
  time DATETIME,
  day VARCHAR(15),
  FOREIGN KEY (id_classroom) REFERENCES classrooms(id),
  FOREIGN KEY (id_professor) REFERENCES professors(id)
);

CREATE TABLE class_groups (
  id INT PRIMARY KEY AUTO_INCREMENT,
  id_class INT NOT NULL,
  id_professor INT NOT NULL,
  UNIQUE KEY (id_class, id_professor),
  FOREIGN KEY (id_class) REFERENCES classes(id),
  FOREIGN KEY (id_professor) REFERENCES professors(id)
);

CREATE TABLE groupmembers (
    id INT PRIMARY KEY AUTO_INCREMENT,
    id_group INT NOT NULL,
    id_student VARCHAR(30) NOT NULL,
    UNIQUE KEY (id_group, id_student),
    FOREIGN KEY (id_group) REFERENCES class_groups(id),
    FOREIGN KEY (id_student) REFERENCES students(carnet)
);

CREATE TABLE attendance (
  id INT PRIMARY KEY AUTO_INCREMENT,
  id_student VARCHAR(30) NOT NULL,
  id_class INT NOT NULL,
  id_professor INT NOT NULL,
  UNIQUE KEY (id_student, id_class),
  FOREIGN KEY (id_student) REFERENCES students(carnet),
  FOREIGN KEY (id_class) REFERENCES classes(id),
  FOREIGN KEY (id_professor) REFERENCES professors(id)
);

CREATE TABLE permissions (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(50) NOT NULL,
  description VARCHAR(255)
);

CREATE TABLE user_permissions (
  id INT PRIMARY KEY AUTO_INCREMENT,
  id_professor INT NOT NULL,
  id_permission INT NOT NULL,
  UNIQUE KEY (id_professor, id_permission),
  FOREIGN KEY (id_professor) REFERENCES professors(id),
  FOREIGN KEY (id_permission) REFERENCES permissions(id)
);

DELIMITER //

CREATE TRIGGER after_insert_professor
AFTER INSERT ON professors
FOR EACH ROW
BEGIN
    INSERT INTO user_permissions (id_professor, id_permission) VALUES (NEW.id, 1);
    INSERT INTO user_permissions (id_professor, id_permission) VALUES (NEW.id, 2);
END //

CREATE TRIGGER before_insert_attendance
BEFORE INSERT ON attendance
FOR EACH ROW
BEGIN
    DECLARE existing_count INT;
    SET existing_count = (SELECT COUNT(*) FROM attendance WHERE id_student = NEW.id_student AND id_class = NEW.id_class);
    IF existing_count > 0 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'El estudiante ya estÃ¡ registrado en este grupo de clases';
    END IF;
END //

DELIMITER ;