-- NOTAS: 
-- Todos los nombres de tablas estan escritos con el formato "Users_"
-- primaer aletra mayuscula, nombre en plural y terminan con un _ (gion bajo)

-- Todas los campos estan escritos mediante el formato siguiente "Id_Users/Name"
-- Para las llaves primarias: Señanalda con un "Id" al inicio sedguido de guion bajo "_" y despues el nombre del campo.
-- Para campos nomrmales: Primar letra del nombre en mayuscula y si se reguire otra palabra separarla por guion bajo "_" y en  minusculas.




-- Base de datos corregida para Aurora
CREATE DATABASE IF NOT EXISTS AuroraV2;
USE AuroraV2;

-- Tabla de países (faltante)
CREATE TABLE Countries_ (
    Id_country INT PRIMARY KEY AUTO_INCREMENT,
    Country_name VARCHAR(50)
);

-- Tabla de carreras
CREATE TABLE Careers_ (
    Id_career INT PRIMARY KEY AUTO_INCREMENT,
    Career_name VARCHAR(40)
);

-- Tabla de estatus de usuario
CREATE TABLE User_status_ (
    Id_user_status INT PRIMARY KEY AUTO_INCREMENT,
    User_status VARCHAR(20) NOT NULL UNIQUE
);

-- Tabla de géneros
CREATE TABLE Genders_ (
    Id_gender INT AUTO_INCREMENT PRIMARY KEY,
    Gender_name VARCHAR(20)
);

-- Tabla de asistencias a eventos
CREATE TABLE Community_event_attendance_ (
    Id_attendance_co INT PRIMARY KEY AUTO_INCREMENT,
    Attendance_name VARCHAR(15)
);

-- Tabla de usuarios
CREATE TABLE Users_ (
    Id_user VARCHAR(8) PRIMARY KEY,
    Id_career INT NOT NULL,
    Control_num VARCHAR(11) UNIQUE,
    Name_user VARCHAR(50),
    Last_name VARCHAR(50),
    Email VARCHAR(64) UNIQUE,
    Id_gender INT NOT NULL,
    Password VARCHAR(18),
    Id_country INT NOT NULL,
    Id_user_status INT NOT NULL,
    Id_attendance_co INT,
    FOREIGN KEY (Id_user_status) REFERENCES User_status_(Id_user_status),
    FOREIGN KEY (Id_career) REFERENCES Careers_(Id_career),
    FOREIGN KEY (Id_country) REFERENCES Countries_(Id_country),
    FOREIGN KEY (Id_attendance_co) REFERENCES Community_event_attendance_(Id_attendance_co)
);



-- Tabla de categorías de eventos
CREATE TABLE Event_categories_ (
    Id_category INT PRIMARY KEY AUTO_INCREMENT,
    Event_name VARCHAR(15) NOT NULL UNIQUE
);

-- Tabla de tipos de eventos
CREATE TABLE Event_types_ (
    Id_type INT PRIMARY KEY AUTO_INCREMENT,
    Type_name VARCHAR(100) NOT NULL UNIQUE,
    Category_id INT NOT NULL,
    FOREIGN KEY (Category_id) REFERENCES Event_categories_(Id_category)
);

-- Tabla de eventos
CREATE TABLE Events_ (
    Id_event INT PRIMARY KEY AUTO_INCREMENT,
    Title VARCHAR(200) NOT NULL,
    Description TEXT,
    Id_Event_Category INT NOT NULL,
    Id_Event_type INT,
    Event_date DATE,
    Start_time TIME,
    End_time TIME,
    Location VARCHAR(150),
    FOREIGN KEY (Id_Event_Category) REFERENCES Event_categories_(Id_category),
    FOREIGN KEY (Id_Event_type) REFERENCES Event_types_(Id_type)
);

-- Tabla de calendario de eventos
CREATE TABLE Calendar_Events_ (
    Id_calendar INT PRIMARY KEY AUTO_INCREMENT,
    Event_id INT NOT NULL,
    Calendar_date DATE NOT NULL,
    Start_date DATE,
    End_date DATE,
    Notes TEXT,
    FOREIGN KEY (Event_id) REFERENCES Events_(Id_event)
);

-- Tabla de asistencias a eventos por usuario
CREATE TABLE Event_Attendance_ (
    Id_attendance INT AUTO_INCREMENT PRIMARY KEY,
    Id_user VARCHAR(8) NOT NULL,
    Id_event INT NOT NULL,
    Confirmed BOOLEAN DEFAULT TRUE,
    Timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (Id_user) REFERENCES Users_(Id_user),
    FOREIGN KEY (Id_event) REFERENCES Events_(Id_event),
    UNIQUE (Id_user, Id_event)
);


-- Tabla de categorías de comunidad
CREATE TABLE Community_categories_ (
    Id_category INT PRIMARY KEY AUTO_INCREMENT,
    Category_name VARCHAR(100) NOT NULL UNIQUE
);

-- Tabla de tipos de actividades de comunidad
CREATE TABLE Community_activity_types_ (
    Id_type INT PRIMARY KEY AUTO_INCREMENT,
    Type_name VARCHAR(100) NOT NULL,
    Id_category INT NOT NULL,
    FOREIGN KEY (Id_category) REFERENCES Community_categories_(Id_category)
);

-- Tabla de actividades de comunidad
CREATE TABLE Community_activities_ (
    Id_activity INT PRIMARY KEY AUTO_INCREMENT,
    Title VARCHAR(150) NOT NULL,
    Description TEXT,
    Id_type INT NOT NULL,
    Location VARCHAR(150),
    Start_time TIME,
    End_time TIME,
    Event_date DATE,
    Status ENUM('Activo', 'Finalizado', 'Cancelado') DEFAULT 'Activo',
    Organizer_id VARCHAR(8),
    FOREIGN KEY (Id_type) REFERENCES Community_activity_types_(Id_type),
    FOREIGN KEY (Organizer_id) REFERENCES Users_(Id_user)
);

-- Tabla de asistencia a actividades de comunidad
CREATE TABLE Community_activity_attendance_ (
    Id_attendance INT AUTO_INCREMENT PRIMARY KEY,
    Id_user VARCHAR(8) NOT NULL,
    Id_activity INT NOT NULL,
    Confirmation BOOLEAN DEFAULT TRUE,
    Timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (Id_user) REFERENCES Users_(Id_user),
    FOREIGN KEY (Id_activity) REFERENCES Community_activities_(Id_activity),
    UNIQUE (Id_user, Id_activity)
);