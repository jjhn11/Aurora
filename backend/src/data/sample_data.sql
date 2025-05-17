USE AuroraV2;

-- First, insert data into tables with no dependencies
INSERT INTO Occupations_ (Occupation) VALUES 
('Estudiante'), ('Profesor'), ('Administrativo'), ('Investigador'), ('Directivo');

INSERT INTO User_status_ (User_status) VALUES 
('Activo'), ('Inactivo'), ('Suspendido'), ('Egresado'), ('Baja temporal');

INSERT INTO Genders_ (Gender_name) VALUES 
('Masculino'), ('Femenino'), ('No binario'), ('Prefiero no decir');

-- Then insert Users_ data (depends on the above tables)
INSERT INTO Users_ (Id_user, Id_Occupation, Control_num, Name_user, Last_name, Email, Id_gender, Id_user_status) VALUES 
('USER003', 1, '19490003', 'Juan', 'Pérez González', 'a19490003@itmexicali.edu.mx', 1, 1),
('USER002', 2, '15490002', 'María', 'López Sánchez', 'maria.lopez@itmexicali.edu.mx', 2, 1),
('USER005', 1, '21490005', 'Carlos', 'Ramírez Vega', 'a21490005@itmexicali.edu.mx', 1, 1),
('USER001', 3, '13490001', 'Ana', 'Martínez Cruz', 'ana.martinez@itmexicali.edu.mx', 2, 1),
('USER004', 3, '19490004', 'Roberto', 'González Torres', 'roberto.gonzalez@itmexicali.edu.mx', 1, 1);


-- Event categories before events
INSERT INTO Event_categories_ (Category_event_name) VALUES 
( 'Cultural'), 
( 'Escolar'), 
( 'Deportivo');

-- Community tables
INSERT INTO Community_categories_ (Category_name) VALUES 
 ('Cultural'), ('Deportes'),('Recreativas'), ('Videojuegos');

INSERT INTO Community_activity_types_ (Type_name, Id_category) VALUES 
('DANZA', 1),('CELEBRACIONES INTERNACIONALES',1),('MÚSICA', 1),
('ARTES PLÁSTICAS', 1),('PIANO', 1),('DEBATE', 1),('OTRA ACTIVIDAD CULTURAL', 1),

('VOLLEYBALL SALA', 2),('VOLLEYBALL PLAYA', 2),('SOFTBOL', 2),
('BEISBOL', 2),('BASQUETBOL', 2),('ATLETISMO', 2),('PORRA', 2),
('BOX', 2),('FUTBOL', 2),('OTRO DEPORTE', 2),

('BANDA DE GUERRA', 3),('ESCOLTA', 3),('LECTURAS', 3),('AJEDREZ', 3),('RALLYS', 3),
('BATALLAS DE FREESTYLE - RAP', 3),('JUEGOS DE MESA', 3),('BAZAR', 3),
('CONCURSO', 3),('TUTORÍAS', 3),('OTRA ACTIVIDAD RECREATIVA', 3),

('ACCIÓN', 4),('ROL', 4),('ESTRATEGIA', 4),
('AVENTURA', 4),('SIMULACION', 4),('DEPORTES', 4),('CARRERAS', 4),
('PUZZLES', 4),('MUSICAL', 4),('TERROR', 4),('OTRO GENERO', 4);



-- FIXED: Added Id_category which is required per model/schema
INSERT INTO Community_activity_location_ (Location_, Id_category) VALUES

('AULA DE EXTRAESCOLARES',1),
('JARDIN EDIFICIO U', 1),
('BIBLIOTECA PLANTA ALTA', 1),
('BIBLIOTECA PLANTA BAJA', 1),
('PLAZA C-BÚFALO', 1),
('PLAZA BICENTENARIO', 1),
('AUDIOVISUAL EDIFICIO U PLANTA ALTA', 1),
('AUDIOVISUAL EDIFICIO U PLANTA BAJA', 1),
('AUDIOVISUAL EDIFICIO D', 1),
('CUBICULO DE ESTUDIO', 1),
('ZONA LIBRE',1),
('CANCHA EXTRAESCOLARES', 1),
('BIBLIOTECA SALA CIRCULOS DE LECTURA', 1),

('CANCHA VOLLEYBALL SALA TRASERA 1', 2),
('CANCHA VOLLEYBALL SALA TRASERA 2', 2),
('CANCHA VOLLEYBALL PLAYA', 2),
('CAMPO SOFTBOL', 2),
('CAMPO BEISBOL 1', 2),
('CAMPO BEISBOL 2', 2),
('CANCHA BASQUETBOL CENTRAL', 2),
('CANCHA BASQUETBOL TRASERA', 2),
('CANCHA SOCCER / FUTBOL 1', 2),
('CANCHA SOCCER / FUTBOL 2', 2),
('CANCHA SOCCER / FUTBOL 3', 2),

