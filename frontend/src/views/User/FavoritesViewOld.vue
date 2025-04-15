
<script setup>
import { computed, onMounted } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

// Get favorite books list
const favoriteBooks = computed(() => store.getters['user/getFavoriteBooks']);
const loading = computed(() => store.state.user.loading.favorites);

// Fetch favorite books on component mount
onMounted(async () => {
  await store.dispatch('user/fetchFavoriteBooks');
});

</script>

<template>
  <div>
    <h2>Mis Libros Favoritos</h2>
    
    <div v-if="loading" class="loading">
      Cargando favoritos...
    </div>
    
    <div v-else class="favorites-grid">
      <div v-for="book in favoriteBooks" :key="book.id" class="favorite-book">
        <img :src="book.coverImage" :alt="book.title" class="book-cover" />
        <h3>{{ book.title }}</h3>
        <p>{{ book.author }}</p>
        <p class="added-date">Añadido: {{ book.addedDate }}</p>
        <button @click="removeFromFavorites(book.id)" class="remove-btn">
          Eliminar de favoritos
        </button>
      </div>
    </div>
  </div>
</template>