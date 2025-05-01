USE AuroraV2;






INSERT IGNORE INTO User_status_ (User_status) VALUES 
('Activo'), ('Inactivo'), ('Suspendido'), ('Graduado'), ('Baja temporal');


INSERT INTO Genders_ (Gender_name) VALUES 
('Masculino'), ('Femenino'), ('No binario'), ('Prefiero no decir');


INSERT INTO Community_event_attendance_ (Id_user, Id_activity, Confirmation) VALUES 
('USER001', 1, 1),  -- Asistió
('USER002', 1, 2),  -- No asistió
('USER003', 2, 3),  -- Justificado
('USER004', 2, 4),  -- Tardanza
('USER005', 3, 5);  -- Canceló


INSERT INTO Users_ (Id_user, Control_num, Name_user, Last_name, Email, Id_gender, Password, Id_user_status, Id_attendance_co) VALUES 
('USER001', '19210001', 'Juan', 'Pérez González', 'juan.perez@itmexicali.edu.mx', 1, 'password123', 1, 1),
('USER002', '19210002', 'María', 'López Sánchez', 'maria.lopez@itmexicali.edu.mx', 2, 'password123', 1, 2),
('USER003', '19210003', 'Carlos', 'Ramírez Vega', 'carlos.ramirez@itmexicali.edu.mx', 1, 'password123', 1, 1),
('USER004', '19210004', 'Ana', 'Martínez Cruz', 'ana.martinez@itmexicali.edu.mx', 2, 'password123', 1, 3),
('USER005', '19210005', 'Roberto', 'González Torres', 'roberto.gonzalez@itmexicali.edu.mx', 1, 'password123', 1, 1);


INSERT INTO Event_categories_ (Event_name) VALUES 
('Académico'), ('Cultural'), ('Deportivo'), ('Social'), ('Tecnológico');


INSERT INTO Event_types_ (Type_name, Category_id) VALUES 
('Conferencia', 1), ('Taller', 1), ('Concierto', 2), ('Torneo', 3), ('Networking', 4), ('Hackathon', 5);


INSERT INTO Events_ (Title, Description, Id_Event_Category, Id_Event_type, Event_date, Start_time, End_time, Location) VALUES 
('Conferencia de Inteligencia Artificial', 'Exploraremos los avances más recientes en IA', 1, 1, '2023-10-15', '10:00:00', '12:00:00', 'Auditorio Principal'),
('Taller de Desarrollo Web', 'Aprende a crear sitios web modernos', 1, 2, '2023-10-20', '15:00:00', '18:00:00', 'Laboratorio de Cómputo'),
('Concierto de Bandas Estudiantiles', 'Presentación de las mejores bandas del instituto', 2, 3, '2023-11-05', '18:00:00', '21:00:00', 'Plaza Central'),
('Torneo de Fútbol Interfacultades', 'Competencia deportiva entre distintas carreras', 3, 4, '2023-11-10', '09:00:00', '17:00:00', 'Cancha de Fútbol'),
('Networking con Empresas Tecnológicas', 'Oportunidad para conectar con empresas del sector', 4, 5, '2023-11-15', '16:00:00', '19:00:00', 'Sala de Conferencias');


INSERT INTO Calendar_Events_ (Event_id, Calendar_date, Start_date, End_date, Notes) VALUES 
(1, '2023-10-15', '2023-10-15', '2023-10-15', 'Confirmar asistencia del ponente'),
(2, '2023-10-20', '2023-10-20', '2023-10-20', 'Preparar materiales con anticipación'),
(3, '2023-11-05', '2023-11-05', '2023-11-05', 'Revisar equipo de sonido'),
(4, '2023-11-10', '2023-11-10', '2023-11-10', 'Organizar equipos y árbitros'),
(5, '2023-11-15', '2023-11-15', '2023-11-15', 'Confirmar participación de empresas');


INSERT INTO Event_Attendance_ (Id_user, Id_event, Confirmed) VALUES 
('USER001', 1, true),
('USER002', 1, true),
('USER001', 2, true),
('USER003', 3, true),
('USER004', 4, true),
('USER005', 5, true),
('USER002', 3, false),
('USER003', 1, true);


INSERT INTO Community_categories_ (Category_name) VALUES 
('Tecnología'), ('Arte y Cultura'), ('Deporte'), ('Académico'), ('Voluntariado');


INSERT INTO Community_activity_types_ (Type_name, Id_category) VALUES 
('Proyecto Colaborativo', 1),
('Exposición', 2),
('Entrenamiento', 3),
('Grupo de Estudio', 4),
('Ayuda Comunitaria', 5);

INSERT INTO Community_activities_ (Title, Description, Id_type, Location, Start_time, End_time, Event_date, Status, Organizer_id) VALUES 
('Desarrollo de App Móvil', 'Proyecto colaborativo para crear una app para estudiantes', 1, 'Sala de Juntas A', '14:00:00', '17:00:00', '2023-10-25', 'Activo', 'USER001'),
('Exposición de Fotografía', 'Muestra del trabajo fotográfico de los estudiantes', 2, 'Galería Central', '10:00:00', '18:00:00', '2023-11-01', 'Activo', 'USER002'),
('Entrenamiento de Baloncesto', 'Sesión de práctica para el equipo representativo', 3, 'Cancha de Baloncesto', '16:00:00', '18:00:00', '2023-10-18', 'Activo', 'USER003'),
('Grupo de Estudio de Matemáticas', 'Sesiones para reforzar conocimientos matemáticos', 4, 'Aula 102', '13:00:00', '15:00:00', '2023-10-17', 'Activo', 'USER004'),
('Limpieza de Playa', 'Actividad de voluntariado para limpiar la playa local', 5, 'Playa Municipal', '08:00:00', '12:00:00', '2023-11-12', 'Activo', 'USER005');


INSERT INTO Community_activity_attendance_ (Id_user, Id_activity, Confirmation) VALUES 
('USER001', 1, true),
('USER002', 1, true),
('USER003', 2, true),
('USER004', 3, true),
('USER005', 4, true),
('USER001', 5, true),
('USER002', 3, true),
('USER003', 4, true);


CREATE TABLE IF NOT EXISTS tasks (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  completed BOOLEAN DEFAULT false
);


INSERT INTO tasks (name, description, completed) VALUES
('Crear documentación', 'Escribir documentación del proyecto Aurora', false),
('Implementar autenticación', 'Añadir sistema de login con Google', true),
('Diseñar interfaz', 'Crear mockups para la aplicación', false),
('Configurar base de datos', 'Establecer esquema y relaciones', true),
('Pruebas de rendimiento', 'Evaluar el rendimiento de la aplicación', false);