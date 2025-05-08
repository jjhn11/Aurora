import filter from '../config/profanity.js';

export const isProfane = (fields) => (req, res, next) => {
    const content = req.body;
    const fieldsToCheck = fields;
    
    // Validar que se proporcionaron los campos necesarios
    if (!fieldsToCheck || !Array.isArray(fieldsToCheck) || fieldsToCheck.length === 0) {
        return res.status(400).json({ 
            error: 'Debe proporcionar un arreglo de campos a verificar (fieldsToCheck)' 
        });
    }
    
    if (!content || typeof content !== 'object') {
        return res.status(400).json({ 
            error: 'Debe proporcionar un objeto con el contenido a verificar (content)' 
        });
    }

    const profaneFields = [];

    // Revisar cada campo especificado
    for (const field of fieldsToCheck) {
        if (content && content[field]) {
            const fieldContent = content[field];
            
            // Manejar tanto strings como arrays
            if (typeof fieldContent === 'string') {
                if (filter.check(fieldContent)) {
                    profaneFields.push({
                        field,
                        original: fieldContent,
                        censored: filter.clean(fieldContent)
                    });
                }
            } else if (Array.isArray(fieldContent)) {
                // Revisar cada elemento del array
                for (let i = 0; i < fieldContent.length; i++) {
                    if (typeof fieldContent[i] === 'string' && filter.check(fieldContent[i])) {
                        profaneFields.push({
                            field: `${field}[${i}]`,
                            original: fieldContent[i],
                            censored: filter.clean(fieldContent[i])
                        });
                    }
                }
            }
        }
    }

    // Si se encontraron palabras prohibidas
    if (profaneFields.length > 0) {
        return res.status(200).json({
            message: 'El contenido contiene lenguaje inapropiado',
            SFW: false,
            profaneFields
        });
    }

    // Si no hay problema, continuar
    next();
};