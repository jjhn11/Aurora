import express from 'express';
import { Op } from 'sequelize';
import User from '../models/User/Users.js';
import checkAuth from '../middlewares/checkAuth.js';
import { isProfane } from '../middlewares/checkProfane.js';
import CommunityActivity from '../models/Community/CommunityActivities.js';
import CommunityActivityAttendance from '../models/Community/CommunityActivityAttendance.js';

const router = express.Router();

// Middleware para verificar que el usuario existe por ID
const userExists = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const user = await User.findByPk(userId);
    
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    
    req.userRecord = user;
    next();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// === RUTAS DE PERFIL DE USUARIO ===

// Obtener usuario por ID
router.get('/:id', userExists, async (req, res) => {
  try {
    // Ya tenemos el usuario del middleware userExists
    // Podríamos cargarlo con relaciones adicionales si es necesario
    res.json(req.userRecord);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener usuario por correo electrónico
router.get('/byEmail/:email', async (req, res) => {
  try {
    const email = req.params.email;
    const user = await User.findOne({ where: { Email: email } });
    
    if (!user) {
    
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Crear un nuevo usuario
router.post('/create', async (req, res) => {
  try {
    const {
      Id_user,
      Name_user,
      Last_name,
      Email,
      Control_num,
      Id_occupation,
      Id_gender,
      Id_user_status
    } = req.body;
    
    // Validar campos requeridos
    if (!Id_user || !Email || !Id_occupation || !Id_gender || !Id_user_status) {
      return res.status(400).json({ 
        error: 'Faltan campos requeridos (Id_user, Email, Id_occupation, Id_gender, Id_user_status)' 
      });
    }
    
    // Verificar si el correo ya existe
    const existingUser = await User.findOne({ where: { Email } });
    if (existingUser) {
      return res.status(400).json({ error: 'El correo electrónico ya está registrado' });
    }
    
    const newUser = await User.create({
      Id_user,
      Name_user,
      Last_name,
      Email,
      Control_num,
      Id_occupation,
      Id_gender,
      Id_user_status
    });
    
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Actualizar usuario
router.put('/:id', userExists, isProfane(['Name_user', 'Last_name']), async (req, res) => {
  try {
    const userId = req.params.id;
    const {
      Name_user,
      Last_name,
      Control_num,
      Id_occupation,
      Id_gender,
      Id_user_status
    } = req.body;
    
    // No permitimos cambiar el correo o ID
    const updatedFields = {};
    
    if (Name_user !== undefined) updatedFields.Name_user = Name_user;
    if (Last_name !== undefined) updatedFields.Last_name = Last_name;
    if (Control_num !== undefined) updatedFields.Control_num = Control_num;
    if (Id_occupation !== undefined) updatedFields.Id_occupation = Id_occupation;
    if (Id_gender !== undefined) updatedFields.Id_gender = Id_gender;
    if (Id_user_status !== undefined) updatedFields.Id_user_status = Id_user_status;
    
    // Actualizar usuario
    await req.userRecord.update(updatedFields);
    
    // Obtener el usuario actualizado
    const updatedUser = await User.findByPk(userId);
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Eliminar usuario (soft delete, cambiando estado)
router.delete('/:id', userExists, async (req, res) => {
  try {
    // Cambiar estado a inactivo (asumiendo que 2 es el ID para usuario inactivo)
    await req.userRecord.update({ Id_user_status: 2 });
    res.json({ message: 'Usuario desactivado correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// === MANEJO DE FAVORITOS ===

// Obtener libros favoritos del usuario
router.get('/:id/favorites', userExists, async (req, res) => {
  try {
    const userId = req.params.id;
    
    // Aquí se debe implementar la consulta a la tabla de favoritos
    // Esta es una representación, deberás ajustarla a tu modelo de BD
    
    // Ejemplo:
    // const favorites = await FavoriteBook.findAll({ where: { userId } });
    
    // Por ahora devolvemos un array vacío o datos de prueba
    res.json([]);
    
    // Una vez tengas el modelo de FavoriteBook, usa este código:
    /*
    const favorites = await FavoriteBook.findAll({
      where: { userId },
      include: [Book] // Para incluir los detalles del libro
    });
    res.json(favorites);
    */
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Añadir un libro a favoritos
router.post('/:id/favorites', userExists, async (req, res) => {
  try {
    const userId = req.params.id;
    const { bookId } = req.body;
    
    if (!bookId) {
      return res.status(400).json({ error: 'Se requiere el ID del libro' });
    }
    
    // Verificar si ya existe en favoritos
    // Ejemplo:
    // const existingFavorite = await FavoriteBook.findOne({ where: { userId, bookId } });
    // if (existingFavorite) {
    //   return res.status(400).json({ error: 'El libro ya está en favoritos' });
    // }
    
    // Crear nuevo favorito
    // const newFavorite = await FavoriteBook.create({ userId, bookId });
    
    // Obtener detalles del libro para devolver
    // const book = await Book.findByPk(bookId);
    
    // Por ahora devolvemos datos simulados
    res.status(201).json({
      id: bookId,
      ISBN: bookId,
      title: "Libro añadido a favoritos",
      coverImage: "https://via.placeholder.com/150",
      description: "Descripción del libro",
      type: "Libro Físico",
      addedDate: new Date().toLocaleDateString('es-MX'),
      comments: "",
      author: "Autor"
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Eliminar un libro de favoritos
router.delete('/:id/favorites/:bookId', userExists, async (req, res) => {
  try {
    const userId = req.params.id;
    const { bookId } = req.params;
    
    // Verificar si existe en favoritos
    // Ejemplo:
    // const favorite = await FavoriteBook.findOne({ where: { userId, bookId } });
    // if (!favorite) {
    //   return res.status(404).json({ error: 'El libro no está en favoritos' });
    // }
    
    // Eliminar de favoritos
    // await favorite.destroy();
    
    res.json({ message: 'Libro eliminado de favoritos correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// === ACTIVIDADES DE USUARIO ===

// Obtener actividades organizadas por el usuario
router.get('/:id/organized-activities', userExists, async (req, res) => {
  try {
    const userId = req.params.id;
    
    // Aquí asumimos que tienes un modelo CommunityActivity con un campo Organizer_id
    // que hace referencia a Users.Id_user
    const activities = await CommunityActivity.findAll({
      where: { Organizer_id: userId }
    });
    
    res.json(activities);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener actividades a las que asistirá el usuario
router.get('/:id/attending-activities', userExists, async (req, res) => {
  try {
    const userId = req.params.id;
    
    // Aquí asumimos que tienes modelos CommunityActivity y CommunityActivityAttendance
    const attendances = await CommunityActivityAttendance.findAll({
      where: { 
        Id_user: userId,
        Confirmation: 1 // Solo las confirmadas
      },
      include: [CommunityActivity]
    });
    
    const activities = attendances.map(attendance => attendance.CommunityActivity);
    res.json(activities);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;