import express from 'express';
import CalendarEvent from '../models/CalendarEvents.js';
import CommunityActivities from '../models/CommunityActivities.js';
import CommunityActivityAttendance from '../models/CommunityActivityAttendance.js';
import CommunityActivityLocation from '../models/CommunityActivityLocation.js';
import CommunityActivityType from '../models/CommunityActivityTypes.js';
import CommunityCategories from '../models/CommunityCategories.js';
import EventCategory from '../models/EventCategories.js';
import Event from '../models/Events.js';

const router = express.Router(); 

// GET: Filter activities by category (through activity types)
router.get('/community-activities', async (req, res) => {
    try {
      const { categoryId } = req.query;
      let where = {};
      
      if (categoryId) {
        // First, find all activity types that belong to this category
        const activityTypes = await CommunityActivityType.findAll({
          where: { Id_category: categoryId },
          attributes: ['Id_type']
        });
        
        // Extract the type IDs
        const typeIds = activityTypes.map(type => type.Id_type);
        
        // Filter activities by these types
        if (typeIds.length > 0) {
          where.Id_type = typeIds;
        }
      }
  
      const activities = await CommunityActivities.findAll({ 
        where,
        order: [['Event_date', 'DESC']] // Order by date, newest to oldest
      });
      
      res.status(200).json(activities);
    } catch (error) {
      res.status(500).json({
        error: 'Error al obtener las actividades de comunidades',
        details: error.message
      });
    }
});

// POST: Create a new community activity
router.post('/community-activities', async (req, res) => {
    try {
      const {
        Title,
        Description,
        Id_type,
        Id_Location,
        Start_time,
        End_time,
        Event_date,
        Organizer_id
      } = req.body;
      
      const savedActivity = await CommunityActivities.create({
        Title,
        Description,
        Id_type,
        Id_Location,
        Start_time,
        End_time,
        Event_date,
        Organizer_id
      });
  
      res.status(201).json(savedActivity);
    } catch (error) {
      res.status(500).json({
        error: 'Error al crear la actividad de la comunidad',
        details: error.message
      });
    }
});

// GET: Get all community categories
router.get('/community-categories', async (req, res) => {
  try {
    const categories = await CommunityCategories.findAll();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET: Get activity types with optional category filter
router.get('/community-activity-types', async (req, res) => {
  const { categoryId } = req.query;

  try {
    const where = {};
    if (categoryId) {
      where.Id_category = categoryId;
    }

    const types = await CommunityActivityType.findAll({ where });
    res.status(200).json(types);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET: Get all activity locations
router.get('/community-activity-locations', async (req, res) => {
  try {
    const locations = await CommunityActivityLocation.findAll();
    res.status(200).json(locations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET: Get attendance records with activity filter
router.get('/community-activity-attendance', async (req, res) => {
  try {
    const { activityId } = req.query;
    const where = {
      Confirmation: 1 // Only get confirmed attendances
    };
    
    if (activityId) {
      where.Id_activity = activityId;
    }
    
    const attendanceRecords = await CommunityActivityAttendance.findAll({ where });
    res.status(200).json(attendanceRecords);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST: Register attendance for an activity
router.post('/community-activity-attendance', async (req, res) => {
  try {
    const { Id_user, Id_activity, Confirmation } = req.body;
    
    const attendance = await CommunityActivityAttendance.create({
      Id_user,
      Id_activity,
      Confirmation
    });
    
    res.status(201).json(attendance);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST: Update attendance confirmation status
router.post('/community-activity-attendance/update', async (req, res) => {
  try {
    const { Id_user, Id_activity, Confirmation } = req.body;
    
    const attendance = await CommunityActivityAttendance.update(
      { Confirmation },
      { where: { Id_user, Id_activity } }
    );
    
    if (attendance[0] === 0) {
      return res.status(404).json({ error: 'Registro de asistencia no encontrado' });
    }
    
    res.status(200).json({ message: 'Asistencia actualizada correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});




// GET: Obtener todas las categorías de eventos
router.get('/event-categories', async (req, res) => {
  try {
    const categories = await EventCategory.findAll();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({
      error: 'Error al obtener las categorías de eventos',
      details: error.message
    });
  }
});

// POST: Crear nueva categoría de evento
router.post('/event-categories', async (req, res) => {
  try {
    const { Type_event, Event_name } = req.body;

    
    if (!Event_name) {
      return res.status(400).json({ error: 'El campo Event_name es obligatorio.' });
    }

    const newCategory = await EventCategory.create({
      Type_event,
      Event_name
    });

    res.status(201).json(newCategory);
  } catch (error) {
    res.status(500).json({
      error: 'Error al crear la categoría de evento',
      details: error.message
    });
  }
});

// GET: Obtener todos los eventos 
router.get('/events', async (req, res) => {
  try {
    const events = await Event.findAll();
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({
      error: 'Error al obtener los eventos',
      details: error.message,
    });
  }
});

// POST: Crear un nuevo evento
router.post('/events', async (req, res) => {
  try {
    const { Title, Description, Id_category, Event_date } = req.body;

    const newEvent = await Event.create({
      Title,
      Description,
      Id_category,
      Event_date
    });

    res.status(201).json(newEvent);
  } catch (error) {
    res.status(500).json({
      error: 'Error al crear el evento',
      details: error.message,
    });
  }
});


// GET: Obtener todos los eventos del calendario
router.get('/calendar-events', async (req, res) => {
  try {
    const calendarEvents = await CalendarEvent.findAll();
    res.status(200).json(calendarEvents);
  } catch (error) {
    res.status(500).json({
      error: 'Error al obtener los eventos del calendario',
      details: error.message
    });
  }
});

// POST: Crear un nuevo evento en el calendario
router.post('/calendar-events', async (req, res) => {
  try {
    const { Event_id, Calendar_date, Start_date, End_date, Notes } = req.body;

  
    if (!Event_id || !Calendar_date) {
      return res.status(400).json({ error: 'Event_id y Calendar_date son obligatorios' });
    }

    const newCalendarEvent = await CalendarEvent.create({
      Event_id,
      Calendar_date,
      Start_date,
      End_date,
      Notes
    });

    res.status(201).json(newCalendarEvent);
  } catch (error) {
    res.status(500).json({
      error: 'Error al crear el evento en el calendario',
      details: error.message
    });
  }
});

export default router;