('AULA DE EXTRAESCOLARES',3),
('JARDIN EDIFICIO U', 3),
('BIBLIOTECA PLANTA ALTA', 3),
('BIBLIOTECA PLANTA BAJA', 3),
('PLAZA C-BÚFALO', 3),
('PLAZA BICENTENARIO', 3),
('AUDIOVISUAL EDIFICIO U PLANTA ALTA', 3),
('AUDIOVISUAL EDIFICIO U PLANTA BAJA', 3),
('AUDIOVISUAL EDIFICIO D', 3),
('CUBICULO DE ESTUDIO', 3),
('ZONA LIBRE',3),
('CANCHA EXTRAESCOLARES', 3),
('BIBLIOTECA SALA CIRCULOS DE LECTURA', 3),

('EDIFICIO D', 4),
('EDIFICIO F', 4),
('EDIFICIO U', 4),
('EDIFICIO G', 4),
('PLAZA C-BÚFALO', 4),
('PLAZA BICENTENARIO', 4),
('BIBLIOTECA PLANTA ALTA', 4),
('EDIFICIO M', 4),
('EDIFICIO X', 4),
('EDIFICIO E', 4);



-- First insert Calendar_Events_ data (Events_ depends on this)
INSERT INTO Calendar_Events_ (Start_date, End_date) VALUES 
('2025-01-01', '2025-07-31');


