<template>
    <section class="book-info-section">
      <div class="book-info-container">
        <div class="book-cover-column">
          <div class="book-cover-wrapper">
            <img :src="coverImage" class="book-cover" alt="Book cover" />
            <div class="share-container" @click="showShareModal = true">
              <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/1a6aa4f2fbb51c866a58a3dfe493a0c3472a88e6?placeholderIfAbsent=true&apiKey=e4bc752606e34419a710b790ae8468cc" class="share-icon" alt="Share" />
              <span class="share-text">Compartir</span>
            </div>
          </div>
        </div>
        <div class="book-details-column">
          <div class="book-details-content">
            <h1 class="book-title">{{ title }}</h1>
            <div class="book-content-wrapper">
              <div class="authors-list">
                <div
                  v-for="(author, index) in authors"
                  :key="index"
                  class="author-item"
                >
                  <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/1b4ae428b5763dd182022f41cb5ec6bd84117fdd?placeholderIfAbsent=true&apiKey=e4bc752606e34419a710b790ae8468cc" class="author-icon" alt="Author" />
                  <span class="author-name">{{ author }}</span>
                </div>
              </div>
              <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/202705fb95d22fa47c46c81c45d26e26b1fa2ba4?placeholderIfAbsent=true&apiKey=e4bc752606e34419a710b790ae8468cc" class="rating-stars" alt="Rating" />
              <h2 class="synopsis-heading">Sinopsis del libro</h2>
              <p class="synopsis-text">{{ synopsis }}</p>
            </div>
            <div class="action-buttons">
              <button class="action-button">RESERVAR</button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <Share v-if="showShareModal" @close="showShareModal = false"/>
  </template>
  
<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';
import { onMounted } from 'vue';
import Share from '@/components/Library/Book/Share.vue';

const store = useStore();

defineProps({
  title: {
    type: String,
    required: true,
  },
  authors: {
    type: Array,
    required: true,
  },
  coverImage: {
    type: String,
    required: true,
  },
  synopsis: {
    type: String,
    required: true,
  },
});

// Replace local ref with computed property connected to store
const showShareModal = computed({
  get() {
    return store.state.showingShareModal;
  },
  set(value) {
    store.commit('setShowingShareModal', value);
  }
});

onMounted(() => {
  showShareModal.value = false; // Initialize the modal state
});

