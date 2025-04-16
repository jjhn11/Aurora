import { createStore } from 'vuex';
import axios from 'axios';

const travel = (path) => {
  const url = new URL(axios.defaults.baseURL + path);
  window.location.href = url;
}

export default createStore({
  state: {
    isAuthenticated: false,
    user: null,
  },
  getters: {
    isAuthenticated: (state) => state.isAuthenticated,
    user: (state) => state.user,
  },
  mutations: {
    setAuthState(state, { isAuthenticated, user }) {
      state.isAuthenticated = isAuthenticated;
      state.user = user;
    }
  },
  actions: {
    // Check if user is authenticated
    async checkAuth({ commit }) {
      try {
        const response = await axios.get('/auth/status',
          { withCredentials: true } // Include credentials in the request
        );
        commit('setAuthState', {
          isAuthenticated: response.data.isAuthenticated,
          user: response.data.user || null
        });
        
        return response.data.isAuthenticated;

      } catch(error) {
        console.error('Error checking auth status: ', error);
        commit('setAuthState', { isAuthenticated: false, user: null });
        return false;
      }
    },

    // Login with Google OAuth
    async loginWithGoogle(){
      // const returnUrl = `${window.location.origin}${window.location.pathname}`;
      // window.location.href = `/auth/google?returnTo=${returnUrl}`;
      travel(`/auth/google?returnTo=${window.location.href}`);
    },

    // Logout
    async logout({ commit }) {
      try {
        const res = await axios.get('/auth/logout', { withCredentials: true });
        if (res.status == 200)
          commit('setAuthState', { isAuthenticated: false, user: null });
      } catch (error) {
        console.error('Error logging out: ', error);
      }
    },
  },
  modules: {
    // Your modules here
  }
})