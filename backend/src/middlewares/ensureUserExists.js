import User from '../models/User/Users.js';

/**
 * Middleware que verifica si el usuario existe en la base de datos
 * Si no existe, lo crea automáticamente con la información de Google
 */
const ensureUserExists = async (req, res, next) => {
  try {
    // Verificar si tenemos un usuario autenticado por Google
    if (!req.isAuthenticated() || !req.user || !req.user.emails || !req.user.emails.length) {
      return next();
    }

    const email = req.user.emails[0].value;
    
    // Verificar si el usuario ya existe en nuestra base de datos
    const existingUser = await User.findOne({ where: { Email: email } });
    
    // Si existe, no hacemos nada más
    if (existingUser) {
      // Podríamos actualizar datos si es necesario
      return next();
    }
    
    // Dividir el nombre completo en nombre y apellido
    const fullName = req.user.displayName || '';
    const nameParts = fullName.split(' ');
    const lastName = nameParts.length > 1 ? nameParts.pop() : '';
    const firstName = nameParts.join(' ');
    
    // Generar un ID único basado en el correo, asegurando exactamente 8 caracteres
    const prefix = 'U';
    const emailPart = email.split('@')[0].substring(0, 3); // Primeros 3 caracteres del correo
    const timestamp = Date.now().toString().slice(-4); // Últimos 4 dígitos del timestamp
    
    // Combinamos para formar un ID de 8 caracteres: U + 3 del correo + 4 del timestamp
    const userId = `${prefix}${emailPart}${timestamp}`;
    
    // Crear el usuario en nuestra base de datos
    const newUser = await User.create({
      Id_user: userId,
      Name_user: firstName,
      Last_name: lastName,
      Email: email,
      Id_occupation: 1, // Valor predeterminado
      Id_gender: 1,     // Valor predeterminado
      Id_user_status: 1 // Activo
    });
    
    console.log(`Usuario creado automáticamente: ${newUser.Id_user} - ${newUser.Email}`);
    
    // Continuar con el flujo
    next();
  } catch (error) {
    console.error('Error en ensureUserExists middleware:', error);
    // No interrumpimos el flujo de autenticación por un error en este middleware
    next();
  }
};

export default ensureUserExists;