import express from 'express';
const router = express.Router(); 
import CommunityActivities from '../models/CommunityActivities.js';
import CommunityActivityType from '../models/CommunityActivityTypes.js';

// GET
router.get('/community-activities', async (req, res) => {
    try {
      const { type, category } = req.query;
      let query = {};
      let include = [];
      
      if (type) {
        query.Id_type = type; // Filter by type if provided
      }
      
      if (category) {
        // If filtering by category, we need to include the type model and specify
        // where condition for the category
        include = [{
          model: CommunityActivityType,
          where: { Id_category: category },
          required: true
        }];
      }
  
      const activities = await CommunityActivities.findAll({ 
        where: query,
        include: include
      });
      
      res.status(200).json(activities);
    } catch (error) {
      res.status(500).json({
        error: 'Error al obtener las actividades de comunidades',
        details: error.message
      });
    }
});


// POST: Crear una nueva comunidad
router.post('/community-activities', async (req, res) => {
    try {
      const {
        Title,
        Description,
        Id_type,
        Location,
        Start_time,
        End_time,
        Event_date,
        Status,
        Organizer_id
      } = req.body;
      
      const savedActivity = await CommunityActivities.create({
        Title,
        Description,
        Id_type,
        Location,
        Start_time,
        End_time,
        Event_date,
        Status,
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
  
 
  // GET all categories
router.get('/community-categories', async (req, res) => {
  try {
    const CommunityCategories = require('../models/CommunityCategories');
    const categories = await CommunityCategories.findAll();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET all activity types
router.get('/community-activity-types', async (req, res) => {
  try {
    const types = await CommunityActivityType.findAll();
    res.status(200).json(types);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;