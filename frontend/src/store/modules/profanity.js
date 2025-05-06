import axios from 'axios';

export default {
  namespaced: true,
  
  state: {
    isProfane: false,
    profaneFields: [],
    content: null,
    isSFW: true,
    loading: false,
    error: null,
    verifiedFields: []
  },
  
  getters: {
    // Verifica si el contenido contiene profanidad
    isProfane: (state) => state.isProfane,
    
    // Obtiene los campos con profanidad
    profaneFields: (state) => state.profaneFields,
    
    // Verifica si el contenido es "Safe For Work"
    isSFW: (state) => state.isSFW,
    
    // Obtiene los campos verificados
    verifiedFields: (state) => state.verifiedFields,
    
    // Estado de carga
    isLoading: (state) => state.loading,
    
    // Errores
    getError: (state) => state.error
  },
  
  mutations: {
    SET_PROFANITY_STATE(state, { isProfane, profaneFields, isSFW, verifiedFields }) {
      state.isProfane = isProfane;
      state.profaneFields = profaneFields;
      state.isSFW = isSFW;
      state.verifiedFields = verifiedFields;
    },
    
    SET_CONTENT(state, content) {
      state.content = content;
    },
    
    SET_LOADING(state, loading) {
      state.loading = loading;
    },
    
    SET_ERROR(state, error) {
      state.error = error;
    },
    
    RESET_STATE(state) {
      state.isProfane = false;
      state.profaneFields = [];
      state.content = null;
      state.isSFW = true;
      state.loading = false;
      state.error = null;
      state.verifiedFields = [];
    }
  },
  
  actions: {
    /**
     * Verifica si el contenido contiene profanidad
     * @param {Object} fieldsToCheck - Arreglo con los nombres de los campos a verificar
     * @param {Object} content - Objeto con el contenido a verificar
     */
    async checkProfanity({ commit }, { fieldsToCheck, content }) {
      if (!fieldsToCheck || !Array.isArray(fieldsToCheck) || fieldsToCheck.length === 0) {
        commit('SET_ERROR', 'Debe proporcionar un arreglo de campos a verificar');
        return Promise.reject(new Error('Debe proporcionar un arreglo de campos a verificar'));
      }
      
      if (!content || typeof content !== 'object') {
        commit('SET_ERROR', 'Debe proporcionar un objeto con el contenido a verificar');
        return Promise.reject(new Error('Debe proporcionar un objeto con el contenido a verificar'));
      }
      
      commit('SET_LOADING', true);
      commit('SET_CONTENT', content);
      
      try {
        const response = await axios.post('/profanity', {
          fieldsToCheck,
          content
        }, { withCredentials: true });
        
        // Si la respuesta es 200, verificamos si es SFW o no basado en la respuesta
        if (response.data.SFW) {
          // Contenido es seguro
          commit('SET_PROFANITY_STATE', {
            isProfane: false,
            profaneFields: [],
            isSFW: true,
            verifiedFields: response.data.verifiedFields || fieldsToCheck
          });
          
          commit('SET_LOADING', false);
          return { 
            isSFW: true, 
            isProfane: false,
            profaneFields: [],
            verifiedFields: response.data.verifiedFields || fieldsToCheck
          };
        } else {
          // Contenido no es seguro, pero la respuesta fue exitosa
          // Esto es para el nuevo formato donde el backend devuelve un 200 pero con la información de profanidad
          commit('SET_PROFANITY_STATE', {
            isProfane: true,
            profaneFields: response.data.profaneFields || [],
            isSFW: false,
            verifiedFields: fieldsToCheck
          });
          
          commit('SET_LOADING', false);
          return {
            isSFW: false,
            isProfane: true,
            profaneFields: response.data.profaneFields || [],
            verifiedFields: fieldsToCheck
          };
        }
      } catch (error) {
        // Manejo de errores para el caso en que el backend devuelve error
        if (error.response) {
          // Error con respuesta del servidor
          const status = error.response.status;
          
          if (status === 400) {
            // Error 400 - Bad Request, puede ser por datos faltantes o incorrectos
            commit('SET_ERROR', error.response.data.error || 'Error en la solicitud');
          } else {
            // Otros errores del servidor
            commit('SET_ERROR', `Error del servidor: ${status}`);
          }
        } else if (error.request) {
          // No se recibió respuesta del servidor
          commit('SET_ERROR', 'No se pudo conectar con el servidor');
        } else {
          // Error al preparar la solicitud
          commit('SET_ERROR', error.message || 'Error al verificar el contenido');
        }
        
        commit('SET_LOADING', false);
        throw error;
      }
    },
    
    /**
     * Limpia el estado de profanidad
     */
    resetProfanityState({ commit }) {
      commit('RESET_STATE');
    }
  }
};