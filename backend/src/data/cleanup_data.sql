USE AuroraV2;

-- Disable foreign key checks temporarily
-- SET FOREIGN_KEY_CHECKS = 0;

-- Clean Community tables (child tables first)
DELETE FROM Community_activity_attendance_;
DELETE FROM Community_activities_;
DELETE FROM Community_activity_location_;
DELETE FROM Community_activity_types_;
DELETE FROM Community_categories_;

-- Clean Events tables
DELETE FROM Events_;
DELETE FROM Calendar_Events_;
DELETE FROM Event_categories_;

-- Clean User related tables (child tables first)
DELETE FROM Users_;
DELETE FROM Occupations_;
DELETE FROM User_status_;
DELETE FROM Genders_;

-- Reset auto-increment counters where applicable
ALTER TABLE Community_activities_ AUTO_INCREMENT = 1;
ALTER TABLE Community_activity_types_ AUTO_INCREMENT = 1;
ALTER TABLE Community_categories_ AUTO_INCREMENT = 1;
ALTER TABLE Event_categories_ AUTO_INCREMENT = 1;
ALTER TABLE Calendar_Events_ AUTO_INCREMENT = 1;
ALTER TABLE Events_ AUTO_INCREMENT = 1;
ALTER TABLE Occupations_ AUTO_INCREMENT = 1;
ALTER TABLE User_status_ AUTO_INCREMENT = 1;
ALTER TABLE Genders_ AUTO_INCREMENT = 1;

-- Re-enable foreign key checks
-- SET FOREIGN_KEY_CHECKS = 1;