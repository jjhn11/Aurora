import axios from 'axios';

export default {
  namespaced: true,
  
  state: {
    // Usuario autenticado y su información de perfil
    profile: null,
    // Datos completos del usuario (incluyendo datos del modelo User)
    userData: null,
    // Estado de autenticación (redundante con el store principal, pero útil aquí)
    isAuthenticated: false,
    // Libros favoritos del usuario
    favoriteBooks: [],
    // Actividades organizadas por el usuario
    organizedActivities: [],
    // Actividades a las que asistirá el usuario
    attendingActivities: [],
    // Estados de carga para diferentes operaciones
    loading: {
      profile: false,
      userData: false,
      favorites: false,
      activities: false,
      update: false
    },
    // Estados de error para diferentes operaciones
    error: {
      profile: null,
      userData: null,
      favorites: null,
      activities: null,
      update: null
    }
  },

  getters: {
    // Obtener perfil de usuario de Google
    getProfile: state => state.profile,
    
    // Obtener datos completos del usuario
    getUserData: state => state.userData,
    
    // Obtener nombre completo del usuario
    getFullName: state => {
      if (state.userData) {
        return `${state.userData.Name_user || ''} ${state.userData.Last_name || ''}`.trim();
      }
      return state.profile ? state.profile.name : '';
    },
    
    // Obtener correo del usuario
    getEmail: state => {
      if (state.userData) {
        return state.userData.Email;
      }
      return state.profile ? state.profile.email : '';
    },
    
    // Obtener ID del usuario
    getUserId: state => {
      if (state.userData) {
        return state.userData.Id_user;
      }
      return null;
    },
    
    // Obtener número de control
    getControlNumber: state => state.userData?.Control_num || null,
    
    // Obtener género del usuario
    getGenderId: state => state.userData?.Id_gender || null,
    
    // Obtener ocupación del usuario
    getOccupationId: state => state.userData?.Id_occupation || null,
    
    // Obtener estado del usuario
    getUserStatusId: state => state.userData?.Id_user_status || null,
    
    // Obtener estado de autenticación
    isAuthenticated: state => state.isAuthenticated,
    
    // Obtener libros favoritos
    getFavoriteBooks: state => state.favoriteBooks,
    
    // Verificar si un libro está en favoritos
    isBookFavorite: state => bookId => {
      return state.favoriteBooks.some(book => book.id === bookId || book.ISBN === bookId);
    },
    
    // Obtener actividades organizadas por el usuario
    getOrganizedActivities: state => state.organizedActivities,
    
    // Obtener actividades a las que asistirá el usuario
    getAttendingActivities: state => state.attendingActivities,
    
    // Estados de carga
    isLoading: state => type => state.loading[type],
    
    // Estados de error
    getError: state => type => state.error[type]
  },
  
  mutations: {
    SET_PROFILE(state, profile) {
      state.profile = profile;
      state.isAuthenticated = !!profile;
    },
    
    SET_USER_DATA(state, userData) {
      state.userData = userData;
    },
    
    SET_FAVORITE_BOOKS(state, books) {
      state.favoriteBooks = books;
    },
    
    ADD_FAVORITE_BOOK(state, book) {
      state.favoriteBooks.push(book);
    },
    
    REMOVE_FAVORITE_BOOK(state, id) {
      state.favoriteBooks = state.favoriteBooks.filter(book => 
        book.id !== id && book.ISBN !== id
      );
    },
    
    SET_ORGANIZED_ACTIVITIES(state, activities) {
      state.organizedActivities = activities;
    },
    
    SET_ATTENDING_ACTIVITIES(state, activities) {
      state.attendingActivities = activities;
    },
    
    SET_LOADING(state, { type, value }) {
      if (state.loading && type in state.loading) {
        state.loading[type] = value;
      }
    },
    
    SET_ERROR(state, { type, value }) {
      if (state.error && type in state.error) {
        state.error[type] = value;
      }
    }
  },
  
  actions: {
    // Sincronizar estado de autenticación desde el store principal
    syncAuthState({ commit, dispatch }, { isAuthenticated, user }) {
      commit('SET_PROFILE', user);
      
      if (isAuthenticated && user && user.email) {
        // Si hay usuario autenticado, obtener sus datos completos
        dispatch('fetchUserData', user.email);
      } else {
        commit('SET_USER_DATA', null);
      }
    },
    
    // Obtener datos del usuario desde la base de datos usando su correo
    async fetchUserData({ commit, dispatch }, email) {
      if (!email) {
        console.error('No se proporcionó un correo electrónico');
        return;
      }
      
      commit('SET_LOADING', { type: 'userData', value: true });
      commit('SET_ERROR', { type: 'userData', value: null });
      
      try {
        const response = await axios.get(`/user/byEmail/${email}`);
        console.log("accediendo a " + axios.baseURL + "/user/byEmail/" + email)
        commit('SET_USER_DATA', response.data);
        
        // Cargar también datos relacionados
        dispatch('fetchFavoriteBooks');
        dispatch('fetchUserActivities');
        
        commit('SET_LOADING', { type: 'userData', value: false });
        return response.data;
      } catch (error) {
        const errorMsg = error.response?.data?.error || 'Error al obtener datos del usuario';
        commit('SET_ERROR', { type: 'userData', value: errorMsg });
        commit('SET_LOADING', { type: 'userData', value: false });
        
        // Si el usuario no existe en la BD, pero está autenticado, crear su cuenta
        if (error.response?.status === 404) {
          return dispatch('createUserAccount');
        }
        
        throw error;
      }
    },
    
    // Crear cuenta de usuario para un usuario autenticado pero que no existe en la BD
    async createUserAccount({ commit, state }) {
      if (!state.profile) {
        throw new Error('No hay usuario autenticado');
      }
      
      commit('SET_LOADING', { type: 'userData', value: true });
      
      try {
        // Crear objeto de usuario con datos mínimos
        const userCreate = {
          Email: state.profile.email,
          Name_user: state.profile.name.split(' ').slice(0, -1).join(' '), // Nombre sin apellido
          Last_name: state.profile.name.split(' ').slice(-1).join(' '), // Último apellido
          Id_occupation: 1, // Valor por defecto, ajustar según tu modelo
          Id_gender: 1, // Valor por defecto, ajustar según tu modelo
          Id_user_status: 1, // Activo por defecto
          // Generar ID basado en parte del correo + timestamp para asegurar unicidad
          Id_user: `U${state.profile.email.split('@')[0].substring(0, 6)}${Date.now().toString().substring(9)}`
        };
        
        const response = await axios.post('/user/create', userCreate);
        commit('SET_USER_DATA', response.data);
        commit('SET_LOADING', { type: 'userData', value: false });
        return response.data;
      } catch (error) {
        const errorMsg = error.response?.data?.error || 'Error al crear cuenta de usuario';
        commit('SET_ERROR', { type: 'userData', value: errorMsg });
        commit('SET_LOADING', { type: 'userData', value: false });
        throw error;
      }
    },
    
    // Actualizar datos del perfil de usuario
    async updateUserProfile({ commit, state }, userData) {
      if (!state.userData?.Id_user) {
        throw new Error('No hay usuario para actualizar');
      }
      
      commit('SET_LOADING', { type: 'update', value: true });
      commit('SET_ERROR', { type: 'update', value: null });
      
      try {
        const response = await axios.put(`/user/${state.userData.Id_user}`, userData);
        commit('SET_USER_DATA', response.data);
        commit('SET_LOADING', { type: 'update', value: false });
        return response.data;
      } catch (error) {
        const errorMsg = error.response?.data?.error || 'Error al actualizar perfil';
        commit('SET_ERROR', { type: 'update', value: errorMsg });
        commit('SET_LOADING', { type: 'update', value: false });
        throw error;
      }
    },
    
    // Obtener libros favoritos del usuario
    async fetchFavoriteBooks({ commit, state }) {
      if (!state.userData?.Id_user) {
        return [];
      }
      
      commit('SET_LOADING', { type: 'favorites', value: true });
      commit('SET_ERROR', { type: 'favorites', value: null });
      
      try {
        const response = await axios.get(`/user/${state.userData.Id_user}/favorites`);
        commit('SET_FAVORITE_BOOKS', response.data);
        commit('SET_LOADING', { type: 'favorites', value: false });
        return response.data;
      } catch (error) {
        const errorMsg = error.response?.data?.error || 'Error al obtener favoritos';
        commit('SET_ERROR', { type: 'favorites', value: errorMsg });
        commit('SET_LOADING', { type: 'favorites', value: false });
        throw error;
      }
    },
    
    // Añadir un libro a favoritos
    async addFavoriteBook({ commit, state }, bookId) {
      if (!state.userData?.Id_user) {
        throw new Error('Usuario no autenticado');
      }
      
      commit('SET_LOADING', { type: 'favorites', value: true });
      commit('SET_ERROR', { type: 'favorites', value: null });
      
      try {
        const response = await axios.post(`/user/${state.userData.Id_user}/favorites`, {
          bookId
        });
        
        commit('ADD_FAVORITE_BOOK', response.data);
        commit('SET_LOADING', { type: 'favorites', value: false });
        return response.data;
      } catch (error) {
        const errorMsg = error.response?.data?.error || 'Error al añadir favorito';
        commit('SET_ERROR', { type: 'favorites', value: errorMsg });
        commit('SET_LOADING', { type: 'favorites', value: false });
        throw error;
      }
    },
    
    // Eliminar un libro de favoritos
    async removeFavoriteBook({ commit, state }, bookId) {
      if (!state.userData?.Id_user) {
        throw new Error('Usuario no autenticado');
      }
      
      commit('SET_LOADING', { type: 'favorites', value: true });
      commit('SET_ERROR', { type: 'favorites', value: null });
      
      try {
        await axios.delete(`/user/${state.userData.Id_user}/favorites/${bookId}`);
        
        commit('REMOVE_FAVORITE_BOOK', bookId);
        commit('SET_LOADING', { type: 'favorites', value: false });
        return { success: true };
      } catch (error) {
        const errorMsg = error.response?.data?.error || 'Error al eliminar favorito';
        commit('SET_ERROR', { type: 'favorites', value: errorMsg });
        commit('SET_LOADING', { type: 'favorites', value: false });
        throw error;
      }
    },
    
    // Obtener actividades del usuario (organizadas y asistencia)
    async fetchUserActivities({ commit, state, dispatch }) {
      if (!state.userData?.Id_user) {
        return { organized: [], attending: [] };
      }
      
      commit('SET_LOADING', { type: 'activities', value: true });
      commit('SET_ERROR', { type: 'activities', value: null });
      
      try {
        await Promise.all([
          dispatch('fetchOrganizedActivities'),
          dispatch('fetchAttendingActivities')
        ]);
        
        commit('SET_LOADING', { type: 'activities', value: false });
        return {
          organized: state.organizedActivities,
          attending: state.attendingActivities
        };
      } catch (error) {
        const errorMsg = error.message || 'Error al obtener actividades';
        commit('SET_ERROR', { type: 'activities', value: errorMsg });
        commit('SET_LOADING', { type: 'activities', value: false });
        throw error;
      }
    },
    
    // Obtener actividades organizadas por el usuario
    async fetchOrganizedActivities({ commit, state }) {
      if (!state.userData?.Id_user) {
        return [];
      }
      
      try {
        const response = await axios.get(`/community/activity?organizerId=${state.userData.Id_user}`);
        commit('SET_ORGANIZED_ACTIVITIES', response.data);
        return response.data;
      } catch (error) {
        console.error('Error al obtener actividades organizadas:', error);
        commit('SET_ORGANIZED_ACTIVITIES', []);
        throw error;
      }
    },
    
    // Obtener actividades a las que asistirá el usuario
    async fetchAttendingActivities({ commit, state }) {
      if (!state.userData?.Id_user) {
        return [];
      }
      
      try {
        // Primero obtenemos los registros de asistencia
        const attendanceResponse = await axios.get(`/community/activity/attendance?userId=${state.userData.Id_user}`);
        
        // Luego obtenemos los detalles de cada actividad
        const activitiesPromises = attendanceResponse.data.map(async (attendance) => {
          if (attendance.Confirmation === 1) { // Solo si está confirmada
            try {
              const activityResponse = await axios.get(`/community/activity/${attendance.Id_activity}`);
              return activityResponse.data;
            } catch (e) {
              console.error(`Error al obtener actividad ${attendance.Id_activity}:`, e);
              return null;
            }
          }
          return null;
        });
        
        // Esperar todas las promesas y filtrar nulos
        const activities = (await Promise.all(activitiesPromises)).filter(a => a !== null);
        commit('SET_ATTENDING_ACTIVITIES', activities);
        return activities;
      } catch (error) {
        console.error('Error al obtener actividades de asistencia:', error);
        commit('SET_ATTENDING_ACTIVITIES', []);
        throw error;
      }
    },

  }
};