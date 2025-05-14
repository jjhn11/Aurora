<template>
  <div class="filter-bar">
    <div class="search-container">
      <input 
        type="text" 
        v-model="searchQuery"
        placeholder="Buscar por título o autor..."
        class="search-input"
        @input="$emit('search', searchQuery)"
      />
    </div>
    
    <div class="filters">
      <select 
        v-model="selectedCategory" 
        class="filter-select"
        @change="$emit('filter-category', selectedCategory)"
      >
        <option value="">Todas las categorías</option>
        <option v-for="category in categories" :key="category" :value="category">
          {{ category }}
        </option>
      </select>

      <select 
        v-model="sortBy" 
        class="filter-select"
        @change="$emit('sort', sortBy)"
      >
        <option value="">Ordenar por</option>
        <option value="title-asc">Título A-Z</option>
        <option value="title-desc">Título Z-A</option>
        <option value="author-asc">Autor A-Z</option>
        <option value="author-desc">Autor Z-A</option>
        <option value="year-desc">Más recientes</option>
        <option value="year-asc">Más antiguos</option>
      </select>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
const searchQuery = ref('');
const selectedCategory = ref('');
const sortBy = ref('');

// Get unique categories from books
const categories = computed(() => {
  const books = Object.values(store.state.books.bookDetails);
  const allCategories = books.flatMap(book => book.categories || []);
  return [...new Set(allCategories)].sort();
});
</script>

<style scoped>
.filter-bar {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 30px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.search-container {
  margin-bottom: 15px;
}

.search-input {
  width: 100%;
  padding: 10px 15px;
  border: 2px solid #0047FF;
  border-radius: 8px;
  font-family: 'Nunito Sans', sans-serif;
  font-size: 16px;
}

.filters {
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
}

.filter-select {
  flex: 1;
  min-width: 200px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-family: 'Nunito Sans', sans-serif;
  background-color: white;
  cursor: pointer;
}

@media (max-width: 768px) {
  .filters {
    flex-direction: column;
  }
  
  .filter-select {
    width: 100%;
  }
}
</style>