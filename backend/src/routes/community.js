const express = require('express');
const router = express.Router();
const Community = require('../models/Community'); // Asegúrate de que la ruta sea correcta

// GET: Obtener comunidades, con filtro opcional por categoría
router.get('/communities', async (req, res) => {
    try {
        const { category } = req.query; // Leer el parámetro opcional ?category=<id>
        let query = {};

        if (category) {
            query.Category_Community = category; // Filtrar por categoría si se proporciona
        }

        const communities = await Community.find(query); // Buscar comunidades
        res.status(200).json(communities); // Responder con las comunidades encontradas
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener las comunidades', details: error.message });
    }
});

// POST: Crear una nueva comunidad
router.post('/communities', async (req, res) => {
    try {
        const { name, description, Category_Community } = req.body; // Leer datos del cuerpo de la solicitud

        // Crear una nueva comunidad
        const newCommunity = new Community({
            name,
            description,
            Category_Community,
        });

        const savedCommunity = await newCommunity.save(); // Guardar en la base de datos
        res.status(201).json(savedCommunity); // Responder con la comunidad creada
    } catch (error) {
        res.status(500).json({ error: 'Error al crear la comunidad', details: error.message });
    }
});

module.exports = router;