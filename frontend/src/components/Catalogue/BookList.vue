<script setup>
import { ref, computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import BookCard from '../Library/BookCard.vue';
import Modal from '../Modal.vue';
import FilterBar from './FilterBar.vue';

const props = defineProps({
  category: String,
  listType: {
    type: String,
    default: 'popular'
  }
});

// Add at the start of the component
const loading = ref(true);

// Add this helper function at the start of the script
const sortBooksAlphabetically = (books) => {
  return [...books].sort((a, b) => a.Title.localeCompare(b.Title));
};

onMounted(async () => {
  try {
    await store.dispatch('books/fetchBookDetails');
    filteredBooks.value = sortBooksAlphabetically(Object.values(store.state.books.bookDetails));
  } catch (error) {
    console.error('Error loading books:', error);
  } finally {
    loading.value = false;
  }
});

// Store
const store = useStore();

// Get all books from bookDetails state
const books = computed(() => {
  const bookDetails = store.state.books.bookDetails;
  return Object.values(bookDetails);
});

// Add new refs for filtering
const searchQuery = ref('');
const selectedCategory = ref('');
const sortOrder = ref('');

// Replace the computed filteredBooks with a ref
const filteredBooks = ref([]);

// Pagination
const currentPage = ref(1);
const itemsPerPage = 20;

const paginatedBooks = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  return [...filteredBooks.value]
    .slice(start, start + itemsPerPage);
});

const totalPages = computed(() => Math.ceil(filteredBooks.value.length / itemsPerPage));

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
};

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
    scrollToTop();
  }
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
    scrollToTop();
  }
};

const goToPage = (page) => {
  currentPage.value = page;
  scrollToTop();
};

// Modal
const selectedBook = ref({});
const isModalOpen = ref(false);

const openModal = (book) => {
  selectedBook.value = book;
  isModalOpen.value = true;
};

const closeModal = () => {
  selectedBook.value = {};
  isModalOpen.value = false;
};

// Filter handlers
const handleSearch = (filters) => {
  let result;
  
  // Get initial book set based on career
  if (filters.career) {
    switch (filters.career) {
      case 'ADM':
        result = [...store.state.books.systemsBooks];
        break;
      case 'ISC':
        result = [...store.state.books.systemsBooks];
        break;
      case 'IND':
        result = [...store.state.books.industrialBooks];
        break;
      case 'IGE':
        result = [...store.state.books.businessManagementBooks];
        break;
      case 'MEC':
        result = [...store.state.books.mechanicBooks];
        break;
      case 'ENR':
        result = [...store.state.books.renewableEnergyBooks];
        break;
      case 'LOG':
        result = [...store.state.books.logisticsBooks];
        break;
      case 'MAT':
        result = [...store.state.books.materialsBooks];
        break;
      case 'MCT':
        result = [...store.state.books.mechatronicsBooks];
        break;
      case 'QUI':
        result = [...store.state.books.chemistryBooks];
        break;
      case 'ELE':
        result = [...store.state.books.electricalBooks];
        break;
      case 'ETR':
        result = [...store.state.books.electronicsBooks];
        break;
      case 'CON':
        result = [...store.state.books.accountingBooks];
        break;
      case 'DES':
        result = [...store.state.books.appDevelopmentBooks];
        break;
      default:
        result = [...books.value];
    }
  } else {
    result = [...books.value];
  }
  
  // Apply text-based filters according to search type
  if (filters.title || filters.author || filters.isbn) {
    switch (filters.searchType) {
      case 'exact':
        // Exact phrase matching
        if (filters.title) {
          result = result.filter(book => 
            book.Title?.toLowerCase() === filters.title.toLowerCase()
          );
        }
        if (filters.author) {
          result = result.filter(book => 
            book.author?.toLowerCase() === filters.author.toLowerCase()
          );
        }
        if (filters.isbn) {
          result = result.filter(book => 
            book.ISBN?.toString() === filters.isbn
          );
        }
        break;
        
      case 'keywords':
      default:
        // Partial matching
        if (filters.title) {
          result = result.filter(book => 
            book.Title?.toLowerCase().includes(filters.title.toLowerCase())
          );
        }
        if (filters.author) {
          result = result.filter(book => 
            book.author?.toLowerCase().includes(filters.author.toLowerCase())
          );
        }
        if (filters.isbn) {
          result = result.filter(book => 
            book.ISBN?.toString().includes(filters.isbn)
          );
        }
        break;
    }
  }

  // Apply remaining filters
  if (filters.category) {
    result = result.filter(book => 
      book.categories?.includes(filters.category)
    );
  }
  
  // Sort alphabetically before setting filtered books
  filteredBooks.value = sortBooksAlphabetically(result);
  currentPage.value = 1;
};

