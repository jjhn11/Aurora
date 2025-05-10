<script setup>
import { ref, computed } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

const store = useStore();
const router = useRouter();
const searchQuery = ref('');
const showResults = ref(false);

// Get all books from store and filter them based on search query
const searchResults = computed(() => {
  if (!searchQuery.value) return [];
  
  // Get all books from bookDetails object
  const allBooks = Object.values(store.state.books.bookDetails);
  
  return allBooks.filter(book => 
    book.Title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    book.author.toLowerCase().includes(searchQuery.value.toLowerCase())
  ).slice(0, 5); // Limit to 5 results
});

const handleSearch = () => {
  if (searchQuery.value.trim()) {
    showResults.value = true;
  }
};

const handleBookClick = (bookId) => {
  router.push(`/biblioteca/libro/${bookId}`);
  searchQuery.value = '';
  showResults.value = false;
};

const handleClickOutside = (event) => {
  if (!event.target.closest('.search-container')) {
    showResults.value = false;
  }
};
</script>

<template>
    <div class="search-container" @click.stop>
        <div class="search-bar-container">
            <h2 class="search-bar-title">¡El conocimiento está al alcance de tus manos!</h2>
            <div class="search-bar">
                <button class="search-button" @click="handleSearch">
                    <i class="bi bi-search"></i>
                </button>
                <input
                    v-model="searchQuery"
                    type="text"
                    placeholder="Buscar artículos, libros, publicaciones y más..."
                    class="search-input"
                    @input="handleSearch"
                    @focus="showResults = true"
                />
            </div>
        </div>

        <!-- Search Results -->
        <div v-if="showResults && searchResults.length > 0" class="search-results">
            <div
                v-for="book in searchResults"
                :key="book.id"
                class="search-result-item"
                @click="handleBookClick(book.ISBN)"
            >
                <img :src="book.coverImage" :alt="book.Title" class="result-image" />
                <div class="result-info">
                    <h3 class="result-title">{{ book.Title }}</h3>
                    <p class="result-author">{{ book.author }}</p>
                </div>
            </div>
        </div>

        <div v-else-if="showResults && searchQuery && !searchResults.length" class="no-results">
            No se encontraron resultados para "{{ searchQuery }}"
        </div>
    </div>
</template>

<style scoped>
.search-bar-container {
    text-align: center;
    margin-top: 70px;
    margin-bottom: 70px;
}
.search-bar-title {
    font-family: "Nunito Sans", sans-serif;
    font-size: 1.1rem;
    font-weight: bold;
    color: #000E32;
    margin-bottom: 1rem;
}

.search-bar {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
}

.search-input {
    width: 70%;
    padding: 0.75rem 1rem;
    border: 1px solid #ccc;
    border-radius: 0.5rem;
    font-size: 1.1rem;
    padding-left: 6%; /* Add space for the button */
}

.search-button {
    position: absolute; /* Position the button inside the input */
    left: 16%; /* Adjust based on the input width */
    background-color: transparent;
    color: #3366cc;
    border: none;
    padding: 0.5rem;
    border-radius: 50%;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 2.5rem;
    width: 2.5rem;
}

.search-button i {
    font-size: 1.25rem;
    font-weight: 900;
}

.search-container {
    position: relative;
    width: 100%;
    z-index: 1000;
}

.search-results {
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    width: 70%;
    max-height: 400px;
    overflow-y: auto;
    background: white;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    margin-top: 8px;
}

.search-result-item {
    display: flex;
    align-items: center;
    padding: 12px 16px;
    cursor: pointer;
    transition: background-color 0.2s;
}

.search-result-item:hover {
    background-color: #f5f5f5;
}

.result-image {
    width: 50px;
    height: 70px;
    object-fit: cover;
    margin-right: 16px;
    border-radius: 4px;
}

.result-info {
    flex: 1;
}

.result-title {
    font-family: "Nunito Sans", sans-serif;
    font-size: 1rem;
    font-weight: 600;
    color: #000E32;
    margin: 0;
}

.result-author {
    font-family: "Nunito Sans", sans-serif;
    font-size: 0.9rem;
    color: #666;
    margin: 4px 0 0;
}

.no-results {
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    width: 70%;
    padding: 16px;
    background: white;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    margin-top: 8px;
    text-align: center;
    font-family: "Nunito Sans", sans-serif;
    color: #666;
}

@media (max-width: 768px) {
  .search-bar-container {
    text-align: center;
    margin-top: 5px;
    margin-bottom: 90px;
}
  .search-bar-title {
    font-size: 1.3rem;
    padding: 0 15px;
  }

  .search-input {
    width: 90%;
    font-size: 1rem;
    padding: 0.6rem 1rem;
    padding-left: 8%;
  }

  .search-button {
    left: 6%;
    height: 2rem;
    width: 2rem;
  }

  .search-button i {
    font-size: 1rem;
  }

  .search-results,
  .no-results {
      width: 90%;
  }

  .result-title {
      font-size: 0.9rem;
  }

  .result-author {
      font-size: 0.8rem;
  }
}

@media (max-width: 480px) {
  .search-bar-title {
    font-size: 1.1rem;
  }

  .search-input {
    width: 95%;
    font-size: 0.9rem;
  }

  .search-button {
    left: 3%;
  }
}
</style>