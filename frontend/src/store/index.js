import { createStore } from 'vuex';
import axios from 'axios';
import booksModule from './modules/books';
import userModule from './modules/user';
import eventsModule from './modules/events';
import communityModule from './modules/community';
import profanityModule from './modules/profanity';

const travel = (path) => {
  const url = new URL(axios.defaults.baseURL + path);
  window.location.href = url;
};

export default createStore({
  state: {
    isAuthenticated: false,
    showingShareModal: false,
  },
  
  getters: {
    isAuthenticated: (state) => state.isAuthenticated,
    user: (state) => state.user,
    showingShareModal: (state) => state.showingShareModal,
  },
  
  mutations: {
    setAuthState(state, { isAuthenticated, user }) {
      state.isAuthenticated = isAuthenticated;
      state.user = user;
    },
    setShowingShareModal(state, showingShareModal) {
      state.showingShareModal = showingShareModal;
    },
  },
  
  actions: {
    // Check if user is authenticated
    async checkAuth({ commit, dispatch }) {
      try {
        const response = await axios.get('/auth/status', { withCredentials: true });
        
        // Actualizar estado de autenticación en el store principal
        commit('setAuthState', {
          isAuthenticated: response.data.isAuthenticated,
          user: response.data.user || null
        });
        
        // Sincronizar el estado con el módulo de usuario
        if (response.data.isAuthenticated && response.data.user) {
          dispatch('user/syncAuthState', {
            isAuthenticated: response.data.isAuthenticated,
            user: response.data.user
          });
        } else {
          commit('user/SET_PROFILE', null); 
          commit('user/SET_USER_DATA', null);
        }
        
        return response.data.isAuthenticated;
      } catch(error) {
        console.error('Error checking auth status:', error);
        commit('setAuthState', { isAuthenticated: false, user: null });
        commit('user/SET_PROFILE', null);
        commit('user/SET_USER_DATA', null);
        return false;
      }
    },

    // Login with Google OAuth
    async loginWithGoogle() {
      travel(`/auth/google?returnTo=${window.location.href}`);
    },

    // Logout
    async logout({ commit }) {
      try {
        const res = await axios.get('/auth/logout', { withCredentials: true });
        if (res.status === 200) {
          commit('setAuthState', { isAuthenticated: false, user: null });
          // También sincronizar con el módulo de usuario
          commit('user/SET_PROFILE', null);
          commit('user/SET_USER_DATA', null);
        }
      } catch (error) {
        console.error('Error logging out:', error);
      }
    },
  },
  
  modules: {
    books: booksModule,
    user: userModule,
    events: eventsModule,
    profanity: profanityModule,
    community: communityModule
  }
});