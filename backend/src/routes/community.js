import express from 'express';
import CommunityActivities from '../models/Community/CommunityActivities.js';
import CommunityActivityAttendance from '../models/Community/CommunityActivityAttendance.js';
import CommunityActivityLocation from '../models/Community/CommunityActivityLocation.js';
import CommunityActivityType from '../models/Community/CommunityActivityTypes.js';
import CommunityCategories from '../models/Community/CommunityCategories.js';

const router = express.Router(); 

router.route('/activity')
// GET: Filter activities by category (through activity types)
.get(async (req, res) => {
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
})
// POST: Create a new community activity
.post(async (req, res) => {
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

router.route('/categories')
// GET: Get all community categories
.get(async (req, res) => {
  try {
    const categories = await CommunityCategories.findAll();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.route('/activity/types')
// GET: Get activity types with optional category filter
.get(async (req, res) => {
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

router.route('/activity/locations')
// GET: Get all activity locations with optional category filter
.get(async (req, res) => {
  try {
    const { categoryId } = req.query;
    const where = {};
    
    if (categoryId) {
      where.Id_category = categoryId;
    }
    
    const locations = await CommunityActivityLocation.findAll({ where });
    res.status(200).json(locations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.route('/activity/attendance')
// GET: Get attendance records with filter by activity or user
.get(async (req, res) => {
  try {
    const { activityId, userId } = req.query;
    const where = {};
    
    // Aplicar filtros si existen
    if (activityId) {
      where.Id_activity = activityId;
    }
    
    if (userId) {
      where.Id_user = userId;
    }
    
    const attendanceRecords = await CommunityActivityAttendance.findAll({ where });
    res.status(200).json(attendanceRecords);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
})
// POST: Register attendance for an activity
.post(async (req, res) => {
  const { Id_user, Id_activity, Confirmation } = req.body;

  // Add validation
  if (!Id_user || !Id_activity) {
    return res.status(400).json({ error: 'Id_user y Id_activity son obligatorios' });
  }

  // Add unique constraint check
  try {
    // Check if attendance already exists
    const existingAttendance = await CommunityActivityAttendance.findOne({
      where: { Id_user, Id_activity }
    });
    
    if (existingAttendance) {
      return res.status(400).json({ error: 'El usuario ya está registrado para esta actividad' });
    }
    
    // Default Confirmation to 1 if not provided
    const attendance = await CommunityActivityAttendance.create({
      Id_user,
      Id_activity,
      Confirmation: Confirmation || 1
    });
    
    res.status(201).json(attendance);
  } catch (error) {
    // Better error handling for database constraints
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({ error: 'El usuario ya está registrado para esta actividad' });
    }
    res.status(500).json({ error: error.message });
  }
})
// PUT: Update attendance confirmation status
.put(async (req, res) => {
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

// Añadir esta nueva ruta para obtener una actividad por ID específico
router.get('/activity/:id', async (req, res) => {
  try {
    const activityId = req.params.id;
    
    const activity = await CommunityActivities.findByPk(activityId);
    
    if (!activity) {
      return res.status(404).json({ error: 'Actividad no encontrada' });
    }
    
    res.status(200).json(activity);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;