import express from 'express';
import CommunityActivities from '../models/CommunityActivities.js';
import CommunityActivityType from '../models/CommunityActivityTypes.js';
import CommunityCategories from '../models/CommunityCategories.js';

const router = express.Router(); 

// GET
router.get('/community-activities', async (req, res) => {
    try {
      const { category } = req.query;
      let query = {};
      let include = [];
      
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
        include: include,
        order:[ ['id_category', 'DESC']]
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
        Id_category,
        Id_Location,
        Start_time,
        End_time,
        Event_date,
        Organizer_id
      } = req.body;
      
        // Verificar si el usuario existe
        const userExists = await User.findByPk(Organizer_id);
        if (!userExists) {
            return res.status(400).json({
                error: 'Usuario organizador no encontrado',
                details: `El usuario con ID ${Organizer_id} no existe`
            });
        }
        
      const savedActivity = await CommunityActivities.create({
        Title,
        Description,
        Id_category,
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
  
 
  // GET all categories
router.get('/community-categories', async (req, res) => {
  try {
    const categories = await CommunityCategories.findAll();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// GET activity types
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



export default router;