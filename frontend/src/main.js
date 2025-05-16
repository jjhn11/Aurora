import './assets/scss/main.scss'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'

// Vite proporciona estas variables automáticamente
const isProduction = import.meta.env.PROD;
const mode = import.meta.env.MODE;

// Seleccionar la URL base según el entorno
const API_BASE_URL = isProduction 
  ? 'https://auroramexicali.com:3000'  // URL de producción
  : 'http://localhost:3000';      // URL de desarrollo

//   alert(`App running in ${isProduction ? 'production' : 'development'} mode`);
//   alert(`${mode} mode`);
//   console.log(API_BASE_URL)

// Configure axios
axios.defaults.baseURL = API_BASE_URL; // Set the base URL for axios requests
axios.defaults.withCredentials = true; // Include credentials in requests by default

// Import Bootstrap CSS and JS
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
// Icons
import 'bootstrap-icons/font/bootstrap-icons.css';

createApp(App).use(store).use(router).mount('#app')