<script setup>

  import { computed, onMounted } from 'vue';
  import { useStore } from 'vuex';

  import FilterControls from "@/components/User/Favorites/FilterControl.vue";
  import FavoriteItem from "@/components/User/Favorites/FavoriteItem.vue";

  const store = useStore();
  
  const books = store.state.user?.favoriteBooks;

  // Get favorite books list
  const favoriteBooks = computed(() => store.getters['user/getFavoriteBooks']);
  const loading = computed(() => store.state.user.loading.favorites);

  // Fetch favorite books on component mount
  onMounted(async () => {
    await store.dispatch('user/fetchFavoriteBooks');
  });

</script>



<template>

  <main class="favorites-container p-5">

    <h1 class="favorites-title d-flex justify-content-center align-items-center">FAVORITOS</h1>
    <FilterControls />
    
    <div>
      
      <div v-if="loading" class="loading">
        Cargando favoritos...
      </div>

      <div v-else>
      
        <section class="favorites-list d-flex justify-content-center align-items-center">
          
          <FavoriteItem
            :id="books[0].ISBN"
            :cover-image="books[0].coverImage"
            :title="books[0].title"
            :description="books[0].description"
            :addedDate="books[0].addedDate"
          />

          <FavoriteItem
            :id="books[1].ISBN"
            :cover-image="books[1].coverImage"
            :title="books[1].title"
            :description="books[1].description"
            :addedDate="books[1].addedDate"
          />

          <FavoriteItem
            :id="books[2].ISBN"
            :cover-image="books[2].coverImage"
            :title="books[2].title"
            :description="books[2].description"
            :addedDate="books[2].addedDate"
          />

          <FavoriteItem
            :id="books[3].ISBN"
            :cover-image="books[3].coverImage"
            :title="books[3].title"
            :description="books[3].description"
            :addedDate="books[3].addedDate"
          />

        </section>

      </div>
    </div>

  </main>

</template>



<style scoped>

  .favorites-container {
    background-color: #ffffff;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    align-items: center;
  }

  .favorites-title {
    color: #000000;
    font-size: 80px;
    font-family:
      "Crimson Text",
      -apple-system,
      Roboto,
      Helvetica,
      sans-serif;
    font-weight: 400;
    letter-spacing: 1.6px;
    margin-top: 79px;
  }

  .favorites-list {
    width: 100%;
    max-width: 1320px;
    display: flex;
    flex-direction: column;
    gap: 137px;
    margin-top: 135px;
  }

  @media (max-width: 991px) {
    .favorites-title {
      max-width: 100%;
      margin-top: 40px;
      font-size: 40px;
    }

    .favorites-list {
      gap: 40px;
      margin-top: 40px;
    }
  }

</style>