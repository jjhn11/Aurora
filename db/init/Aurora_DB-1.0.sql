use aurora;

-- Tabla de Usuarios
CREATE TABLE users (
    Id_user VARCHAR(8) PRIMARY KEY,
    Id_carerr_department VARCHAR(8),
    Control_num VARCHAR(10),
    Name_ VARCHAR(100),
    Last_name VARCHAR(100),
    Email VARCHAR(100),
    Pasword VARCHAR(100),
    Id_status INT
);

-- Tablas de Departamento
CREATE TABLE users_department (
    Id_department INT PRIMARY KEY,
    Id_career_department INT,
    Department VARCHAR(100)
);
-- Tablas de Carrera 
CREATE TABLE users_career (
    Id_career INT PRIMARY KEY,
    Id_career_department INT,
    Career VARCHAR(100)
);

-- Tabla de Libro y sus relaciones
CREATE TABLE Books (
    ISBN VARCHAR(20) PRIMARY KEY,
    Id_category INT,
    Id_book_format INT,
    Id_binding INT,
    Id_autor INT,
    Title VARCHAR(200),
    Book_pubisher VARCHAR(100),
    Publication_year INT,
    Ubication VARCHAR(100),
    Pages_num INT,
    Edition_num INT,
    Availability BOOLEAN,
    Synopsis TEXT
);

CREATE TABLE Author_book (
    Id_author INT PRIMARY KEY,
    Author VARCHAR(60)
);
-- Tabla de encuadernacion de libros
CREATE TABLE binding_book(
    Id_binding INT PRIMARY KEY,
    Binding VARCHAR(50)
);
-- Formato de libros 
CREATE TABLE book_Formats (
    Id_book_Format INT PRIMARY KEY,
    Format_name VARCHAR(50)
);

-- Tabla Recursos digitales
CREATE TABLE digital_resources (
    Id_resource INT PRIMARY KEY,
    Id_resources_category INT,
    Id_resource_type INT,
    Title VARCHAR(100),
    Author VARCHAR(100),
    Link TEXT
);
-- Estaus de los recursos digitales 
CREATE TABLE digital_resource_status (
    Id_resource_status INT PRIMARY KEY,
    Type_resource VARCHAR(50)
);

-- Reservación de libros 
CREATE TABLE reservations (
    Id_reservation INT PRIMARY KEY,
    Id_user INT,
    Id_reservation_status INT,
    ISBN VARCHAR(20),
    Reservation_date DATE
);

-- Estado de reservación de libros 
CREATE TABLE reservations_status (
    Id_reservation_status INT PRIMARY KEY,
    Status_Book VARCHAR(50)
);

-- Préstamos
CREATE TABLE loans (
    Id_loans INT PRIMARY KEY,
    Id_user INT,
    ISBN VARCHAR(20),
    Loans_date DATE,
    Return_Date_Established DATE,
    Return_date_real DATE,
    Returned BOOLEAN
);

-- Tabla de adeudo de libros 
CREATE TABLE debts (
    Id_Debt INT PRIMARY KEY,
    Id_user INT,
    Days_delayed INT,
    Total_to_pay DECIMAL(10,2)
);

-- Tabla de Disponibilidad de cubículos
CREATE TABLE availability_cubicles (
    Id_availability_cubicles INT PRIMARY KEY,
    Availability VARCHAR(50)
);

-- Tabla Cubículos
CREATE TABLE cubicles (
    Id_cubicles INT PRIMARY KEY,
    Id_Availability INT,
    cubicle_name VARCHAR(50),
    Capacity INT,
    cubicle_ubication VARCHAR(100)
);

-- Estado de la reservación cubículo
CREATE TABLE cubicles_reservation_status (
    Id_reservation_status INT PRIMARY KEY,
    Status_cub VARCHAR(50)
);

-- Reservar cubículo
CREATE TABLE Reserve_cubicle (
    Id_Reserve_cubicle INT PRIMARY KEY,
    Id_user INT,
    Id_cubicule INT,
    Id_reservation_status_cub INT,
    Reserve_date DATE,
    Start_time TIME,
    End_time TIME
);

-- Reseñas
CREATE TABLE reviews (
    Id_review INT PRIMARY KEY,
    Id_user INT,
    ISBN VARCHAR(20),
    No_stars INT,
	Comment_Book TEXT,
	Published_date DATE,
	Control_like INT
);

-- Favoritos
	CREATE TABLE Favorites (
	Favorite_id INT PRIMARY KEY,
	User_id INT,
	Heart BOOLEAN
);

-- Notificaciones
	CREATE TABLE Notification (
	Notification_id INT PRIMARY KEY,
	User_id INT,
	Message TEXT,
	Sent_date DATE
);

-- Comunidad
CREATE TABLE Community (
Table_id INT PRIMARY KEY,
User_id INT,
Develop_discipline VARCHAR(100),
Location VARCHAR(100),
Schedule_ VARCHAR(50),
Description_ TEXT,
Attendance BOOLEAN
);