const handleCategoryFilter = (category) => {
  selectedCategory.value = category;
  // Apply category filter to all books
  let result = [...books.value];
  if (category) {
    result = result.filter(book => book.categories?.includes(category));
  }
  filteredBooks.value = sortBooksAlphabetically(result);
  currentPage.value = 1;
};

const handleSort = (sortType) => {
  sortOrder.value = sortType;
  let result = [...filteredBooks.value];
  
  result.sort((a, b) => {
    switch (sortType) {
      case 'title-asc':
        return a.Title.localeCompare(b.Title);
      case 'title-desc':
        return b.Title.localeCompare(a.Title);
      case 'author-asc':
        return a.author.localeCompare(b.author);
      case 'author-desc':
        return b.author.localeCompare(a.author);
      case 'year-desc':
        return Number(b.year) - Number(a.year);
      case 'year-asc':
        return Number(a.year) - Number(b.year);
      default:
        return 0;
    }
  });
  
  filteredBooks.value = result;
  currentPage.value = 1;
};
</script>

<template>
  <div class="container py-4">
    <!-- Add FilterBar component -->
    <FilterBar
      @search="handleSearch"
      @filter-category="handleCategoryFilter"
      @sort="handleSort"
    />

    <div v-if="loading" class="text-center">
      <div class="spinner-border" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
    
    <div v-else class="row">
      <div
        class="book-column custom-book-style"
        v-for="book in paginatedBooks"
        :key="book.id"
      >

        <BookCard
          :id="book.id"
          :title="book.Title"
          :description="book.author"
          :coverImage="book.coverImage"
          @click="openModal(book)"
        />
      </div>
    </div>

    <!-- Botones de paginación -->
    <nav aria-label="Page navigation">
      <ul class="pagination justify-content-center mt-4">
        <li class="page-item" :class="{ disabled: currentPage === 1 }">
          <button class="page-link" @click="prevPage" :disabled="currentPage === 1">Anterior</button>
        </li>

        <li
          class="page-item"
          v-for="page in totalPages"
          :key="page"
          :class="{ active: currentPage === page }"
        >
          <button class="page-link" @click="goToPage(page)">
            {{ page }}
          </button>
        </li>

        <li class="page-item" :class="{ disabled: currentPage === totalPages }">
          <button class="page-link" @click="nextPage" :disabled="currentPage === totalPages">Siguiente</button>
        </li>
      </ul>
    </nav>

    <Modal :isOpen="isModalOpen" :event="selectedBook" @close="closeModal" />
  </div>
</template>

<style scoped>
.book-column {
  width: 20%; /* Se hizo para mostrar 5 libros por fila */
  margin: 0px 0px -20px 0px;
  padding: 0 10px;
  display: flex;          /* Add these properties */
  justify-content: center; /* to center the BookCard */
  align-items: center;    /* in the column */
}

@media (max-width: 1002px) {
  .book-column {
    width: 50%; /* 2 en pantallas medianas */
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

/* Add this to ensure the row is properly aligned */
.row {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  margin: 0 -10px; /* Compensate for column padding */
}

.pagination {
  display: flex;
  justify-content: center;
  gap: 0px;
  flex-wrap: wrap;
}

.page-btn {
  background-color: #0047FF;
  color: white;
  border: none;
  padding: 10px 16px;
  font-size: 16px;
  font-family: 'Nunito Sans';
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.2s;
}

.page-btn:hover:not(.active):not(:disabled) {
  background-color: #0031cc;
}

.page-btn.active {
  background-color: #001f99;
  font-weight: bold;
}

.page-btn:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}

.modal-content {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  max-width: 600px;
  width: 90%;
  position: relative;
  text-align: center;
}

.modal-image {
  width: 100%;
  height: auto;
  border-radius: 8px;
  margin-bottom: 1rem;
}

.close-button {
  position: absolute;
  top: 16px;
  right: 16px;
  background: transparent;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
}

</style>
