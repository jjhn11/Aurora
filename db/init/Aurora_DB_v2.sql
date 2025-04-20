-- NOTAS: 
-- Todos los nombres de tablas estan escritos con el formato "Users_"
-- primaer aletra mayuscula, nombre en plural y terminan con un _ (gion bajo)

-- Todas los campos estan escritos mediante el formato siguiente "Id_Users/Name"
-- Para las llaves primarias: Señanalda con un "Id" al inicio sedguido de guion bajo "_" y despues el nombre del campo.
-- Para campos nomrmales: Primar letra del nombre en mayuscula y si se reguire otra palabra separarla por guion bajo "_" y en  minusculas.


CREATE DATABASE AuroraV2;
USE AuroraV2;

-- Tabla de usuarios y tablas complementarias de datos estáticos.
CREATE TABLE Users_ (
    Id_user VARCHAR(8) PRIMARY KEY,
    Id_career INT NOT NULL,
    Control_num VARCHAR(11) UNIQUE,
    Name_ VARCHAR(50),
    Last_name VARCHAR(50),
    Email VARCHAR(64) UNIQUE,
    Gender INT NOT NULL,
    Pasword VARCHAR(18),
    Country VARCHAR(30),
    Id_status INT NOT NULL,
    Id_atendence_ce INT,
    
		FOREIGN KEY (Id_status) REFERENCES user_status(Id_user_status),
		FOREIGN KEY (Id_career) REFERENCES Careers(Id_Career),
		FOREIGN KEY (Country) REFERENCES Contrys(Id_Country),
		FOREIGN KEY (Id_atendence_ce) REFERENCES Community_event_atendence_(Id_atendence)
    
);

-- Tabla carrera de datos estaticos
CREATE TABLE Careers_(
	Id_Career INT PRIMARY KEY AUTO_INCREMENT,
	Career_name VARCHAR(40)
);
-- Tabla Estatus del usuario de datos estaticos
CREATE TABLE User_status_(
    Id_user_status INT PRIMARY KEY AUTO_INCREMENT,
    User_status VARCHAR(20) NOT NULL UNIQUE
);

-- Tabla generos de datos estaticos
CREATE TABLE Genders_ (
	Id_Gender INT AUTO_INCREMENT PRIMARY KEY,
	Gender_name VARCHAR (20)  
    );
    
    CREATE TABLE Community_event_atendence_(
	Id_atendence INT PRIMARY KEY AUTO_INCREMENT,
    Atendence_name VARCHAR (15)
);



-- Tabla de Eventos Y sus tablas complementarias 
CREATE TABLE  Events_ (
	Id_event INT PRIMARY KEY AUTO_INCREMENT,
    Title VARCHAR(200) NOT NULL,
    Description TEXT ,
    Id_Event_Category INT NOT NULL,
    Id_Event_type INT,
    Event_date DATE,
    Start_time TIME,
    End_time TIME,
    Location VARCHAR(150),
    status ENUM('Planificado', 'En curso', 'Finalizado') DEFAULT 'Planificado',
    is_recurrent BOOLEAN DEFAULT false,
		FOREIGN KEY (Id_Event_Category) REFERENCES Event_categories(Id_category),
		FOREIGN KEY (Id_Event_type) REFERENCES event_types(type_id)
);


CREATE TABLE Event_categories_ (
    Id_category INT PRIMARY KEY AUTO_INCREMENT,
    Event_name VARCHAR(15) NOT NULL UNIQUE
);

CREATE TABLE Event_types_ (
    Id_type INT PRIMARY KEY AUTO_INCREMENT,
    Type_name VARCHAR(100) NOT NULL UNIQUE,
    category_id INT NOT NULL,
    FOREIGN KEY (category_id) REFERENCES event_categories(category_id)
    );
    
CREATE TABLE Calendar_Events_ (
	Id_calendar INT PRIMARY KEY AUTO_INCREMENT,
    event_id INT NOT NULL, -- llave foranea 
    Calendar_date DATE NOT NULL,
    Start_date DATE,
    End_date DATE,
    Notes TEXT,
    FOREIGN KEY (event_id) REFERENCES Events_ (Id_event)
);  
    
    
-- Tabla de comunidad y SUS TABLAS COMPLEMANTARIAS 
CREATE TABLE Communities_ (
	Id_community_event INT PRIMARY KEY AUTO_INCREMENT,
    Name_community_event VARCHAR(100) NOT NULL,
    Description_event TEXT,
    Start_time TIME NOT NULL,
    End_time TIME NOT NULL,
    Event_date DATE NOT NULL,  -- Fecha del evento (importante a contemplar)
    Location VARCHAR(150) NOT NULL,
    Activity_type INT NOT NULL,
    Category_Community INT, 
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
		FOREIGN KEY (Activity_type) REFERENCES Community_Activity_type(Id_activity),
		FOREIGN KEY (Location) REFERENCES Ubications_(Id_ubication),
		FOREIGN KEY (Category_Community) REFERENCES Community_Category_(Id_community_category)

    );
    
  --  

CREATE TABLE Ubications_ (
    Id_ubication INT PRIMARY KEY AUTO_INCREMENT,
    Ubication_name VARCHAR(150) NOT NULL
);


CREATE TABLE Community_Activity_type_(
	Id_activity INT PRIMARY KEY AUTO_INCREMENT,
	Activity_name VARCHAR (50)
    );
    
    
CREATE TABLE Community_Category_(  
	Id_community_category INT PRIMARY KEY AUTO_INCREMENT,
    Name_community_category VARCHAR(20)
);