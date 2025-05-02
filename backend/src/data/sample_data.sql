USE AuroraV2;

-- First, insert data into tables with no dependencies
INSERT INTO Occupations_ (Occupation) VALUES 
('Estudiante'), ('Profesor'), ('Administrativo'), ('Investigador'), ('Directivo');

INSERT INTO User_status_ (User_status) VALUES 
('Activo'), ('Inactivo'), ('Suspendido'), ('Graduado'), ('Baja temporal');

INSERT INTO Genders_ (Gender_name) VALUES 
('Masculino'), ('Femenino'), ('No binario'), ('Prefiero no decir');

-- Then insert Users_ data (depends on the above tables)
INSERT INTO Users_ (Id_user, Id_Occupation, Control_num, Name_user, Last_name, Email, Id_gender, Id_user_status) VALUES 
('USER001', 1, '19210001', 'Juan', 'Pérez González', 'juan.perez@itmexicali.edu.mx', 1, 1),
('USER002', 2, '19210002', 'María', 'López Sánchez', 'maria.lopez@itmexicali.edu.mx', 2, 1),
('USER003', 1, '19210003', 'Carlos', 'Ramírez Vega', 'carlos.ramirez@itmexicali.edu.mx', 1, 1),
('USER004', 3, '19210004', 'Ana', 'Martínez Cruz', 'ana.martinez@itmexicali.edu.mx', 2, 1),
('USER005', 1, '19210005', 'Roberto', 'González Torres', 'roberto.gonzalez@itmexicali.edu.mx', 1, 1);

-- Event categories before events
INSERT INTO Event_categories_ (Type_event, Event_name) VALUES 
('Conferencia', 'Académico'), 
('Exposición', 'Cultural'), 
('Competencia', 'Deportivo'), 
('Reunión', 'Social'), 
('Hackathon', 'Tecnológico');

-- Community tables
INSERT INTO Community_categories_ (Category_name) VALUES 
('Tecnología'), ('Arte y Cultura'), ('Deporte'), ('Académico'), ('Voluntariado');

INSERT INTO Community_activity_types_ (Type_name, Id_category) VALUES 
('Proyecto Colaborativo', 1),
('Exposición', 2),
('Entrenamiento', 3),
('Grupo de Estudio', 4),
('Ayuda Comunitaria', 5);

INSERT INTO Community_activity_location_ (Location_) VALUES
('Sala de Juntas A'), ('Galería Central'), ('Cancha de Baloncesto'), ('Aula 102'), ('Playa Municipal');

-- Now we can insert events and community activities
INSERT INTO Events_ (Title, Description, Id_category, Event_date) VALUES 
('Conferencia de IA', 'Exploraremos los avances más recientes en IA', 1, '2023-10-15'),
('Taller de Desarrollo Web', 'Aprende a crear sitios web modernos', 1, '2023-10-20'),
('Concierto de Bandas', 'Presentación de las mejores bandas', 2, '2023-11-05'),
('Torneo de Fútbol', 'Competencia deportiva entre carreras', 3, '2023-11-10'),
('Networking Tecnológico', 'Conecta con empresas del sector', 4, '2023-11-15');

INSERT INTO Community_activities_ (Title, Description, Id_type, Id_Location, Start_time, End_time, Event_date, Organizer_id) VALUES 
('Desarrollo de App Móvil', 'Proyecto colaborativo para estudiantes', 1, 1, '14:00:00', '17:00:00', '2023-10-25', 'USER001'),
('Exposición de Fotografía', 'Muestra del trabajo fotográfico', 2, 2, '10:00:00', '18:00:00', '2023-11-01', 'USER002'),
('Entrenamiento de Baloncesto', 'Sesión de práctica para el equipo', 3, 3, '16:00:00', '18:00:00', '2023-10-18', 'USER003'),
('Grupo de Estudio de Matemáticas', 'Sesiones para reforzar conocimientos', 4, 4, '13:00:00', '15:00:00', '2023-10-17', 'USER004'),
('Limpieza de Playa', 'Actividad de voluntariado local', 5, 5, '08:00:00', '12:00:00', '2023-11-12', 'USER005');

-- Finally, add attendance records
INSERT INTO Community_activity_attendance_ (Id_user, Id_activity, Confirmation) VALUES 
('USER001', 1, 1),
('USER002', 1, 1),
('USER003', 2, 1),
('USER004', 3, 1),
('USER005', 4, 1),
('USER001', 5, 1),
('USER002', 3, 1),
('USER003', 4, 1);

INSERT INTO Calendar_Events_ (Event_id, Calendar_date, Start_date, End_date, Notes) VALUES 
(1, '2023-10-15', '2023-10-15', '2023-10-15', 'Confirmar asistencia del ponente'),
(2, '2023-10-20', '2023-10-20', '2023-10-20', 'Preparar materiales con anticipación'),
(3, '2023-11-05', '2023-11-05', '2023-11-05', 'Revisar equipo de sonido'),
(4, '2023-11-10', '2023-11-10', '2023-11-10', 'Organizar equipos y árbitros'),
(5, '2023-11-15', '2023-11-15', '2023-11-15', 'Confirmar participación de empresas');