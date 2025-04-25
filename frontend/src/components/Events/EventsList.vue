<script setup>
import { ref, computed } from 'vue';
import { useStore } from 'vuex';
import Card from './Card.vue';

const props = defineProps({
  category: String
});
// Store
const store = useStore();
const events = store.state.events?.events || [];

//Paginación
const currentPage = ref(1);
const itemsPerPage = 9; // 3 3

const prevPage = () => {
  if (currentPage.value > 1) currentPage.value--;
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) currentPage.value++;
};

const goToPage = (page) => {
  currentPage.value = page;
};

// Eventos filtrados por categoría pasada como prop
const filteredEvents = computed(() => {
  if (!props.category) return events;
  return events.filter(event => event.category === props.category);
});

// Paginación filtrada
const paginatedFilteredEvents = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  return filteredEvents.value.slice(start, start + itemsPerPage);
});

// Total de páginas filtrada
const totalPages = computed(() => Math.ceil(filteredEvents.value.length / itemsPerPage));

</script>

<template>
    <div class="container py-4">
      <div class="row">
        <div
          class="col-12 col-md-6 col-lg-4 mb-4"
          v-for="event in paginatedFilteredEvents"
          :key="event.id"
        >
          <Card
            :title="event.title"
            :date="event.date"
            :description="event.description"
            :image="event.image"
          />
        </div>
      </div>

  
      <!-- Botones -->
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
    </div>
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
</style>
