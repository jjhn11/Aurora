import axios from 'axios';

export default {
  namespaced: true,
  
  state: {
    loading: false,
    error: null,
    result: null
  },
  
  getters: {
    isLoading: state => state.loading,
    getError: state => state.error,
    getResult: state => state.result
  },
  
  mutations: {
    SET_LOADING(state, value) {
      state.loading = value;
    },
    SET_ERROR(state, error) {
      state.error = error;
    },
    SET_RESULT(state, result) {
      state.result = result;
    }
  },
  
  actions: {
    // Verificar profanidad
    async checkProfanity({ commit }, { fieldsToCheck, content }) {
      commit('SET_LOADING', true);
      commit('SET_ERROR', null);
      
      try {
        console.log("Enviando solicitud de verificación de profanidad:", { fieldsToCheck, content });
        
        // La ruta backend espera los campos como parámetro en el middleware, no en el body
        // Usar el endpoint correctamente configurado
        const response = await axios.post('/profanity', content);
        
        console.log("Respuesta de profanidad:", response.data);
        
        commit('SET_RESULT', response.data);
        commit('SET_LOADING', false);
        return response.data;
      } catch (error) {
        console.error("Error al verificar profanidad:", error);
        const errorMsg = error.response?.data?.error || 'Error al verificar profanidad';
        commit('SET_ERROR', errorMsg);
        commit('SET_LOADING', false);
        throw error;
      }
    }
  }
};