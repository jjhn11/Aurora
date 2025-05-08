<script setup>
import { ref, computed, onMounted } from 'vue';
import { useStore } from 'vuex';

import FilterControls from "@/components/User/Favorites/FilterControl.vue";
import FavoriteItem from "@/components/User/Favorites/FavoriteItem.vue";

const store = useStore();
const isLoading = ref(true);
const error = ref(null);

// Get favorite books list using computed with proper null checking
const favoriteBooks = computed(() => {
  return store.getters['userData/getFavoriteBooks'] || [];
});

// Safe loading status with fallback
const loading = computed(() => {
  try {
    return store.state.user?.loading?.favorites || false;
  } catch (err) {
    console.error('Error accessing loading state:', err);
    return isLoading.value;
  }
});

// Fetch favorite books on component mount
onMounted(async () => {
  try {
    isLoading.value = true;
    await store.dispatch('userData/getFavoriteBooks');
  } catch (err) {
    error.value = 'Error loading favorites: ' + err.message;
    console.error(err);
  } finally {
    isLoading.value = false;
  }
});
</script>

<template>
  <main class="favorites-container p-5">
    <h1 class="favorites-title d-flex justify-content-center align-items-center">FAVORITOS</h1>
    <FilterControls />
    
    <div>
      <div v-if="loading" class="loading text-center my-5">
        <div class="spinner-border" role="status">
          <span class="visually-hidden">Cargando favoritos...</span>
        </div>
        <p class="mt-3">Cargando tus favoritos...</p>
      </div>
      
      <div v-else-if="error" class="alert alert-danger">
        {{ error }}
      </div>
      
      <div v-else-if="favoriteBooks.length === 0" class="text-center my-5">
        <p>No tienes libros favoritos todavía.</p>
        <router-link to="/library" class="btn btn-primary mt-3">
          Explorar libros
        </router-link>
      </div>

      <div v-else>
        <section class="favorites-list d-flex flex-column justify-content-center align-items-center">
          <FavoriteItem
            v-for="book in favoriteBooks"
            :key="book.id"
            :id="book.ISBN || book.id"
            :cover-image="book.coverImage"
            :title="book.title"
            :description="book.description"
            :addedDate="book.addedDate"
          />
        </section>
      </div>
    </div>
  </main>
</template>