import express from 'express';
import CommunityActivities from '../models/CommunityActivities.js';
import CommunityActivityType from '../models/CommunityActivityTypes.js';
import CommunityCategories from '../models/CommunityCategories.js';
import CommunityActivityLocation from '../models/CommunityActivityLocation.js';
import CommunityActivityAttendance from '../models/CommunityActivityAttendance.js';

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
    const where = {};
    
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

export default router;