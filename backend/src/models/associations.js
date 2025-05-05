// Importación de los modelos
const CalendarEvents = require('./CalendarEvents.js');
const EventCategories = require('./EventCategories.js');
const Event = require('./Events.js');
const CommunityActivities = require('./CommunityActivities.js');
const CommunityCategories = require('./CommunityCategories.js');
const CommunityActivityTypes = require('./CommunityActivityTypes.js');
const CommunityActivityLocation = require('./CommunityActivityLocation.js');
const CommunityActivityAttendance = require('./CommunityActivityAttendance.js');
const Users = require('./Users.js');
const UserStatus = require('./UserStatus.js');
const Occupations = require('./User/Occupations.js');
const Gender = require('./User/Gender.js');

// Asociaciones de eventos
Event.belongsTo(EventCategories, {
  foreignKey: 'Id_category',
  as: 'category',
});

Event.belongsTo(CalendarEvents, {
  foreignKey: 'Id_calendar',
  as: 'calendar',
});

EventCategories.hasMany(Event, {
  foreignKey: 'Id_category',
  as: 'events',
});

CalendarEvents.hasMany(Event, {
  foreignKey: 'Id_calendar',
  as: 'events',
});

// Asociaciones de usuarios
Users.belongsTo(UserStatus, {
  foreignKey: 'Id_user_status',
  as: 'status',
});

Users.belongsTo(Occupations, {
  foreignKey: 'Id_occupation',
  as: 'occupation',
});

Users.belongsTo(Gender, {
  foreignKey: 'Id_gender',
  as: 'gender',
});

UserStatus.hasMany(Users, {
  foreignKey: 'Id_user_status',
  as: 'users',
});

Occupations.hasMany(Users, {
  foreignKey: 'Id_occupation',
  as: 'users',
});

Gender.hasMany(Users, {
  foreignKey: 'Id_gender',
  as: 'users',
});

// Asociaciones de actividades de comunidad
CommunityActivities.belongsTo(CommunityActivityTypes, {
  foreignKey: 'Id_type',
  as: 'type',
});

CommunityActivities.belongsTo(CommunityActivityLocation, {
  foreignKey: 'Id_Location',
  as: 'location',
});

CommunityActivities.belongsTo(Users, {
  foreignKey: 'Organizer_id',
  as: 'organizer',
});

CommunityActivityTypes.hasMany(CommunityActivities, {
  foreignKey: 'Id_type',
  as: 'activities',
});

CommunityActivityLocation.hasMany(CommunityActivities, {
  foreignKey: 'Id_Location',
  as: 'activities',
});

Users.hasMany(CommunityActivities, {
  foreignKey: 'Organizer_id',
  as: 'organizedActivities',
});

// Asociaciones de asistencia a actividades de comunidad
CommunityActivityAttendance.belongsTo(Users, {
  foreignKey: 'Id_user',
  as: 'user',
});

CommunityActivityAttendance.belongsTo(CommunityActivities, {
  foreignKey: 'Id_activity',
  as: 'activity',
});

Users.hasMany(CommunityActivityAttendance, {
  foreignKey: 'Id_user',
  as: 'attendances',
});

CommunityActivities.hasMany(CommunityActivityAttendance, {
  foreignKey: 'Id_activity',
  as: 'attendances',
});

// Asociaciones de categorías de actividades de comunidad
CommunityActivityTypes.belongsTo(CommunityCategories, {
  foreignKey: 'Id_category',
  as: 'category',
});

CommunityActivityLocation.belongsTo(CommunityCategories, {
  foreignKey: 'Id_category',
  as: 'category',
});

CommunityCategories.hasMany(CommunityActivityTypes, {
  foreignKey: 'Id_category',
  as: 'types',
});

CommunityCategories.hasMany(CommunityActivityLocation, {
  foreignKey: 'Id_category',
  as: 'locations',
});
