import { Op } from 'sequelize';
import Event from '../models/Events/Events.js';

export const updateEventStatus = async (req, res, next) => {
    try {
        const now = new Date();
        
        // Actualizar todos los eventos pasados que tengan Is_coming = 1
        await Event.update(
            { Is_coming: 0 }, 
            {
                where: {
                    Event_date: { [Op.lt]: now },
                    Is_coming: 1
                }
            }
        );
        
        next();
    } catch (error) {
        console.error('Error actualizando estado de eventos:', error);
        next();
    }
};



