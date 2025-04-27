import filter from '../config/profanity.js';

/** Middleware configurable para revisar profanidad en campos específicos
 * @param {string|string[]} fields - Campo o campos a revisar del req.body
 * @returns {Function} Middleware de Express
 */
const isProfane = (fields) => {
    return (req, res, next) => {
        // Convertir a array si es string
        const fieldsToCheck = Array.isArray(fields) ? fields : [fields];
        const profaneFields = [];

        // Revisar cada campo especificado
        for (const field of fieldsToCheck) {
            if (req.body && req.body[field]) {
                const content = req.body[field];
                
                // Manejar tanto strings como arrays
                if (typeof content == 'string') {
                    if (filter.check(content)) {
                        profaneFields.push({
                            field,
                            original: content,
                            censored: filter.clean(content)
                        });
                    }
                } else if (Array.isArray(content)) {
                    // Revisar cada elemento del array
                    for (let i = 0; i < content.length; i++) {
                        if (typeof content[i] == 'string' && filter.check(content[i])) {
                            profaneFields.push({
                                field: `${field}[${i}]`,
                                original: content[i],
                                censored: filter.clean(content[i])
                            });
                        }
                    }
                }
            };
        }

        // Si se encontraron palabras prohibidas
        if (profaneFields.length > 0) {
            return res.status(400).json({
                error: 'El contenido contiene lenguaje inapropiado',
                profaneFields
            });
        }

        // Si no hay problema, continuar
        next();
    };
};

export { 
    isProfane 
};