</script>
  
  <style scoped>
  .book-info-section {
    margin-top: 30px;
  }
  
  @media (max-width: 991px) {
    .book-info-section {
      max-width: 100%;
    }
  }
  
  .book-info-container {
    width: 95%;
    display: flex;
    align-items: start;
  }
  
  @media (max-width: 991px) {
    .book-info-container {
      flex-direction: column;
      align-items: stretch;
      gap: 0px;
    }
  }
  
  .book-cover-column {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    line-height: normal;
    width: 28%;
    margin-left: 0px;
  }
  
  @media (max-width: 991px) {
    .book-cover-column {
      width: 100%;
    }
  }
  
  .book-cover-wrapper {
    display: flex;
    width: 100%;
    flex-direction: column;
    align-items: stretch;
    font-family:
      Nunito Sans,
      -apple-system,
      Roboto,
      Helvetica,
      sans-serif;
    font-size: 24px;
    color: rgba(0, 14, 50, 1);
    font-weight: 600;
    text-align: center;
  }
  
  @media (max-width: 991px) {
    .book-cover-wrapper {
      margin-top: 21px;
    }
  }
  
  .book-cover {
    aspect-ratio: 0.75;
    /* object-fit: contain;
    object-position: center; */
    max-width: 90%;
    border-radius: 10px;
    border: 1px solid rgba(0, 14, 50, 1);
  }
  
  .favorite-button {
    align-self: center;
    display: flex;
    margin-top: 36px;
    width: 363px;
    max-width: 100%;
    align-items: stretch;
    gap: 18px;
    cursor: pointer;
  }
  
  .favorite-icon {
    aspect-ratio: 1;
    object-fit: contain;
    object-position: center;
    width: 50px;
    flex-shrink: 0;
  }
  
  .favorite-text {
    font-size: 20px;
    margin-top: auto;
    margin-bottom: auto;
    flex-grow: 1;
    flex-shrink: 1;
    width: 285px;
    flex-basis: auto;
  }
  
  .book-details-column {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    line-height: normal;
    width: 72%;
    margin-left: 20px;
  }
  
  @media (max-width: 991px) {
    .book-details-column {
      width: 100%;
    }
  }
  
  .book-details-content {
    display: flex;
    margin-top: auto;
    margin-bottom: auto;
    flex-direction: column;
    align-self: stretch;
    align-items: stretch;
    font-weight: 600;
  }
  
  @media (max-width: 991px) {
    .book-details-content {
      max-width: 100%;
      margin-top: 40px;
    }
  }
  
  .book-title {
    color: rgba(0, 14, 50, 1);
    font-size: 40px;
    font-family:
      Playfair Display,
      Crimson Text,
      -apple-system,
      Roboto,
      Helvetica,
      sans-serif;
    align-self: start;
    margin: 0;
  }
  
  @media (max-width: 991px) {
    .book-title {
      max-width: 100%;
      font-size: 40px;
    }
  }
  
  .book-content-wrapper {
    display: flex;
    margin-top: 11px;
    width: 100%;
    padding-left: 8px;
    flex-direction: column;
    align-items: start;
    font-family:
      Josefin Sans,
      -apple-system,
      Roboto,
      Helvetica,
      sans-serif;
    color: rgba(0, 71, 255, 1);
  }
  
  @media (max-width: 991px) {
    .book-content-wrapper {
      max-width: 100%;
    }
  }
  
  .authors-list {
    display: flex;
    align-items: stretch;
    gap: 26px;
    font-size: 20px;
    text-align: center;
    flex-wrap: wrap;
  }
  
  .author-item {
    display: flex;
    align-items: center;
    gap: 9px;
    flex-grow: 1;
    flex-shrink: 1;
    flex-basis: auto;
  }
  
  .author-icon {
    aspect-ratio: 1;
    object-fit: contain;
    object-position: center;
    width: 30px;
    flex-shrink: 0;
  }
  
  .author-name {
    margin-top: auto;
    margin-bottom: auto;
    flex-basis: auto;
  }
  
  .rating-stars {
    aspect-ratio: 5.88;
    object-fit: contain;
    object-position: center;
    width: 259px;
    margin-top: 22px;
    max-width: 100%;
  }
  
  .synopsis-heading {
    font-size: 30px;
    margin-top: 34px;
    font-weight: 600;
  }
  
  .synopsis-text {
    color: rgba(0, 14, 50, 1);
    font-size: 20px;
    font-family:
      Nunito Sans,
      -apple-system,
      Roboto,
      Helvetica,
      sans-serif;
    align-self: stretch;
    text-align: justify;
    margin-top: 9px;
  }
  
  @media (max-width: 991px) {
    .synopsis-text {
      max-width: 100%;
    }
  }

  /* Add any additional styles here */
  .share-container {
    display: flex;
    margin-top: 19px;
    align-items: center;
    gap: 24px;
    font-family:
      Nunito Sans,
      -apple-system,
      Roboto,
      Helvetica,
      sans-serif;
    font-size: 24px;
    color: rgba(0, 14, 50, 1);
    white-space: nowrap;
    cursor: pointer;
  }
  
  @media (max-width: 991px) {
    .share-container {
      white-space: initial;
    }
  }
  
  .share-icon {
    aspect-ratio: 1;
    object-fit: contain;
    object-position: center;
    width: 50px;
    flex-shrink: 0;
  }
  
  .share-text {
    margin-top: auto;
    margin-bottom: auto;
    flex-basis: auto;
  }


  .action-buttons {
    display: flex;
    justify-content: center;
    gap: 40px 100px;
    font-family:
      Josefin Sans,
      -apple-system,
      Roboto,
      Helvetica,
      sans-serif;
    font-size: 25px;
    color: rgba(255, 255, 255, 1);
    flex-wrap: wrap;
  }
  
  @media (max-width: 991px) {
    .action-buttons {
      max-width: 100%;
    }
  }
  
  .action-button {
    align-self: stretch;
    border-radius: 20px;
    background-color: rgba(0, 71, 255, 1);
    border-color: rgba(0, 14, 50, 1);
    border-style: solid;
    border-width: 1px;
    padding: 10px 20px 10px 20px;
    gap: 10px;
    color: rgba(255, 255, 255, 1);
    font-family:
      Josefin Sans,
      -apple-system,
      Roboto,
      Helvetica,
      sans-serif;
    font-size: 25px;
    font-weight: 600;
    cursor: pointer;
  }
  </style>
  