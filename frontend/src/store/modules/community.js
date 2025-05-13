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
    
    // Actualizar los metadatos de una actividad
    UPDATE_ACTIVITY_METADATA(state, { activityId, metadata }) {
      const activityIndex = state.activities.findIndex(activity => activity.Id_activity === activityId);
      if (activityIndex !== -1) {
        state.activities[activityIndex] = {
          ...state.activities[activityIndex],
          _metadata: {
            ...state.activities[activityIndex]._metadata,
            ...metadata
          }
        };
      }
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
    SET_ATTENDANCES(state, { attendances, replace = false }) {
      if (replace) {
        // Reemplazar todo el array si se solicita explícitamente
        state.attendances = attendances;
      } else {
        // Agregar nuevas asistencias o actualizar las existentes
        const updatedAttendances = [...state.attendances];
        
        // Para cada asistencia recibida
        attendances.forEach(newAttendance => {
          // Buscar si ya existe un registro para este usuario y actividad
          const existingIndex = updatedAttendances.findIndex(
            att => att.Id_user === newAttendance.Id_user && 
                   att.Id_activity === newAttendance.Id_activity
          );
          
          if (existingIndex >= 0) {
            // Si existe, actualizarlo
            updatedAttendances[existingIndex] = newAttendance;
          } else {
            // Si no existe, agregarlo
            updatedAttendances.push(newAttendance);
          }
        });
        
        state.attendances = updatedAttendances;
      }
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
    async fetchActivities({ commit, dispatch, state }, categoryId = null) {
      commit('SET_LOADING', { type: 'activities', value: true });
      commit('SET_ERROR', { type: 'activities', value: null });
      
      try {
        let url = '/community/activity';
        if (categoryId) {
          url += `?categoryId=${categoryId}`;
        }
        
        // Cargar categorías y tipos si no están cargados
        if (state.categories.length === 0) {
          await dispatch('fetchCategories');
        }
        if (state.activityTypes.length === 0) {
          await dispatch('fetchActivityTypes');
        }

        if (state.locations.length === 0) {
          await dispatch('fetchLocations');
        }
          
        const response = await axios.get(url);
        
        // Enriquecer actividades con información de iconos si no la tienen
        const enrichedActivities = await Promise.all(response.data.map(async activity => {
          // Si ya tiene metadatos, mantenerlos
          if (activity._metadata) {
            return activity;
          }
          
          // Obtener información del tipo de actividad
          const typeInfo = await dispatch('getActivityTypeInfo', activity.Id_type);
          
          if (typeInfo) {
            const { type, category } = typeInfo;
            let categoryFolder = category?.Category_name?.toLowerCase() || 'recreational';
            
            // Determinar un color basado en la categoría
            let bgColor = "#cccccc"; // Color por defecto
            switch (categoryFolder) {
              case 'cultural':
                bgColor = "#FBE326"; // Amarillo
                break;
              case 'deportivo':
              case 'deportes':
                bgColor = "#5C77BA"; // Azul
                break;
              case 'recreativas':
              case 'recreacional':
                bgColor = "#6DCEff"; // Celeste
                break;
              case 'videojuegos':
                bgColor = "#61FFD2"; // Verde menta
                break;
            }
            
                  
            switch (categoryFolder) {
              case 'cultural':
                categoryFolder = 'cultural'; // En ingles
                break;
              case 'deportivo':
              case 'deportes':
                categoryFolder = 'sports';
                break;
              case 'recreativas':
                categoryFolder = 'recreational';
                break;
              case 'videojuegos':
                categoryFolder = 'videogames';
                break;
            }
            
            // Generar ruta de ícono
            const typeName = type.Type_name.replace(/\s+/g, '_').toUpperCase();
            const iconPath = `/src/assets/img/community/icons/${categoryFolder}/ICONO ${typeName}.png`;
            const locationName = state.locations.find(loc => loc.Id_Location === activity.Id_Location)?.Location_ || 'Ubicación no disponible';

            return {
              ...activity,
              location_name: locationName,
              _metadata: {
                iconPath,
                backgroundColor: bgColor,
                categoryFolder
              }
            };
          }
          
          return activity;
        }));
        
        commit('SET_ACTIVITIES', enrichedActivities);
        commit('SET_LOADING', { type: 'activities', value: false });
        return enrichedActivities;
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
    async fetchAttendance({ commit, rootState }, { activityId = null, considerUser = true, replace = false } = {}) {
      commit('SET_LOADING', { type: 'attendance', value: true });
      commit('SET_ERROR', { type: 'attendance', value: null });
      
      try {
        // Construir la URL base
        let url = '/community/activity/attendance';
        
        // Si hay un activityId específico, filtrar por él
        if (activityId) {
          url += `?activityId=${activityId}`;
        }
        // Si no hay activityId pero hay un usuario autenticado y considerUser es true, cargar sus asistencias
        else if (considerUser && rootState.user?.id) {
          url += `?userId=${rootState.user.id}`;
        }
        
        const response = await axios.get(url);
        
        // Pasar el flag replace a la mutación
        commit('SET_ATTENDANCES', { 
          attendances: response.data,
          replace: replace
        });
        
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
      
      console.log("Registering attendance:", { userId, activityId, confirmation });

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
    async createEventFromForm({ dispatch, rootState, state }, formData) {
      try {
        // Obtener IDs necesarios
        const typeId = await dispatch('getActivityTypeIdByName', formData.activityType.toUpperCase());
        const locationId = await dispatch('getLocationIdByName', formData.location);
        const userId = rootState.user?.id || "anonymous"; // Obtener ID de usuario desde el estado global
        
        // Obtener información del tipo de actividad para saber su categoría
        const activityType = state.activityTypes.find(type => type.Id_type === typeId);
        
        // Obtener la categoría a la que pertenece este tipo de actividad
        const categoryId = activityType?.Id_category || 3; // Valor por defecto: 3 (recreacional)
        const category = state.categories.find(cat => cat.Id_category === categoryId);
        
        // Preparar la información del ícono
        let iconMetadata = {};
        if (formData.selectedIcon) {
          iconMetadata = {
            iconPath: formData.selectedIcon.image,
            backgroundColor: formData.selectedIcon.bgColor,
            categoryFolder: category?.Category_name?.toLowerCase() || 'recreational'
          };
        }
        
        // Crear estructura de datos para la API
        const eventData = {
          Title: formData.eventName,
          Description: formData.description,
          Id_type: typeId,
          Id_Location: locationId,
          Start_time: formData.startTime,
          End_time: formData.endTime,
          Event_date: formData.date,
          Organizer_id: userId,
          _metadata: iconMetadata // Guardar los metadatos del ícono
        };
        
        // Crear la actividad usando la acción existente
        const createdActivity = await dispatch('createActivity', eventData);
        return createdActivity;
      } catch (error) {
        console.error("Error en createEventFromForm:", error);
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
      
      // Buscar la ubicación por nombre (case-insensitive comparison)
      const location = state.locations.find(loc => 
        loc.Location_.toUpperCase() === locationName.toUpperCase()
      );
      
      if (!location) {
        console.warn(`Location not found: ${locationName}`);
      }
      
      return location ? location.Id_Location : 1; // ID por defecto si no se encuentra
    },
    
    // Helper: Obtener datos completos de un tipo de actividad por ID
    async getActivityTypeInfo({ state, dispatch }, typeId) {
      // Si no hay tipos cargados, cargarlos
      if (state.activityTypes.length === 0) {
        await dispatch('fetchActivityTypes');
      }
      
      // Buscar el tipo por ID
      const activityType = state.activityTypes.find(type => type.Id_type === typeId);
      
      if (!activityType) {
        return null;
      }
      
      // Si no hay categorías cargadas, cargarlas
      if (state.categories.length === 0) {
        await dispatch('fetchCategories');
      }
      
      // Buscar la categoría asociada al tipo
      const category = state.categories.find(cat => cat.Id_category === activityType.Id_category);
      
      return {
        type: activityType,
        category
      };
    },
    
    // Helper: Obtener ruta de ícono basada en categoría y tipo
    async getIconPathForActivityType({ state, commit }, { categoryId, typeName, selectedIcon }) {
      // Si hay un icono seleccionado explícitamente en el form, usarlo
      if (selectedIcon && selectedIcon.image) {
        return {
          path: selectedIcon.image,
          bgColor: selectedIcon.bgColor || "#cccccc"
        };
      }
      
      // Buscar la categoría por ID
      const category = state.categories.find(cat => cat.Id_category === categoryId);
      if (!category) {
        console.warn(`Categoría no encontrada para ID: ${categoryId}`);
        return {
          path: "/src/assets/img/community/icons/recreational/ICONO LECTURA.png",
          bgColor: "#cccccc"
        };
      }
      
      // Normalizar el nombre del tipo para la ruta del archivo
      const normalizedTypeName = typeName.toUpperCase().trim()
        .replace(/\s+/g, '_') // Reemplazar espacios con guiones bajos
        .replace(/[()\/]/g, ''); // Quitar paréntesis y barras
      
      // Obtener el nombre de la categoría y convertirlo a minúsculas para la carpeta
      let categoryFolder = category.Category_name.toLowerCase();
      
      // Determinar el color de fondo según la categoría
      let bgColor;
      switch (categoryFolder) {
        case 'cultural':
          bgColor = "#FBE326"; // Amarillo
          break;
        case 'deportivo':
        case 'deportes':
          bgColor = "#5C77BA"; // Azul
          break;
        case 'recreativa':
        case 'recreacional':
          bgColor = "#6DCEff"; // Celeste
          break;
        case 'videojuegos':
          bgColor = "#61FFD2"; // Verde menta
          break;
        default:
          bgColor = "#cccccc"; // Gris por defecto
      }
      
      switch (categoryFolder) {
        case 'cultural':
          categoryFolder = 'cultural'; // En ingles
          break;
        case 'deportivo':
        case 'deportes':
          categoryFolder = 'sports';
          break;
        case 'recreativa':
        case 'recreacional':
          categoryFolder = 'recreational';
          break;
        case 'videojuegos':
          categoryFolder = 'videogames';
          break;
      }

      // Construir la ruta del icono
      const iconPath = `/src/assets/img/community/icons/${categoryFolder}/ICONO ${normalizedTypeName}.png`;
      
      return {
        path: iconPath,
        bgColor: bgColor,
        categoryFolder: categoryFolder
      };
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
    },

    // Helper: Obtener recuento de asistentes para una actividad
    async getAttendanceCount({ dispatch, state }, activityId) {
      try {
        // Si no tenemos datos de asistencia o necesitamos actualizarlos
        // podemos buscarlos específicamente para esta actividad
        let attendances = state.attendances.filter(a => a.Id_activity === activityId);

        // Si no tenemos datos en el state, los cargamos
        // Usamos considerUser=false para evitar filtrar por usuario actual
        if (attendances.length === 0) {
          await dispatch('fetchAttendance', { activityId, considerUser: false });
          attendances = state.attendances.filter(a => a.Id_activity === activityId);
        }

        // Contar solo aquellos con confirmación = 1 (asistirán)
        const confirmedCount = attendances.filter(a => a.Confirmation === 1).length;
        
        return {
          total: attendances.length,
          confirmed: confirmedCount,
          pending: attendances.length - confirmedCount
        };
      } catch (error) {
        console.error('Error al obtener recuento de asistentes:', error);
        return {
          total: 0,
          confirmed: 0,
          pending: 0
        };
      }
    }
  }
};