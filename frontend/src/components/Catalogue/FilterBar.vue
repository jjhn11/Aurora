<template>
  <div class="filter-bar">
    <div class="container-fluid">
      <!-- First row: Title - Category -->
      <div class="row g-3 mb-3">
        <div class="col-md-8">
          <div class="input-group">
            <span class="input-label">TÍTULO</span>
            <input 
              type="text" 
              v-model="filters.title"
              class="form-control" 
            />
          </div>
        </div>
        <div class="col-md-4">
          <div class="input-group">
            <span class="input-label">CATEGORÍA</span>
            <select 
              v-model="filters.category" 
              class="form-select"
            >
              <option value="">Todas las categorías</option>
              <option v-for="category in categories" :key="category" :value="category">
                {{ category }}
              </option>
            </select>
          </div>
        </div>
      </div>

      <!-- Second row: Author - Career -->
      <div class="row g-3 mb-3">
        <div class="col-md-8">
          <div class="input-group">
            <span class="input-label">AUTOR</span>
            <input 
              type="text" 
              v-model="filters.author"
              class="form-control"
            />
          </div>
        </div>
        <div class="col-md-4">
          <div class="input-group">
            <span class="input-label">CARRERA</span>
            <select 
              v-model="filters.career"
              class="form-select"
            >
              <option value="">Todas las carreras</option>
              <option value="ISC">Ing. Sistemas Computacionales</option>
              <option value="IND">Ing. Industrial</option>
              <option value="IGE">Ing. Gestión Empresarial</option>
              <option value="MEC">Ing. Mecánica</option>
              <option value="ENR">Ing. Energías Renovables</option>
              <option value="LOG">Ing. Logística</option>
              <option value="MAT">Ing. Materiales</option>
              <option value="MCT">Ing. Mecatrónica</option>
              <option value="QUI">Ing. Química</option>
              <option value="ELE">Ing. Eléctrica</option>
              <option value="ETR">Ing. Electrónica</option>
              <option value="CON">Contaduría Pública</option>
              <option value="DES">Ing. Desarrollo de Software</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Third row: ISBN - Buttons -->
      <div class="row g-3">
        <div class="col-md-8">
          <div class="input-group">
            <span class="input-label">ISBN</span>
            <input 
              type="text" 
              v-model="filters.isbn"
              class="form-control"
            />
          </div>
        </div>
        <div class="col-md-4">
          <div class="d-flex justify-content-between gap-2 h-100 align-items-center">
            <button class="btn btn-secondary flex-fill" @click="clearFilters">LIMPIAR</button>
            <button class="btn btn-primary flex-fill" @click="searchFilters">BUSCAR</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
const emit = defineEmits(['search']);

const filters = ref({
  title: '',
  author: '',
  isbn: '',
  category: '',
  career: '',
  searchType: 'keywords'
});

// Get unique categories from books
const categories = computed(() => {
  const books = Object.values(store.state.books.bookDetails);
  const allCategories = books.flatMap(book => book.categories || []);
  return [...new Set(allCategories)].sort();
});

const searchFilters = () => {
  emit('search', { ...filters.value });
};

const clearFilters = () => {
  filters.value = {
    title: '',
    author: '',
    isbn: '',
    category: '',
    career: '',
    searchType: 'keywords'
  };
  emit('search', { ...filters.value });
};
</script>

<style scoped>
.filter-bar {
  background-color: #E0E0E0;
  padding: 1.5rem;
  border-radius: 8px;
  margin-bottom: 30px;
}

.input-label {
  background-color: #0F1337;
  color: #ffffff;
  padding: 0.5rem 0.75rem;
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
  font-weight: 600;
  white-space: nowrap;
  display: flex;
  align-items: center;
  justify-content: center; /* Center text horizontally */
  font-family: 'Josefin Sans', sans-serif;
  width: 120px; /* Fixed width for all labels */
  min-width: 120px; /* Ensure minimum width */
}

.input-group .form-control,
.input-group .form-select {
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  border: 1px solid #ddd;
  font-family: 'Nunito Sans', sans-serif;
}

.input-group .form-control:focus,
.input-group .form-select:focus {
  border-color: #4251FF;
  box-shadow: 0 0 0 0.2rem rgba(66, 81, 255, 0.25);
}

.form-check-label {
  font-family: 'Nunito Sans', sans-serif;
  font-size: 0.9rem;
}

.btn-primary {
  background-color: #0047FF;
  color: #ffffff;
  border-color: #4251FF;
  font-weight: 600;
  font-family: 'Josefin Sans', sans-serif;
}

.btn-primary:hover {
  background-color: #FBE326;
  color: #000000;
  border-color: #000000;
}

.btn-secondary {
  background-color: #575757;
  color: #ffffff;
  border-color: #5A5A5A;
  font-weight: 600;
  font-family: 'Josefin Sans', sans-serif;
}

.btn-secondary:hover {
  background-color: #484848;
  border-color: #484848;
}

/* Add responsive adjustments */
@media (max-width: 768px) {
  .input-label {
    width: 100px; /* Slightly smaller on mobile */
    min-width: 100px;
  }
  
  .filter-bar {
    padding: 1rem;
  }
  
  .row {
    margin-bottom: 1rem;
  }
  
  .btn {
    width: 100%;
    margin-top: 0.5rem;
  }
  
  .form-group {
    margin-bottom: 1rem;
  }
}
</style>