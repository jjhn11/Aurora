import express from 'express';
import { Op } from 'sequelize';
import upload from '../middlewares/upload.js';
import CalendarEvent from '../models/Events/CalendarEvents.js';
import EventCategory from '../models/Events/EventCategories.js';
import Event from '../models/Events/Events.js';

const router = express.Router(); 

const getUploadPath = () => {
  return '/uploads/events/';
};

router.route('/')
// GET: Obtener todos los eventos
.get(async (req, res) => {
    try {
        const { categoryId, iscoming } = req.query;
        const today = new Date();

        // Encontrar el calendario actual
        const currentCalendar = await CalendarEvent.findOne({
            where: {
                Start_date: { [Op.lte]: today },
                End_date: { [Op.gte]: today }
            }
        });

        if (!currentCalendar) {
            // Log para debugging
            const allCalendars = await CalendarEvent.findAll();
            // console.log('Calendarios disponibles:', allCalendars);
            
            return res.status(404).json({
                error: 'No hay un calendario activo',
                details: 'No se encontró un calendario vigente'
            });
        }

        // Construir los filtros
        let where = {
            Id_calendar: currentCalendar.Id_calendar
        };

        if (categoryId) {
            where.Id_category = categoryId;
        }

        if (iscoming !== undefined) {
            where.Is_coming = parseInt(iscoming);
        }
        
        // Obtener eventos con sus relaciones
        const events = await Event.findAll({
            where,
            include: [
                {
                    model: EventCategory,
                    as: 'category',
                    attributes: ['Category_event_name']
                }
            ],
            order: [['Event_date', 'ASC']]
        });
        
        res.status(200).json(events);

    } catch (error) {
        console.error('Error al obtener eventos:', error);
        res.status(500).json({
            error: 'Error al obtener los eventos',
            details: error.message
        });
    }
})

// .get(async (req, res) => {
//     try {
//     const events = await Event.findAll();
//     res.status(200).json(events);
//     } catch (error) {
//     res.status(500).json({
//         error: 'Error al obtener los eventos',
//         details: error.message,
//     });
//     }
// })

//CREAR EVENTO
.post(upload.single('image'), async (req, res) => {
    try {
      const { 
        Title, 
        Id_category, 
        Event_date, 
        Is_coming, 
        Description 
      } = req.body;

      console.log('Received event data:', req.body); // Debug log

      // Validate required fields
      if (!Title || !Id_category || !Event_date) {
        return res.status(400).json({ 
          error: 'Campos obligatorios faltantes',
          details: 'Title, Id_category y Event_date son obligatorios',
          received: {
            Title,
            Id_category,
            Event_date
          }
        });
      }

      // Parse Is_coming to integer
      const isComingValue = parseInt(Is_coming) || 0;

      const Image_url = req.file ? 
        (getUploadPath() + req.file?.filename).replaceAll("/app", "")
        : null;

      // Validate Is_coming requirements
      if (isComingValue === 1 && !Description) {
        return res.status(400).json({
          error: 'Campos faltantes para evento próximo',
          details: 'Description es obligatorio para eventos próximos'
        });
      }

      // Obtener el calendario actual (asumiendo que existe)
      const currentCalendar = await CalendarEvent.findOne({
        where: {
            Start_date: { [Op.lte]: Event_date },
            End_date: { [Op.gte]: Event_date }
        }
      });
  
      if (!currentCalendar) {
        return res.status(404).json({
          error: 'No hay un calendario activo',
          details: 'Debe existir un calendario activo para crear eventos'
        });
      }
  
      // Crear el evento
      const newEvent = await Event.create({
        Title,
        Id_category,
        Event_date,
        Is_coming: isComingValue,
        Description: isComingValue === 1 ? Description : null,
        Image_url: isComingValue === 1 ? Image_url : null,
        Id_calendar: currentCalendar.Id_calendar
      });

      res.json({ message: 'Evento creado exitosamente', event: newEvent });
      
  
    } catch (error) {
      console.error('Error al crear el evento:', error);
      res.status(500).json({
        error: 'Error al crear el evento',
        details: error.message
      });
    }
  });
  
  router.route('/:id')
