import axios from 'axios';

// Importar imágenes de fallback para categorías
import eventImageCultural from '@/assets/img/events/cultural-event-1.jpg';
import eventImageSports from '@/assets/img/events/sports-event-1.jpg';
import eventImageSchool from '@/assets/img/events/school-event-1.jpg';
// import eventImageDefault from '@/assets/img/events/default.jpg';
import eventImage1 from '@/assets/img/events/cultural-event-1.jpg';
import eventImage2 from '@/assets/img/events/cultural-event-2.jpg';
import eventImage3 from '@/assets/img/events/cultural-event-2.jpg';
import eventImage4 from '@/assets/img/events/sports-event-1.jpg';
import eventImage5 from '@/assets/img/events/sports-event-2.jpg';
import eventImage6 from '@/assets/img/events/sports-event-2.jpg';
import eventImage7 from '@/assets/img/events/school-event-1.jpg';
import eventImage8 from '@/assets/img/events/school-event-1.jpg';
import eventImage9 from '@/assets/img/events/school-event-1.jpg';

export default {
  namespaced: true,
  
  state: {
    events: [],
    categories: [],
    calendarEvents: [],
    currentEvent: null,
    loading: {
      events: false,
      categories: false,
      calendarEvents: false,
      currentEvent: false
    },
    error: {
      events: null,
      categories: null,
      calendarEvents: null,
      currentEvent: null
    },
    currentCategory: null
  },
  
  getters: {
    // Obtener todos los eventos
    getAllEvents: state => state.events,
    
    // Obtener eventos por categoría
    getEventsByCategory: state => categoryId => {
      if (!categoryId) return state.events;
      return state.events.filter(event => event.Id_category === categoryId);
    },
    
    // Obtener eventos próximos (Is_coming = true)
    getUpcomingEvents: state => {
      return state.events.filter(event => event.Is_coming === true);
    },
    
    // Obtener eventos por fecha (para el calendario)
    getEventsByDate: state => dateString => {
      return state.events.filter(event => {
        // Convertir la fecha a formato YYYY-MM-DD para comparar
        const eventDate = new Date(event.Event_date);
        const formattedDate = eventDate.toISOString().split('T')[0];
        return formattedDate === dateString;
      });
    },
    
    // Obtener evento por ID
    getEventById: state => eventId => {
      return state.events.find(event => event.Id_event === eventId);
    },
    
    // Obtener todas las categorías
    getAllCategories: state => state.categories,
    
    // Obtener categoría por ID
    getCategoryById: state => categoryId => {
      return state.categories.find(cat => cat.Id_category === categoryId);
    },
    
    // Obtener eventos del calendario
    getCalendarEvents: state => state.calendarEvents,
    
    // Obtener eventos del calendario formateados para el componente Calendar
    getCalendarEventsFormatted: state => {
      // Crear un objeto donde las claves son fechas en formato YYYY-MM-DD y los valores son arrays de títulos de eventos
      const calendarData = {};
      
      state.events.forEach(event => {
        if (event.Event_date) {
          // Convertir a formato YYYY-MM-DD
          const dateStr = new Date(event.Event_date).toISOString().split('T')[0];
          if (!calendarData[dateStr]) {
            calendarData[dateStr] = [];
          }
          calendarData[dateStr].push(event.Title);
        }
      });
      
      return calendarData;
    },
    
    // Estado de carga y errores
    isLoading: state => type => state.loading[type],
    getError: state => type => state.error[type]
  },
  
  mutations: {
    SET_EVENTS(state, events) {
      // Enriquecer eventos con imágenes basadas en categoría
      state.events = events.map(event => ({
        ...event,
        image: getImageByCategory(event.Id_category)
      }));
    },
    
    SET_CATEGORIES(state, categories) {
      state.categories = categories;
    },
    
    SET_CALENDAR_EVENTS(state, calendarEvents) {
      state.calendarEvents = calendarEvents;
    },
    
    SET_CURRENT_EVENT(state, event) {
      state.currentEvent = event;
    },
    
    SET_CURRENT_CATEGORY(state, categoryId) {
      state.currentCategory = categoryId;
    },
    
    ADD_EVENT(state, event) {
      const enrichedEvent = {
        ...event,
        image: getImageByCategory(event.Id_category)
      };
      state.events.unshift(enrichedEvent); // Añadir al principio para mostrar los más recientes primero
    },
    
    UPDATE_EVENT(state, updatedEvent) {
      const index = state.events.findIndex(event => event.Id_event === updatedEvent.Id_event);
      if (index !== -1) {
        // Mantener la imagen si el evento ya tiene una
        const existingImage = state.events[index].image;
        const enrichedEvent = {
          ...updatedEvent,
          image: existingImage || getImageByCategory(updatedEvent.Id_category)
        };
        state.events.splice(index, 1, enrichedEvent);
      }
    },
    
    DELETE_EVENT(state, eventId) {
      state.events = state.events.filter(event => event.Id_event !== eventId);
    },
    
    ADD_CALENDAR_EVENT(state, calendarEvent) {
      state.calendarEvents.push(calendarEvent);
    },
    
    SET_LOADING(state, { type, value }) {
      state.loading[type] = value;
    },
    
    SET_ERROR(state, { type, value }) {
      state.error[type] = value;
    }
  },
  
  actions: {
    // Obtener todos los eventos
    async fetchEvents({ commit }) {
      commit('SET_LOADING', { type: 'events', value: true });
      commit('SET_ERROR', { type: 'events', value: null });
      
      try {
        const response = await axios.get('/events');
        commit('SET_EVENTS', response.data);
        commit('SET_LOADING', { type: 'events', value: false });
        return response.data;
      } catch (error) {
        const errorMessage = error.response?.data?.error || 'Error al obtener eventos';
        commit('SET_ERROR', { type: 'events', value: errorMessage });
        commit('SET_LOADING', { type: 'events', value: false });
        console.error('Error en fetchEvents:', error);
        return [];
      }
    },
    
    // Obtener evento por ID
    async fetchEventById({ commit, getters }, eventId) {
      commit('SET_LOADING', { type: 'currentEvent', value: true });
      commit('SET_ERROR', { type: 'currentEvent', value: null });
      
      // Primero intentamos obtener del estado local
      const existingEvent = getters.getEventById(eventId);
      
      if (existingEvent) {
        commit('SET_CURRENT_EVENT', existingEvent);
        commit('SET_LOADING', { type: 'currentEvent', value: false });
        return existingEvent;
      }
      
      // Si no existe, lo buscamos en el API
      try {
        const response = await axios.get(`/events/${eventId}`);
        const event = {
          ...response.data,
          image: getImageByCategory(response.data.Id_category)
        };
        
        commit('SET_CURRENT_EVENT', event);
        commit('SET_LOADING', { type: 'currentEvent', value: false });
        return event;
      } catch (error) {
        const errorMessage = error.response?.data?.error || 'Error al obtener evento';
        commit('SET_ERROR', { type: 'currentEvent', value: errorMessage });
        commit('SET_LOADING', { type: 'currentEvent', value: false });
        console.error('Error en fetchEventById:', error);
        return null;
      }
    },
    
    // Obtener todas las categorías
    async fetchCategories({ commit }) {
      commit('SET_LOADING', { type: 'categories', value: true });
      commit('SET_ERROR', { type: 'categories', value: null });
      
      try {
        const response = await axios.get('/events/categories');
        commit('SET_CATEGORIES', response.data);
        commit('SET_LOADING', { type: 'categories', value: false });
        return response.data;
      } catch (error) {
        const errorMessage = error.response?.data?.error || 'Error al obtener categorías';
        commit('SET_ERROR', { type: 'categories', value: errorMessage });
        commit('SET_LOADING', { type: 'categories', value: false });
        console.error('Error en fetchCategories:', error);
        return [];
      }
    },
    
    // Crear nueva categoría
    async createCategory({ commit }, categoryData) {
      commit('SET_LOADING', { type: 'categories', value: true });
      commit('SET_ERROR', { type: 'categories', value: null });
      
      try {
        const response = await axios.post('/events/categories', categoryData);
        // No actualizamos el estado aquí, simplemente refrescamos las categorías
        await this.dispatch('events/fetchCategories');
        commit('SET_LOADING', { type: 'categories', value: false });
        return response.data;
      } catch (error) {
        const errorMessage = error.response?.data?.error || 'Error al crear categoría';
        commit('SET_ERROR', { type: 'categories', value: errorMessage });
        commit('SET_LOADING', { type: 'categories', value: false });
        console.error('Error en createCategory:', error);
        throw error;
      }
    },
    
    // Filtrar eventos por categoría
    setCurrentCategory({ commit }, categoryId) {
      commit('SET_CURRENT_CATEGORY', categoryId);
    },
    
    // Obtener eventos del calendario
    async fetchCalendarEvents({ commit }) {
      commit('SET_LOADING', { type: 'calendarEvents', value: true });
      commit('SET_ERROR', { type: 'calendarEvents', value: null });
      
      try {
        const response = await axios.get('/events/calendar');
        commit('SET_CALENDAR_EVENTS', response.data);
        commit('SET_LOADING', { type: 'calendarEvents', value: false });
        return response.data;
      } catch (error) {
        const errorMessage = error.response?.data?.error || 'Error al obtener eventos del calendario';
        commit('SET_ERROR', { type: 'calendarEvents', value: errorMessage });
        commit('SET_LOADING', { type: 'calendarEvents', value: false });
        console.error('Error en fetchCalendarEvents:', error);
        return [];
      }
    },
    
    // Crear un nuevo evento
    async createEvent({ commit }, eventData) {
      commit('SET_LOADING', { type: 'events', value: true });
      commit('SET_ERROR', { type: 'events', value: null });
      
      try {
        const response = await axios.post('/events', eventData);
        commit('ADD_EVENT', response.data);
        commit('SET_LOADING', { type: 'events', value: false });
        return response.data;
      } catch (error) {
        const errorMessage = error.response?.data?.error || 'Error al crear evento';
        commit('SET_ERROR', { type: 'events', value: errorMessage });
        commit('SET_LOADING', { type: 'events', value: false });
        console.error('Error en createEvent:', error);
        throw error;
      }
    },
    
    // Actualizar un evento existente
    async updateEvent({ commit }, { eventId, eventData }) {
      commit('SET_LOADING', { type: 'currentEvent', value: true });
      commit('SET_ERROR', { type: 'currentEvent', value: null });
      
      try {
        const response = await axios.put(`/events/${eventId}`, eventData);
        commit('UPDATE_EVENT', response.data);
        commit('SET_CURRENT_EVENT', response.data);
        commit('SET_LOADING', { type: 'currentEvent', value: false });
        return response.data;
      } catch (error) {
        const errorMessage = error.response?.data?.error || 'Error al actualizar evento';
        commit('SET_ERROR', { type: 'currentEvent', value: errorMessage });
        commit('SET_LOADING', { type: 'currentEvent', value: false });
        console.error('Error en updateEvent:', error);
        throw error;
      }
    },
    
    // Eliminar un evento
    async deleteEvent({ commit }, eventId) {
      commit('SET_LOADING', { type: 'events', value: true });
      commit('SET_ERROR', { type: 'events', value: null });
      
      try {
        await axios.delete(`/events/${eventId}`);
        commit('DELETE_EVENT', eventId);
        commit('SET_LOADING', { type: 'events', value: false });
        return true;
      } catch (error) {
        const errorMessage = error.response?.data?.error || 'Error al eliminar evento';
        commit('SET_ERROR', { type: 'events', value: errorMessage });
        commit('SET_LOADING', { type: 'events', value: false });
        console.error('Error en deleteEvent:', error);
        throw error;
      }
    },
    
    // Añadir un evento al calendario
    async addEventToCalendar({ commit }, calendarEventData) {
      commit('SET_LOADING', { type: 'calendarEvents', value: true });
      commit('SET_ERROR', { type: 'calendarEvents', value: null });
      
      try {
        const response = await axios.post('/events/calendar', calendarEventData);
        commit('ADD_CALENDAR_EVENT', response.data);
        commit('SET_LOADING', { type: 'calendarEvents', value: false });
        return response.data;
      } catch (error) {
        const errorMessage = error.response?.data?.error || 'Error al añadir evento al calendario';
        commit('SET_ERROR', { type: 'calendarEvents', value: errorMessage });
        commit('SET_LOADING', { type: 'calendarEvents', value: false });
        console.error('Error en addEventToCalendar:', error);
        throw error;
      }
    },
    
    // Cargar datos iniciales (eventos, categorías y eventos del calendario)
    async loadInitialData({ dispatch }) {
      try {
        await Promise.all([
          dispatch('fetchEvents'),
          dispatch('fetchCategories'),
          dispatch('fetchCalendarEvents')
        ]);
        return true;
      } catch (error) {
        console.error('Error al cargar datos iniciales:', error);
        return false;
      }
    }
  }
};

// Función auxiliar para asignar una imagen según la categoría del evento
function getImageByCategory(categoryId) {
  // Valores predeterminados según la categoría
  const categoryImages = {
    1: eventImageCultural,  // Cultural
    2: eventImageSports,    // Deportivo
    3: eventImageSchool,    // Escolar
    4: eventImageCultural    // Por defecto
  };
  
  return categoryImages[categoryId] || eventImageDefault;
}