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
('USER005', 1, '19210005', 'Roberto', 'González Torres', 'roberto.gonzalez@itmexicali.edu.mx', 1, 1),
('USER006', 3, '22490390', 'JHOSTIN', 'PACO VELAZQUEZ', 'a22490390@itmexicali.edu.mx', 1, 1);

-- Event categories before events
INSERT INTO Event_categories_ (Type_event, Event_name) VALUES 
('Exposición', 'Cultural'), 
('Conferencia', 'Escolar'), 
('Competencia', 'Deportivo');

-- Community tables
INSERT INTO Community_categories_ (Category_name) VALUES 
('Tecnología'), ('Arte y Cultura'), ('Deporte'), ('Académico'), ('Voluntariado');

INSERT INTO Community_activity_types_ (Type_name, Id_category) VALUES 
('Proyecto Colaborativo', 1),
('Exposición', 2),
('Entrenamiento', 3),
('Grupo de Estudio', 4),
('Ayuda Comunitaria', 5);

-- FIXED: Added Id_category which is required per model/schema
INSERT INTO Community_activity_location_ (Location_, Id_category) VALUES
('Sala de Juntas A', 1), 
('Galería Central', 2), 
('Cancha de Baloncesto', 3), 
('Aula 102', 4), 
('Playa Municipal', 5);

-- First insert Calendar_Events_ data (Events_ depends on this)
INSERT INTO Calendar_Events_ (Start_date, End_date) VALUES 
('2025-01-01', '2025-07-31');


INSERT INTO Events_ (Title, Description, Image_url, Id_category, Event_date, Id_calendar, Is_coming) VALUES 
-- cultural
('Festival de Arte Digital', 'Exhibición de arte digital y multimedia', '/images/events/digital-art.jpg', 1, '2025-04-15', 1, 1),
('Exposición Fotográfica', 'Muestra de fotografía contemporánea', '/images/events/photo-expo.jpg', 1, '2025-05-20', 1, 1),
('Concierto Sinfónico', 'Presentación de la orquesta estudiantil', '/images/events/symphony.jpg', 1, '2025-06-10', 1, 1),
('Festival de Danza', 'Presentaciones de diversos géneros de danza', '/images/events/dance.jpg', 1, '2025-07-05', 1, 1),
('Teatro Universitario', 'Obra de teatro contemporáneo', '/images/events/theater.jpg', 1, '2025-08-15', 1, 1),
('Noche de Poesía', 'Recital de poesía y música acústica', '/images/events/poetry.jpg', 1, '2025-09-20', 1, 1),
('Festival de Cortometrajes', 'Muestra de cortometrajes estudiantiles', '/images/events/short-films.jpg', 1, '2025-10-10', 1, 1),
('Exposición de Pinturas', 'Muestra de artistas emergentes', '/images/events/painting.jpg', 1, '2025-11-15', 1, 1),
('Festival Cultural', 'Celebración multicultural', '/images/events/cultural-fest.jpg', 1, '2025-12-01', 1, 1),
('Concierto de Jazz', 'Noche de jazz y blues', '/images/events/jazz.jpg', 1, '2025-12-15', 1, 1),
-- escolar
('Conferencia de Robótica', 'Avances en robótica e IA', '/images/events/robotics.jpg', 2, '2025-04-20', 1, 1),
('Seminario de Investigación', 'Presentación de proyectos de investigación', '/images/events/research.jpg', 2, '2025-05-15', 1, 1),
('Taller de Programación', 'Introducción a Python y Machine Learning', '/images/events/coding.jpg', 2, '2025-06-05', 1, 1),
('Feria de Ciencias', 'Exhibición de proyectos científicos', '/images/events/science-fair.jpg', 2, '2025-07-10', 1, 1),
('Congreso de Ingeniería', 'Tendencias en ingeniería moderna', '/images/events/engineering.jpg', 2, '2025-08-20', 1, 1),
('Workshop de Innovación', 'Metodologías ágiles y design thinking', '/images/events/innovation.jpg', 2, '2025-09-15', 1, 1),
('Simposio Académico', 'Encuentro de investigadores', '/images/events/symposium.jpg', 2, '2025-10-05', 1, 1),
('Conferencia de Sostenibilidad', 'Tecnologías verdes y medio ambiente', '/images/events/sustainability.jpg', 2, '2025-11-10', 1, 1),
('Hackathon Educativo', 'Desarrollo de soluciones educativas', '/images/events/edu-hackathon.jpg', 2, '2025-12-05', 1, 1),
('Feria de Proyectos', 'Exhibición de proyectos finales', '/images/events/projects-fair.jpg', 2, '2025-12-10', 1, 1),
-- Deportivo 
('Torneo de Básquetbol', 'Competencia interuniversitaria', '/images/events/basketball.jpg', 3, '2025-04-25', 1, 1),
('Carrera Atlética', '5K y 10K universitario', '/images/events/running.jpg', 3, '2025-05-10', 1, 1),
('Torneo de Voleibol', 'Liga interna de voleibol', '/images/events/volleyball.jpg', 3, '2025-06-15', 1, 1),
('Competencia de Natación', 'Encuentro de natación', '/images/events/swimming.jpg', 3, '2025-07-20', 1, 1),
('Torneo de Ajedrez', 'Competencia de ajedrez', '/images/events/chess.jpg', 3, '2025-08-25', 1, 1),
('Copa de Fútbol Sala', 'Torneo interno de futsal', '/images/events/futsal.jpg', 3, '2025-09-10', 1, 1),
('Competencia de Atletismo', 'Encuentro atlético universitario', '/images/events/athletics.jpg', 3, '2025-10-15', 1, 1),
('Torneo de Tenis', 'Competencia individual y dobles', '/images/events/tennis.jpg', 3, '2025-11-20', 1, 1),
('Olimpiadas Universitarias', 'Competencias multideportivas', '/images/events/olympics.jpg', 3, '2025-12-01', 1, 1),
('Torneo de E-Sports', 'Competencia de deportes electrónicos', '/images/events/esports.jpg', 3, '2025-12-15', 1, 1);

-- Community activities
INSERT INTO Community_activities_ (Title, Description, Id_type, Id_Location, Start_time, End_time, Event_date, Organizer_id) VALUES 
('Desarrollo de App Móvil', 'Proyecto colaborativo para estudiantes', 1, 1, '14:00:00', '17:00:00', '2025-01-25', 'USER001'),
('Exposición de Fotografía', 'Muestra del trabajo fotográfico', 2, 2, '10:00:00', '18:00:00', '2025-02-01', 'USER002'),
('Entrenamiento de Baloncesto', 'Sesión de práctica para el equipo', 3, 3, '16:00:00', '18:00:00', '2025-01-18', 'USER003'),
('Grupo de Estudio de Matemáticas', 'Sesiones para reforzar conocimientos', 4, 4, '13:00:00', '15:00:00', '2025-01-17', 'USER004'),
('Limpieza de Playa', 'Actividad de voluntariado local', 5, 5, '08:00:00', '12:00:00', '2025-02-12', 'USER005');

-- Community activity attendance
INSERT INTO Community_activity_attendance_ (Id_user, Id_activity, Confirmation) VALUES 
('USER001', 1, 1),
('USER002', 1, 1),
('USER003', 2, 1),
('USER004', 3, 1),
('USER005', 4, 1),
('USER001', 5, 1),
('USER002', 3, 1),
('USER003', 4, 1);