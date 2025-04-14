import libroBigData from '@/assets/img/library/LibroBigData.png';
import libroFisicoquimica from '@/assets/img/library/LibroFisicoquimica.png';
import libroMarxismo from '@/assets/img/library/LibroMarxismo.jpg';
import libroPsicologia from '@/assets/img/library/LibroPsicologia.jpg';

export default {
  namespaced: true,
  state: {
    userData: {
      id: 'user123',
      name: 'Juan Pérez',
      email: 'juan.perez@example.com',
      role: 'estudiante'
    },
    favoriteBooks: [
      {
        id: "codigo-limpio-1",
        ISBN: "9788441532106",
        title: "CÓDIGO LIMPIO",
        coverImage: libroBigData,
        description: "Este libro aborda los principios y buenas prácticas para escribir código limpio, mantenible y eficiente. Es una guía esencial para desarrolladores que desean mejorar la calidad y legibilidad de su código.",
        type: "Libro Físico",
        addedDate: "15/03/2023",
        comments: "",
        author: "Robert C. Martin"
      },
      {
        id: "contabilidad-avanzada-2",
        ISBN: "9788480888646",
        title: "CONTABILIDAD AVANZADA",
        coverImage: libroFisicoquimica,
        description: "Este libro abarca en profundidad los métodos y prácticas de la contabilidad avanzada, incluyendo técnicas de consolidación, combinaciones de negocios y otros temas complejos en el ámbito contable.",
        type: "Libro Digital",
        addedDate: "22/04/2023",
        comments: "Excelente para la clase de Finanzas III",
        author: "José Luis Wanden-Berghe"
      },
      {
        id: "big-data-3",
        ISBN: "9788415832102",
        title: "BIG DATA",
        coverImage: libroMarxismo,
        description: "Una exploración completa sobre el manejo y análisis de grandes volúmenes de datos, sus aplicaciones en diferentes industrias y cómo está transformando la toma de decisiones y los modelos de negocio.",
        type: "Libro Físico",
        addedDate: "08/05/2023",
        comments: "",
        author: "Viktor Mayer-Schönberger"
      },
      {
        id: "circuitos-electronicos-4",
        ISBN: "9786073227391",
        title: "CIRCUITOS ELECTRÓNICOS",
        coverImage: libroPsicologia,
        description: "Un texto comprensivo sobre el diseño, análisis y aplicación de circuitos electrónicos, desde los conceptos básicos hasta aplicaciones avanzadas en sistemas digitales y analógicos.",
        type: "Libro Físico",
        addedDate: "12/06/2023",
        comments: "Útil para el proyecto final",
        author: "Robert L. Boylestad"
      }
    ],
    reservations: [],
    debts: [],
    loading: {
      favorites: false,
      reservations: false,
      debts: false,
      profile: false
    },
    error: {
      favorites: null,
      reservations: null,
      debts: null,
      profile: null
    }
  },

  getters: {
    // Get all favorite books
    getFavoriteBooks: (state) => {
      return state.favoriteBooks;
    },
    
    // Get a specific favorite book by ID
    getFavoriteBookById: (state) => (id) => {
      return state.favoriteBooks.find(book => book.id === id || book.ISBN === id);
    },
    
    // Check if a book is in favorites
    isBookFavorite: (state) => (id) => {
      return state.favoriteBooks.some(book => book.id === id || book.ISBN === id);
    },
    
    // Get user profile data
    getUserProfile: (state) => {
      return state.userData;
    }
  },
  
  mutations: {
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
    
    SET_USER_DATA(state, userData) {
      state.userData = userData;
    },
    
    SET_LOADING(state, { type, value }) {
      state.loading[type] = value;
    },
    
    SET_ERROR(state, { type, value }) {
      state.error[type] = value;
    }
  },
  
  actions: {
    // Fetch user's favorite books
    fetchFavoriteBooks({ commit, state }) {
      commit('SET_LOADING', { type: 'favorites', value: true });
      commit('SET_ERROR', { type: 'favorites', value: null });
      
      // Simulate API call
      return new Promise(resolve => {
        setTimeout(() => {
          // In a real app, this would be an API call
          commit('SET_LOADING', { type: 'favorites', value: false });
          resolve(state.favoriteBooks);
        }, 500);
      });
    },
    
    // Add a book to favorites
    addFavoriteBook({ commit, state, rootGetters }, bookId) {
      commit('SET_LOADING', { type: 'favorites', value: true });
      commit('SET_ERROR', { type: 'favorites', value: null });
      
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          try {
            // Check if the book is already in favorites
            if (state.favoriteBooks.some(book => book.id === bookId || book.ISBN === bookId)) {
              commit('SET_LOADING', { type: 'favorites', value: false });
              reject(new Error('El libro ya está en favoritos'));
              return;
            }
            
            // Get book details from the books store
            const book = rootGetters['books/getBookById'](bookId);
            
            if (!book) {
              commit('SET_LOADING', { type: 'favorites', value: false });
              reject(new Error('Libro no encontrado'));
              return;
            }
            
            // Create a favorite book entry
            const favoriteBook = {
              id: book.id || book.ISBN,
              ISBN: book.ISBN,
              title: book.Title || book.title,
              coverImage: book.coverImage,
              description: book.synopsis || 'Sin descripción disponible',
              type: book.format || 'Libro Físico',
              addedDate: new Date().toLocaleDateString('es-MX'),
              comments: "",
              author: book.author || (book.authors ? book.authors[0] : 'Autor desconocido')
            };
            
            // In a real app, this would be an API call
            commit('ADD_FAVORITE_BOOK', favoriteBook);
            commit('SET_LOADING', { type: 'favorites', value: false });
            resolve(favoriteBook);
          } catch (error) {
            commit('SET_ERROR', { type: 'favorites', value: error.message });
            commit('SET_LOADING', { type: 'favorites', value: false });
            reject(error);
          }
        }, 500);
      });
    },
    
    // Remove a book from favorites
    removeFavoriteBook({ commit, state }, id) {
      commit('SET_LOADING', { type: 'favorites', value: true });
      commit('SET_ERROR', { type: 'favorites', value: null });
      
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          try {
            // Check if the book exists in favorites
            const bookExists = state.favoriteBooks.some(book => book.id === id || book.ISBN === id);
            
            if (!bookExists) {
              commit('SET_LOADING', { type: 'favorites', value: false });
              reject(new Error('El libro no está en favoritos'));
              return;
            }
            
            // In a real app, this would be an API call
            commit('REMOVE_FAVORITE_BOOK', id);
            commit('SET_LOADING', { type: 'favorites', value: false });
            resolve(true);
          } catch (error) {
            commit('SET_ERROR', { type: 'favorites', value: error.message });
            commit('SET_LOADING', { type: 'favorites', value: false });
            reject(error);
          }
        }, 500);
      });
    },
    
    // Update user profile
    updateUserProfile({ commit }, userData) {
      commit('SET_LOADING', { type: 'profile', value: true });
      commit('SET_ERROR', { type: 'profile', value: null });
      
      return new Promise(resolve => {
        setTimeout(() => {
          // In a real app, this would be an API call
          commit('SET_USER_DATA', userData);
          commit('SET_LOADING', { type: 'profile', value: false });
          resolve(userData);
        }, 500);
      });
    }
  }
};