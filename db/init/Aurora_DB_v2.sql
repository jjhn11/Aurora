-- NOTAS: 
-- Todos los nombres de tablas estan escritos con el formato "Users_"
-- primera letra mayuscula, nombre en plural y terminan con un _ (guion bajo)

-- Todas los campos estan escritos mediante el formato siguiente "Id_Users/Name"
-- Para las llaves primarias: Señalada con un "Id" al inicio sedguido de guion bajo "_" y despues el nombre del campo.
-- Para campos normales: Primer letra del nombre en mayuscula y si se reguire otra palabra separarla por guion bajo "_" y en  minusculas.




-- Base de datos corregida para Aurora
CREATE DATABASE IF NOT EXISTS AuroraV2;
USE AuroraV2;
-- Tabla de carreras
CREATE TABLE Occupations_ (
    Id_occupation INT PRIMARY KEY AUTO_INCREMENT,
    Occupation VARCHAR(20)
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



-- Tabla de usuarios
CREATE TABLE Users_ (
    Id_user VARCHAR(8) PRIMARY KEY,
    Id_Occupation INT NOT NULL,
    Control_num VARCHAR(11) UNIQUE,
    Name_user VARCHAR(50),
    Last_name VARCHAR(50),
    Email VARCHAR(64) UNIQUE,
    Id_gender INT NOT NULL,
    -- Password VARCHAR(18), no definido si se requiere 
    Id_user_status INT NOT NULL,
    FOREIGN KEY (Id_user_status) REFERENCES User_status_(Id_user_status),
    FOREIGN KEY (Id_occupation) REFERENCES Occupations_(Id_occupation),
    FOREIGN KEY (Id_gender) REFERENCES Genders_ (Id_gender)
);



-- Tabla de categorías de eventos
CREATE TABLE Event_categories_ (
    Id_category INT PRIMARY KEY AUTO_INCREMENT,
    Type_event varchar (40),
    Event_name VARCHAR(15) NOT NULL UNIQUE
);


-- Tabla de eventos
CREATE TABLE Events_ (
    Id_event INT PRIMARY KEY AUTO_INCREMENT,
    Title VARCHAR(200) NOT NULL,
    Description TEXT,
    Id_category VARCHAR(40),
    Event_date DATE,
    FOREIGN KEY (Id_Category) REFERENCES Event_categories_(Id_category)
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




-- Tabla de categorías de comunidad RECREATIVAS, DEPORTES, CULTURAL Y VIDEOJUEGOS
CREATE TABLE Community_categories_ (
    Id_category INT PRIMARY KEY AUTO_INCREMENT,
    Id_type INT AUTO_INCREMENT,
    Category_name VARCHAR(20) NOT NULL UNIQUE,
	FOREIGN KEY (Id_type) REFERENCES Community_activity_types (Id_type)
);

-- Tabla de tipos de actividades de comunidad
CREATE TABLE Community_activity_types_ (
    Id_type INT PRIMARY KEY AUTO_INCREMENT,
    Type_name VARCHAR(40) NOT NULL
);

-- Tabla de actividades de comunidad
CREATE TABLE Community_activities_ (
    Id_activity INT PRIMARY KEY AUTO_INCREMENT,
    Title VARCHAR(150) NOT NULL,
    Description TEXT,
    Id_category INT NOT NULL,
    Id_Location INT AUTO_INCREMENT NOT NULL,
    Start_time TIME,
    End_time TIME,
    Event_date DATE, -- comparar el timpo y eliminar el evento 
    Organizer_id VARCHAR(8),
    FOREIGN KEY (Id_category) REFERENCES Community_categories_ (Id_category),
    FOREIGN KEY (Organizer_id) REFERENCES Users_(Id_user),
    FOREIGN KEY (Id_Location) REFERENCES Community_activity_location(Id_Location)
);

-- Tabla de Locaciones de eventos de la comunidad 

CREATE TABLE Community_activity_location_ (
	Id_Location INT AUTO_INCREMENT PRIMARY KEY,
    Location_ VARCHAR (50)
    
);

-- Tabla de asistencia a actividades de comunidad
CREATE TABLE Community_activity_attendance_ (
    Id_attendance INT AUTO_INCREMENT PRIMARY KEY,
    Id_user VARCHAR(8) NOT NULL,
    Id_activity INT NOT NULL,
    Confirmation INT NOT NULL AUTO_INCREMENT DEFAULT 1, 
    Timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (Id_user) REFERENCES Users_(Id_user),
    FOREIGN KEY (Id_activity) REFERENCES Community_activities_(Id_activity),
    UNIQUE (Id_user, Id_activity)
);