INSERT INTO Events_ (Title, Description, Image_url, Id_category, Event_date, Id_calendar, Is_coming) VALUES 
-- cultural
('Festival de Arte Digital', 'Exhibición de arte digital y multimedia', '/upload/events/digital-art.jpg', 1, '2025-04-15', 1, 0),
('Exposición Fotográfica', 'Muestra de fotografía contemporánea', '/upload/events/photo-expo.jpg', 1, '2025-05-20', 1, 0),
('Concierto Sinfónico', 'Presentación de la orquesta estudiantil', '/upload/events/symphony.jpg', 1, '2025-06-10', 1, 0),
('Festival de Danza', 'Presentaciones de diversos géneros de danza', '/upload/events/dance.jpg', 1, '2025-07-05', 1, 0),
('Teatro Universitario', 'Obra de teatro contemporáneo', '/upload/events/theater.jpg', 1, '2025-05-15', 1, 0),
('Noche de Poesía', 'Recital de poesía y música acústica', '/upload/events/poetry.jpg', 1, '2025-04-20', 1, 0),
('Festival de Cortometrajes', 'Muestra de cortometrajes estudiantiles', '/upload/events/short-films.jpg', 1, '2025-06-01', 1, 0),
('Exposición de Pinturas', 'Muestra de artistas emergentes', '/upload/events/painting.jpg', 1, '2025-05-24', 1, 0),
('Festival Cultural', 'Celebración multicultural', '/upload/events/cultural-fest.jpg', 1, '2025-04-12', 1, 0),
('Concierto de Jazz', 'Noche de jazz y blues', '/upload/events/jazz.jpg', 1, '2025-04-30', 1, 0),
('DIA DEL ESTUDIANTE', 'Festejo por el día del estudiante.', '/uploads/events/23 de Mayo  DIA DEL ESTUDIANTE.jpg', 1, '2025-05-23', 1, 1),
('DIA DEL CONTADOR', 'Festejo por el día del contador.', '/uploads/events/26 de Mayo  DIA DEL CONTADOR.jpg', 1, '2025-05-26', 1, 1),
('Jornada Nacional de Tequios por La Paz y contra las adicciones', 'Súmate a esta jornada para cambiar nuestro entorno. Registra tu lugar en https://forms.gle/bhJW1saFhBQ5kzQq5', '/uploads/events/14 de Mayo  Jornada Nacional de Tequios por La Paz y contra las adicciones.jpg', 1, '2025-05-14', 1, 1),
-- escolar
('Conferencia de Robótica', 'Avances en robótica e IA', '/upload/events/robotics.jpg', 2, '2025-04-20', 1, 0),
('Seminario de Investigación', 'Presentación de proyectos de investigación', '/upload/events/research.jpg', 2, '2025-05-15', 1, 0),
('Taller de Programación', 'Introducción a Python y Machine Learning', '/upload/events/coding.jpg', 2, '2025-06-05', 1, 0),
('Feria de Ciencias', 'Exhibición de proyectos científicos', '/upload/events/science-fair.jpg', 2, '2025-07-10', 1, 0),
('Congreso de Ingeniería', 'Tendencias en ingeniería moderna', '/upload/events/engineering.jpg', 2, '2025-06-03', 1, 0),
('Workshop de Innovación', 'Metodologías ágiles y design thinking', '/upload/events/innovation.jpg', 2, '2025-09-15', 1, 0),
('Simposio Académico', 'Encuentro de investigadores', '/upload/events/symposium.jpg', 2, '2025-05-18', 1, 0),
('Conferencia de Sostenibilidad', 'Tecnologías verdes y medio ambiente', '/upload/events/sustainability.jpg', 2, '2025-04-26', 1, 0),
('Hackathon Educativo', 'Desarrollo de soluciones educativas', '/upload/events/edu-hackathon.jpg', 2, '2025-12-05', 1, 0),
('Feria de Proyectos', 'Exhibición de proyectos finales', '/upload/events/projects-fair.jpg', 2, '2025-06-10', 1, 0),
('INNOVATEC 2025', 'Te esperamos de 9am a 3pm para que seas parte de este importante evento.', '/uploads/events/12 de Mayo  INNOVATEC 2025.jpg', 2, '2025-05-12', 1, 1),
('FERIA DEL EMPLEO', 'Te esperamos en biblioteca planta alta de 9 am a 1 pm y de 4 a 6 pm con reclutadores de más de 15 empresas. No olvides tu CV.', '/uploads/events/13 de Mayo  FERIA DEL EMPLEO.jpg', 2, '2025-05-13', 1, 1),
('TORNEO DESMOS', 'Concurso que hace uso de la calculadora gráfica DESMOS para resolver problemas creativos matemáticos con ecuaciones.', '/uploads/events/14 de Mayo TORNEO DESMOS.jpg', 2, '2025-05-14', 1, 1),
('4to CONCURSO DE TERMODINAMICA', 'Concurso entre alumnos del tecnológico de la carrera de termodinámica.', '/uploads/events/21 de Mayo  4to CONCURSO DE TERMODINAMICA.jpg', 2, '2025-05-21', 1, 1),
('XXX FORO DE ERGONOMÍA Y EXPO INDUSTRIAL', 'Presentaciones y talleres enfocados en la ergonomía y seguridad industrial.', '/uploads/events/27 al 29 de Mayo  XXX FORO DE ERGONOMIA Y EXPO INDUSTRIAL.jpg', 2, '2025-05-27', 1, 1),
('CONCURSO DE ROBOTICA', 'Concurso de robótica entre alumnos del tecnológico.', '/upload/events/robotica.jpg', 2, '2025-05-28', 1, 0),
('DIA DEL INGENIERO', 'Festejo por el día del ingeniero.', '/upload/events/ingeniero.jpg', 2, '2025-07-01', 1, 0),
('DIA DEL MAESTRO', 'Festejo por el día del maestro.', '/upload/events/maestro.jpg', 2, '2025-05-15', 1, 0),
-- Deportivo 
('Torneo de Básquetbol', 'Competencia interuniversitaria', '/upload/events/basketball.jpg', 3, '2025-04-25', 1, 0),
('Carrera Atlética', '5K y 10K universitario', '/upload/events/running.jpg', 3, '2025-05-10', 1, 0),
('Torneo de Voleibol', 'Liga interna de voleibol', '/upload/events/volleyball.jpg', 3, '2025-06-15', 1, 0),
('Competencia de Natación', 'Encuentro de natación', '/upload/events/swimming.jpg', 3, '2025-07-03', 1, 0),
('Torneo de Ajedrez', 'Competencia de ajedrez', '/upload/events/chess.jpg', 3, '2025-05-25', 1, 0),
('Copa de Fútbol Sala', 'Torneo interno de futsal', '/upload/events/futsal.jpg', 3, '2025-05-03', 1, 0),
('Competencia de Atletismo', 'Encuentro atlético universitario', '/upload/events/athletics.jpg', 3, '2025-04-07', 1, 0),
('Torneo de Tenis', 'Competencia individual y dobles', '/upload/events/tennis.jpg', 3, '2025-04-19', 1, 0),
('Olimpiadas Universitarias', 'Competencias multideportivas', '/upload/events/olympics.jpg', 3, '2025-05-01', 1,0),
('Torneo de E-Sports', 'Competencia de deportes electrónicos', '/upload/events/esports.jpg', 3, '2025-04-27', 1, 0);

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