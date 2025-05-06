<script setup>
import { ref, computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import Card from './Card.vue';
import Modal from '../Modal.vue';
const props = defineProps({
  category: String
});

// Store
const store = useStore();
const loading = ref(true);
const error = ref(null);

// Cargar eventos al montar el componente
onMounted(async () => {
  try {
    loading.value = true;
    await store.dispatch('events/loadInitialData');
  } catch (err) {
    error.value = err.message || 'Error al cargar eventos';
    console.error('Error al cargar eventos:', err);
  } finally {
    loading.value = false;
  }
});

// Obtener categorías
const categories = computed(() => store.getters['events/getAllCategories'] || []);

// Encontrar el ID de categoría basado en el nombre pasado como prop
const categoryId = computed(() => {
  if (!props.category) return null;
  
  const category = categories.value.find(
    cat => cat.Event_name?.toLowerCase() === props.category.toLowerCase()
  );
  
  return category ? category.Id_category : null;
});

// Eventos filtrados por categoría pasada como prop
const filteredEvents = computed(() => {
  if (categoryId.value) {
    return store.getters['events/getEventsByCategory'](categoryId.value);
  } else {
    return store.getters['events/getAllEvents'];
  }
});

//Paginación
const currentPage = ref(1);
const itemsPerPage = 9; // 3x3 grid

const prevPage = () => {
  if (currentPage.value > 1) currentPage.value--;
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) currentPage.value++;
};

const goToPage = (page) => {
  currentPage.value = page;
};

// Paginación filtrada
const paginatedFilteredEvents = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  return filteredEvents.value.slice(start, start + itemsPerPage);
});

// Total de páginas filtrada
const totalPages = computed(() => Math.ceil(filteredEvents.value.length / itemsPerPage));

// Estado del Modal
const selectedEvent = ref({});
const isModalOpen = ref(false);

const openModal = (event) => {
  selectedEvent.value = event;
  isModalOpen.value = true;
};

const closeModal = () => {
  selectedEvent.value = {};
  isModalOpen.value = false;
};

</script>

<template>
  <div v-if="loading" class="text-center my-5">
    <div class="spinner-border text-primary" role="status">
      <span class="visually-hidden">Cargando...</span>
    </div>
  </div>
  
  <div v-else-if="error" class="alert alert-danger my-5">
    {{ error }}
  </div>
  
  <div v-else>
    <div v-if="filteredEvents.length === 0" class="empty-state-container">
      <img src="@/assets/img/events/school-event-1.jpg" alt="Sin eventos" class="empty-state-image">
      <h2 class="empty-state-title">No hay eventos disponibles</h2>
      <p class="empty-state-text">No encontramos eventos para mostrar en esta categoría.</p>
      <p class="empty-state-suggestion">Intenta buscar en otra categoría o vuelve más tarde.</p>
      <router-link to="/" class="btn btn-primary mt-4">Regresar al inicio</router-link>
    </div>
    
    <div v-else class="container py-4">
      <div class="row">
        <div
  class="event-column mb-4"
  v-for="event in paginatedFilteredEvents"
  :key="event.id"
>
  <Card
    :title="event.title"
    :date="event.date"
    :description="event.description"
    :image="event.image"
    @click="openModal(event)"
  />
</div>

      </div>
      
      <!-- Paginación -->
      <nav aria-label="Page navigation" v-if="totalPages > 1">
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
    </div>
  <Modal :isOpen="isModalOpen" :event="selectedEvent" @close="closeModal" />
</template>
  

<style scoped>
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
.event-column {
  width: 100%;
}
.row {
  display: flex;
  flex-wrap: wrap;
  margin-left: -0.5rem;
  margin-right: -0.5rem;
  align-items: stretch;
}

.event-column {
  width: 33.3333%;
  padding: 0 0.5rem;
  display: flex;
}

@media (max-width: 776px) {
  .event-column {
    width: 33.3333%;
    padding: 0 3.5%;
  }
}
</style>