.put(upload.single('image'), async (req, res) => {
    try {
        const { id } = req.params;
        const { 
            Title, 
            Id_category, 
            Event_date, 
            Is_coming, 
            Description
        } = req.body;

        const Image_url = req.file ? 
            (getUploadPath() + req.file?.filename).replaceAll("/app", "")
            : undefined; // Use undefined to not override existing image if no new one is uploaded

        // Verificar si el evento existe
        const event = await Event.findByPk(id);
        if (!event) {
            return res.status(404).json({
                error: 'Evento no encontrado',
                details: `No existe un evento con el ID ${id}`
            });
        }

        // Si se proporciona una nueva fecha, verificar el calendario
        if (Event_date) {
            const calendar = await CalendarEvent.findOne({
                where: {
                    Start_date: { [Op.lte]: Event_date },
                    End_date: { [Op.gte]: Event_date }
                }
            });

            if (!calendar) {
                return res.status(400).json({
                    error: 'Fecha inválida',
                    details: 'No existe un calendario activo para la fecha proporcionada'
                });
            }
        }

        // Actualizar el evento
        await event.update({
            Title: Title || event.Title,
            Id_category: Id_category || event.Id_category,
            Event_date: Event_date || event.Event_date,
            Is_coming: Is_coming !== undefined ? Is_coming : event.Is_coming,
            Description: Description !== undefined ? Description : event.Description,
            Image_url: Image_url !== undefined ? Image_url : event.Image_url
        });

        // Obtener el evento actualizado con sus relaciones
        const updatedEvent = await Event.findByPk(id, {
            include: [{
                model: EventCategory,
                as: 'category',
                attributes: ['Category_event_name']
            }]
        });

        res.status(200).json(updatedEvent);
    } catch (error) {
        console.error('Error al actualizar el evento:', error);
        res.status(500).json({
            error: 'Error al actualizar el evento',
            details: error.message
        });
    }
})
.delete(async (req, res) => {
    try {
        const { id } = req.params;

        // Verificar si el evento existe
        const event = await Event.findByPk(id);
        if (!event) {
            return res.status(404).json({
                error: 'Evento no encontrado',
                details: `No existe un evento con el ID ${id}`
            });
        }

        // Eliminar el evento
        await event.destroy();

        res.status(200).json({
            message: 'Evento eliminado exitosamente',
            id: id
        });
    } catch (error) {
        console.error('Error al eliminar el evento:', error);
        res.status(500).json({
            error: 'Error al eliminar el evento',
            details: error.message
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
        Category_event_name: Event_name
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


router.route('/calendar/current') 
.get (async (req, res) => {
    try {
      const now = new Date(); 
  
      const currentCalendar = await CalendarEvent.findOne({
        where: {
          Start_date: { [Op.lte]: now },
          End_date: { [Op.gte]: now }
        }
      });
  
      if (!currentCalendar) {
        return res.status(404).json({ error: 'No hay calendario activo para este semestre.' });
      }
  
      res.json(currentCalendar);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener el calendario actual', details: error.message });
    }
  });
  
  // 🔹 POST: Crear el calendario del siguiente semestre si no existe
router.route('/calendar/next')
.post(async (req, res) => {
  try {
    const now = new Date();

    // Verificar si hay un calendario activo
    const activeCalendar = await CalendarEvent.findOne({
      where: {
        Start_date: { [Op.lte]: now },
        End_date: { [Op.gte]: now }
      }
    });

    if (!activeCalendar) {
      // Crear el calendario correspondiente a la fecha actual
      const year = now.getFullYear();
      const month = now.getMonth() + 1;

      let currentStart, currentEnd;

      if (month >= 1 && month <= 7) {
        // Si estamos en el 1er semestre
        currentStart = new Date(`${year}-01-01`);
        currentEnd = new Date(`${year}-07-31`);
      } else {
        // Si estamos en el 2do semestre
        currentStart = new Date(`${year}-08-01`);
        currentEnd = new Date(`${year}-12-31`);
      }

      const newCurrentCalendar = await CalendarEvent.create({
        Start_date: currentStart,
        End_date: currentEnd
      });

      return res.status(201).json({
        message: 'No había un calendario activo. Se creó el calendario correspondiente a la fecha actual.',
        calendar: newCurrentCalendar
      });

      
    }

    // Determinar semestre actual para crear el siguiente
    const year = now.getFullYear();
    const month = now.getMonth() + 1;

    let nextStart, nextEnd;

    if (month >= 1 && month <= 7) {
      // Si estamos en el 1er semestre, crear el 2do
      nextStart = new Date(`${year}-08-01`);
      nextEnd = new Date(`${year}-12-31`);
    } else {
      // Si estamos en el 2do semestre, crear el 1ro del siguiente año
      nextStart = new Date(`${year + 1}-01-01`);
      nextEnd = new Date(`${year + 1}-07-31`);
    }

    // Verificar si ya existe ese calendario
    const existing = await CalendarEvent.findOne({
      where: {
        Start_date: nextStart,
        End_date: nextEnd
      }
    });

    if (existing) {
      return res.status(400).json({ error: 'El calendario del próximo semestre ya existe.' });
    }

    // Crear calendario del siguiente semestre
    const newCalendar = await CalendarEvent.create({
      Start_date: nextStart,
      End_date: nextEnd
    });

    res.status(201).json(newCalendar);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear calendario del próximo semestre', details: error.message });
  }
});

export default router;