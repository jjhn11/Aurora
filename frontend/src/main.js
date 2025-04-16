import './assets/scss/main.scss'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'

// // Configure axios
const API_BASE_URL = 'http://localhost:3000'; // Adjust this to your API base URL
axios.defaults.baseURL = API_BASE_URL; // Set the base URL for axios requests
axios.defaults.withCredentials = true; // Include credentials in requests by default

// Import Bootstrap CSS and JS
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
// Icons
import 'bootstrap-icons/font/bootstrap-icons.css';

createApp(App).use(axios).use(store).use(router).mount('#app')