<template>
  <div class="book-detail-page">
    <div v-if="loading" class="loading-overlay">
      <div class="spinner"></div>
      <p>Cargando detalles del libro...</p>
    </div>
    
    <main v-else class="book-content">
      <Breadcrumb :paths="breadcrumbPaths" />

      <BookInfo
        :bookId="bookId"
        :title="book.Title"
        :authors="book.authors"
        :coverImage="book.coverImage"
        :synopsis="book.synopsis"
      />

      <BookMetadata
        :format="book.format || 'N/A'"
        :authors="book.authorText || ''"
        :publisher="book.publisher || 'N/A'"
        :year="book.year || 'N/A'"
        :pages="book.pages || 'N/A'"
        :binding="book.binding || 'N/A'"
        :isbn="book.ISBN || 'N/A'"
        :isbn13="book.ISBN || 'N/A'"
        :edition="book.edition || 'N/A'"
        :categories="book.categories || []"
      />
      
      <!-- <BookReviews :reviews="book.reviews" /> -->
      <!-- <RelatedBooks :books="relatedBooks" /> -->
      
      <!-- <div class="progress-bar">
        <div class="progress-bar-blue"></div>
      </div> -->
    </main>

    
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import Breadcrumb from "@/components/Library/Book/Breadcrumb.vue";
import BookInfo from "@/components/Library/Book/BookInfo.vue";
import BookActions from "@/components/Library/Book/BookActions.vue";
import BookMetadata from "@/components/Library/Book/BookMetadata.vue";
import CarruselBiblioteca from '@/components/Library/CarruselBiblioteca.vue';

// State management
const route = useRoute();
const store = useStore();
const loading = ref(true);
const error = ref(null);
const book = ref({});

// Get the book ID from the route parameter
const bookId = computed(() => route.params.id);

// Create breadcrumb paths
const breadcrumbPaths = computed(() => [
  { name: 'INICIO', path: '/' },
  { name: 'BIBLIOTECA', path: '/library' },
  { name: book.value.Title || 'Cargando...', path: `/library/book/${bookId.value}`, active: true }
]);

// Fetch the book data
const fetchBookData = async () => {
  loading.value = true;
  error.value = null;
  
  try {
    // Use the store to fetch book details
    await store.dispatch('books/fetchBookDetails', bookId.value);
    
    // Get the book from the store
    const bookDetails = store.getters['books/getBookById'](bookId.value);
    
    if (bookDetails) {
      // Update the book ref with the fetched data
      book.value = bookDetails;
    } else {
      error.value = 'No se encontró el libro solicitado.';
    }
  } catch (err) {
    console.error('Error fetching book data:', err);
    error.value = 'No se pudo cargar la información del libro. Por favor intenta de nuevo más tarde.';
  } finally {
    loading.value = false;
  }
};

// Fetch book data when the component is mounted
onMounted(() => {
  fetchBookData();
});

// Watch for changes to the book ID (in case user navigates between books)
watch(bookId, () => {
  fetchBookData();
});



</script>

<style scoped>
.book-detail-page {
  background-color: rgba(255, 255, 255, 1);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  align-items: stretch;
  min-height: 100vh; /* Ensure full height even when loading */
}

.book-content {
  align-self: center;
  display: flex;
  margin-top: 31px;
  width: 92%;
  max-width: 95vw;
  flex-direction: column;
  align-items: stretch;
  padding: 0 15px; /* Add padding for mobile */
}

/* Loading state */
.loading-overlay {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 50vh;
  width: 100%;
  font-family: 'Nunito Sans', sans-serif;
}

.spinner {
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-left: 4px solid rgba(0, 71, 255, 1);
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 1s linear infinite;
  margin-bottom: 20px;
}

/* Error state */
.error-message {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 50vh;
  padding: 20px;
  text-align: center;
  color: #721c24;
  background-color: #f8d7da;
  border-radius: 4px;
  margin: 40px auto;
  max-width: 600px;
}

.retry-button {
  background-color: rgba(0, 71, 255, 1);
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  margin-top: 15px;
  cursor: pointer;
  font-family: 'Nunito Sans', sans-serif;
  transition: background-color 0.3s ease;
}

.retry-button:hover {
  background-color: rgba(0, 50, 180, 1);
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@media (max-width: 991px) {
  .book-content {
    max-width: 100%;
  }
  
  /* Adjust spinner size for mobile */
  .spinner {
    width: 40px;
    height: 40px;
  }
  
  /* Adjust error message for mobile */
  .error-message {
    margin: 20px;
    padding: 15px;
  }
}

/* Existing styles */
.progress-bar {
  border-radius: 20px;
  background-color: rgba(226, 227, 228, 1);
  align-self: center;
  display: flex;
  margin-top: 84px;
  margin-left: 12px;
  width: 1278px;
  max-width: 100%;
  flex-direction: column;
  align-items: start;
}

@media (max-width: 991px) {
  .progress-bar {
    padding: 0 20px;
    margin-top: 40px;
    margin-left: 0;
  }
}

.progress-bar-blue {
  border-radius: 20px;
  background-color: rgba(0, 71, 255, 1);
  display: flex;
  width: 639px;
  flex-shrink: 0;
  max-width: 100%;
  height: 19px;
}

.wave-divider {
  aspect-ratio: 6.94;
  object-fit: contain;
  object-position: center;
  width: 100%;
  z-index: 10;
  margin-top: 178px;
}

@media (max-width: 991px) {
  .wave-divider {
    max-width: 100%;
    margin-top: 40px;
  }
}

/* Add styles for small screens */
@media (max-width: 576px) {
  .book-content {
    margin-top: 20px;
  }
  
  .progress-bar {
    margin-top: 30px;
  }
}
</style>