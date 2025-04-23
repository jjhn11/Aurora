const express = require('express');
const router = express.Router();
const Community = require('../models/Community'); 


// GET
router.get('/communities', async (req, res) => {
    try {
      const { category } = req.query; // Leer el parámetro opcional ?category=<id>
      let query = {};
  
      if (category) {
        query.Id_category = category; // Filtrar por categoría si se proporciona
      }
  
      const communities = await Community.findAll({ where: query }); // Buscar comunidades
      res.status(200).json(communities); // Responder con las comunidades encontradas
    } catch (error) {
      res.status(500).json({
        error: 'Error al obtener las comunidades',
        details: error.message
      });
    }
  });
  
  module.exports = router;
  

// POST: Crear una nueva comunidad
router.post('/communities', async (req, res) => {
    try {
      const {
        name,
        description,
        id_category
      } = req.body;
  
      const savedCommunity = await Community.create({
        name,
        description,
        id_category
      });
  
      res.status(201).json(savedCommunity);
    } catch (error) {
      res.status(500).json({
        error: 'Error al crear la comunidad',
        details: error.message
      });
    }
  });
  
  

module.exports = router;