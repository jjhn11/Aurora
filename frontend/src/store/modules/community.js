import axios from 'axios';

export default {
  namespaced: true,
  
  state: {
    activities: [],
    categories: [],
    activityTypes: [],
    locations: [],
    attendances: [],
    currentActivity: null,
    loading: {
      activities: false,
      categories: false,
      activityTypes: false,
      locations: false,
      attendance: false,
      currentActivity: false
    },
    error: {
      activities: null,
      categories: null,
      activityTypes: null,
      locations: null,
      attendance: null,
      currentActivity: null
    }
  },
  
  getters: {
    // Obtener todas las actividades
    getAllActivities: state => state.activities,
    
    // Obtener actividades por categoría
    getActivitiesByCategory: state => categoryId => {
      return state.activities.filter(activity => activity.categoryId === categoryId);
    },
    
    // Obtener una actividad por su ID
    getActivityById: state => id => {
      return state.activities.find(activity => activity.Id_activity === id);
    },
    
    // Obtener todas las categorías
    getAllCategories: state => state.categories,
    
    // Obtener todos los tipos de actividad
    getAllActivityTypes: state => state.activityTypes,
    
    // Obtener tipos de actividad por categoría
    getActivityTypesByCategory: state => categoryId => {
      return state.activityTypes.filter(type => type.Id_category === categoryId);
    },
    
    // Obtener todas las ubicaciones
    getAllLocations: state => state.locations,
    
    // Obtener ubicaciones por categoría
    getLocationsByCategory: state => categoryId => {
      return state.locations.filter(location => location.Id_category === categoryId);
    },
    
    // Obtener asistencia de una actividad
    getAttendanceByActivity: state => activityId => {
      return state.attendances.filter(attendance => attendance.Id_activity === activityId);
    },
    
    // Verificar si un usuario está registrado para una actividad
    isUserAttending: state => (userId, activityId) => {
      return state.attendances.some(
        attendance => attendance.Id_user === userId && attendance.Id_activity === activityId
      );
    },
    
    // Estados de carga
    isLoading: state => type => state.loading[type],
    
    // Estados de error
    getError: state => type => state.error[type]
  },
  
  mutations: {
    // Actividades
    SET_ACTIVITIES(state, activities) {
      state.activities = activities;
    },
    
    ADD_ACTIVITY(state, activity) {
      state.activities.unshift(activity); // Agregar al inicio para mostrar las más recientes primero
    },
    
    SET_CURRENT_ACTIVITY(state, activity) {
      state.currentActivity = activity;
    },
    
    // Categorías
    SET_CATEGORIES(state, categories) {
      state.categories = categories;
    },
    
    // Tipos de actividad
    SET_ACTIVITY_TYPES(state, types) {
      state.activityTypes = types;
    },
    
    // Ubicaciones
    SET_LOCATIONS(state, locations) {
      state.locations = locations;
    },
    
    // Asistencia
    SET_ATTENDANCES(state, attendances) {
      state.attendances = attendances;
    },
    
    ADD_ATTENDANCE(state, attendance) {
      state.attendances.push(attendance);
    },
    
    UPDATE_ATTENDANCE(state, { userId, activityId, confirmation }) {
      const index = state.attendances.findIndex(
        a => a.Id_user === userId && a.Id_activity === activityId
      );
      if (index !== -1) {
        state.attendances[index].Confirmation = confirmation;
      }
    },
    
    // Loading states
    SET_LOADING(state, { type, value }) {
      state.loading[type] = value;
    },
    
    // Error states
    SET_ERROR(state, { type, value }) {
      state.error[type] = value;
    }
  },
  
  actions: {
    // ===== ACTIVIDADES =====
    
    // Obtener actividades (con filtro opcional por categoría)
    async fetchActivities({ commit }, categoryId = null) {
      commit('SET_LOADING', { type: 'activities', value: true });
      commit('SET_ERROR', { type: 'activities', value: null });
      
      try {
        let url = '/community/activity';
        if (categoryId) {
          url += `?categoryId=${categoryId}`;
        }
        
        const response = await axios.get(url);
        commit('SET_ACTIVITIES', response.data);
        commit('SET_LOADING', { type: 'activities', value: false });
        return response.data;
      } catch (error) {
        const errorMessage = error.response?.data?.error || 'Error al obtener actividades';
        commit('SET_ERROR', { type: 'activities', value: errorMessage });
        commit('SET_LOADING', { type: 'activities', value: false });
        throw error;
      }
    },
    
    // Crear una nueva actividad
    async createActivity({ commit }, activityData) {
      commit('SET_LOADING', { type: 'activities', value: true });
      commit('SET_ERROR', { type: 'activities', value: null });
      
      try {
        const response = await axios.post('/community/activity', activityData);
        commit('ADD_ACTIVITY', response.data);
        commit('SET_LOADING', { type: 'activities', value: false });
        return response.data;
      } catch (error) {
        const errorMessage = error.response?.data?.error || 'Error al crear la actividad';
        commit('SET_ERROR', { type: 'activities', value: errorMessage });
        commit('SET_LOADING', { type: 'activities', value: false });
        throw error;
      }
    },
    
    // ===== CATEGORÍAS =====
    
    // Obtener todas las categorías
    async fetchCategories({ commit }) {
      commit('SET_LOADING', { type: 'categories', value: true });
      commit('SET_ERROR', { type: 'categories', value: null });
      
      try {
        const response = await axios.get('/community/categories');
        commit('SET_CATEGORIES', response.data);
        commit('SET_LOADING', { type: 'categories', value: false });
        return response.data;
      } catch (error) {
        const errorMessage = error.response?.data?.error || 'Error al obtener categorías';
        commit('SET_ERROR', { type: 'categories', value: errorMessage });
        commit('SET_LOADING', { type: 'categories', value: false });
        throw error;
      }
    },
    
    // ===== TIPOS DE ACTIVIDAD =====
    
    // Obtener tipos de actividad (con filtro opcional por categoría)
    async fetchActivityTypes({ commit }, categoryId = null) {
      commit('SET_LOADING', { type: 'activityTypes', value: true });
      commit('SET_ERROR', { type: 'activityTypes', value: null });
      
      try {
        let url = '/community/activity/types';
        if (categoryId) {
          url += `?categoryId=${categoryId}`;
        }
        
        const response = await axios.get(url);
        commit('SET_ACTIVITY_TYPES', response.data);
        commit('SET_LOADING', { type: 'activityTypes', value: false });
        return response.data;
      } catch (error) {
        const errorMessage = error.response?.data?.error || 'Error al obtener tipos de actividad';
        commit('SET_ERROR', { type: 'activityTypes', value: errorMessage });
        commit('SET_LOADING', { type: 'activityTypes', value: false });
        throw error;
      }
    },
    
    // ===== UBICACIONES =====
    
    // Obtener ubicaciones (con filtro opcional por categoría)
    async fetchLocations({ commit }, categoryId = null) {
      commit('SET_LOADING', { type: 'locations', value: true });
      commit('SET_ERROR', { type: 'locations', value: null });
      
      try {
        let url = '/community/activity/locations';
        if (categoryId) {
          url += `?categoryId=${categoryId}`;
        }
        
        const response = await axios.get(url);
        commit('SET_LOCATIONS', response.data);
        commit('SET_LOADING', { type: 'locations', value: false });
        return response.data;
      } catch (error) {
        const errorMessage = error.response?.data?.error || 'Error al obtener ubicaciones';
        commit('SET_ERROR', { type: 'locations', value: errorMessage });
        commit('SET_LOADING', { type: 'locations', value: false });
        throw error;
      }
    },
    
    // ===== ASISTENCIA =====
    
    // Obtener registros de asistencia (con filtro opcional por actividad)
    async fetchAttendance({ commit, rootState }, activityId = null) {
      commit('SET_LOADING', { type: 'attendance', value: true });
      commit('SET_ERROR', { type: 'attendance', value: null });
      
      try {
        // Construir la URL base
        let url = '/community/activity/attendance';
        
        // Si hay un activityId específico, filtrar por él
        if (activityId) {
          url += `?activityId=${activityId}`;
        } 
        // Si no hay activityId pero hay un usuario autenticado, cargar sus asistencias
        else if (rootState.user?.id) {
          url += `?userId=${rootState.user.id}`;
        }
        
        const response = await axios.get(url);
        commit('SET_ATTENDANCES', response.data);
        commit('SET_LOADING', { type: 'attendance', value: false });
        return response.data;
      } catch (error) {
        const errorMessage = error.response?.data?.error || 'Error al obtener asistencias';
        commit('SET_ERROR', { type: 'attendance', value: errorMessage });
        commit('SET_LOADING', { type: 'attendance', value: false });
        throw error;
      }
    },
    
    // Registrar asistencia a una actividad
    async registerAttendance({ commit }, { userId, activityId, confirmation = 1 }) {
      commit('SET_LOADING', { type: 'attendance', value: true });
      commit('SET_ERROR', { type: 'attendance', value: null });
      
      try {
        const response = await axios.post('/community/activity/attendance', {
          Id_user: userId,
          Id_activity: activityId,
          Confirmation: confirmation
        });
        
        commit('ADD_ATTENDANCE', response.data);
        commit('SET_LOADING', { type: 'attendance', value: false });
        return response.data;
      } catch (error) {
        let errorMessage = 'Error al registrar asistencia';
        
        // Si ya está registrado, manejamos el error específicamente
        if (error.response?.status === 400 && error.response?.data?.error === 'El usuario ya está registrado para esta actividad') {
          errorMessage = 'Ya estás registrado para esta actividad';
        } else {
          errorMessage = error.response?.data?.error || errorMessage;
        }
        
        commit('SET_ERROR', { type: 'attendance', value: errorMessage });
        commit('SET_LOADING', { type: 'attendance', value: false });
        throw error;
      }
    },
    
    // Actualizar estado de asistencia
    async updateAttendance({ commit }, { userId, activityId, confirmation }) {
      commit('SET_LOADING', { type: 'attendance', value: true });
      commit('SET_ERROR', { type: 'attendance', value: null });
      
      try {
        await axios.put('/community/activity/attendance', {
          Id_user: userId,
          Id_activity: activityId,
          Confirmation: confirmation
        });
        
        commit('UPDATE_ATTENDANCE', { userId, activityId, confirmation });
        commit('SET_LOADING', { type: 'attendance', value: false });
        return { success: true };
      } catch (error) {
        const errorMessage = error.response?.data?.error || 'Error al actualizar asistencia';
        commit('SET_ERROR', { type: 'attendance', value: errorMessage });
        commit('SET_LOADING', { type: 'attendance', value: false });
        throw error;
      }
    },
    
    // ===== ACCIONES COMBINADAS =====
    
    // Crear un evento desde el formulario
    async createEventFromForm({ dispatch, rootState }, formData) {
      try {
        // Obtener IDs necesarios (en un sistema real deberías buscar estos IDs en tu base de datos)
        // Simularemos obtener el ID del tipo y ubicación
        const typeId = await dispatch('getActivityTypeIdByName', formData.activityType);
        const locationId = await dispatch('getLocationIdByName', formData.location);
        const userId = rootState.user?.id || "anonymous"; // Obtener ID de usuario desde el estado global
        
        // Crear estructura de datos para la API
        const eventData = {
          Title: formData.eventName,
          Description: formData.description,
          Id_type: typeId,
          Id_Location: locationId,
          Start_time: formData.startTime,
          End_time: formData.endTime,
          Event_date: formData.date,
          Organizer_id: userId
        };
        
        // Crear la actividad usando la acción existente
        const createdActivity = await dispatch('createActivity', eventData);
        return createdActivity;
      } catch (error) {
        throw error;
      }
    },
    
    // Helper: Obtener ID de tipo de actividad por nombre
    async getActivityTypeIdByName({ state, dispatch }, typeName) {
      // Si no hay tipos cargados, cargarlos
      if (state.activityTypes.length === 0) {
        await dispatch('fetchActivityTypes');
      }
      
      // Buscar el tipo por nombre
      const activityType = state.activityTypes.find(type => type.Type_name === typeName);
      return activityType ? activityType.Id_type : 1; // ID por defecto si no se encuentra
    },
    
    // Helper: Obtener ID de ubicación por nombre
    async getLocationIdByName({ state, dispatch }, locationName) {
      // Si no hay ubicaciones cargadas, cargarlas
      if (state.locations.length === 0) {
        await dispatch('fetchLocations');
      }
      
      // Buscar la ubicación por nombre
      const location = state.locations.find(loc => loc.Location_ === locationName);
      return location ? location.Id_Location : 1; // ID por defecto si no se encuentra
    },
    
    // Registrar o cancelar asistencia a un evento
    async toggleAttendance({ dispatch, rootState, state }, activityId) {
      const userId = rootState.user?.id || "anonymous"; // Obtener ID de usuario
      
      
      // Verificar si el usuario ya está registrado
      const isAttending = state.attendances.some(
        a => a.Id_user === userId && a.Id_activity === activityId && a.Confirmation === 1
      );
      
      if (isAttending) {
        // Si ya está registrado, actualizar a no asistir (0)
        return await dispatch('updateAttendance', {
          userId,
          activityId,
          confirmation: 0
        });
      } else {
        // Si no está registrado o tiene confirmación 0, registrar asistencia
        return await dispatch('registerAttendance', {
          userId,
          activityId
        }).catch(error => {
          // Si ya está registrado pero con confirmación 0, actualizar a 1
          if (error.response?.status === 400 && error.response?.data?.error === 'El usuario ya está registrado para esta actividad') {
            return dispatch('updateAttendance', {
              userId,
              activityId,
              confirmation: 1
            });
          }
          throw error; // Re-lanzar otros errores
        });
      }
    }
  }
};