import express from 'express';
import CalendarEvent from '../models/Events/CalendarEvents.js';
import EventCategory from '../models/Events/EventCategories.js';
import Event from '../models/Events/Events.js';

const router = express.Router(); 

router.route('/')
.get(async (req, res) => {
    try {
    const events = await Event.findAll();
    res.status(200).json(events);
    } catch (error) {
    res.status(500).json({
        error: 'Error al obtener los eventos',
        details: error.message,
    });
    }
})
.post(async (req, res) => {
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

router.route('/categories')
// GET: Obtener todas las categorías de eventos
.get(async (req, res) => {
    try {
        const categories = await EventCategory.findAll();
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({
            error: 'Error al obtener las categorías de eventos',
            details: error.message
        });
    }
})
// POST: Crear nueva categoría de evento
.post(async (req, res) => {
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

router.route('/calendar')
// GET: Obtener todos los eventos del calendario
.get(async (req, res) => {
    try {
        const calendarEvents = await CalendarEvent.findAll();
        res.status(200).json(calendarEvents);
    } catch (error) {
        res.status(500).json({
        error: 'Error al obtener los eventos del calendario',
        details: error.message
        });
    }
})
// POST: Crear un nuevo evento en el calendario
.post(async (req, res) => {
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