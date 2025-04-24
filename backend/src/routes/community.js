const express = require('express');
const router = express.Router(); 
const CommunityActivities = require('../models/CommunityActivities');


// GET
router.get('/community-activities', async (req, res) => {
    try {
      const { type } = req.query; // Leer el parámetro opcional ?category=<id>
      let query = {};
  
      if (type) {
        query.Id_type = type; // Filtrar por categoría si se proporciona
      }
  
      const activities = await CommunityActivities.findAll({ where: query }); // Buscar comunidades
      res.status(200).json(activities); // Responder con las comunidades encontradas
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
  
  

module.exports = router;