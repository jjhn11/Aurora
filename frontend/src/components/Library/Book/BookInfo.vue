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
              <button 
                class="action-button" 
                @click="showForm = true"
                :disabled="!isAuthenticated"
              >
                RESERVAR
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <Share 
      v-if="showShareModal" 
      @close="showShareModal = false"
    />
    <BookForm 
      v-model="showForm" 
      @form-sent-success="handleFormSuccess" 
      :bookId="bookId" 
      @close="handleFormClose" 
    />
  </template>
  
<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';
import { onMounted } from 'vue';
import { watch } from 'vue';
import { ref } from 'vue';
import Share from '@/components/Library/Book/Share.vue';
import BookForm from '@/components/Library/Book/BookForm.vue';

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
  bookId: {
    type: String,
    required: true,
  },
});

// SHARE
// computed property connected to store
const showShareModal = computed({
  get() {
    return store.state.showingShareModal;
  },
  set(value) {
    store.commit('setShowingShareModal', value);
  }
});


// BOOK FORM
const showForm = ref(false);

const handleFormSuccess = () => {
  showForm.value = false;
};

const handleFormClose = () => {
  showForm.value = false;
};

// More robust authentication check
const isAuthenticated = computed(() => {
  const authState = store.state.user;
  return !!(authState && authState.isAuthenticated && authState.userData);
});

// Watch for auth state changes
watch(
  () => store.state.user,
  (newUserState) => {
    if (!newUserState || !newUserState.isAuthenticated) {
      // Handle logout - close any open forms
      showForm.value = false;
    }
  },
  { deep: true } // Watch nested properties
);

// ON MOUNTED
onMounted(() => {
  showShareModal.value = false; // Initialize the modal state
  // Check initial auth state
  const authState = store.state.user;
  if (!authState || !authState.isAuthenticated) {
    showForm.value = false;
  }
});

</script>
  
  <style scoped>
  .book-info-section {
    margin-top: 30px;
  }

  @media (max-width: 991px) {
    .book-info-section {
      max-width: 100%;
      margin-top: 10px;
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
    line-height: normal;
    width: 28%;
    margin-left: 0px;
  }
  @media (max-width: 991px) {
    .book-cover-column {
      width: 100%;
      padding-left: 15px;
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
      justify-content: center;
      align-items: center;
    }
  }
  
  .book-cover {
    aspect-ratio: 0.75;
    /* object-fit: contain;
    object-position: center; */
    max-width: 90%;
    height: auto;
    border-radius: 10px;
    border: 1px solid rgba(0, 14, 50, 1);
    object-fit:fill;
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
    margin-left: 0px;
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
    height: auto;
    font-size: 40px;
    font-weight: 600;
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
      font-size: 20px;
      height: 26px;
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
    margin-top: 15px;
  }
  @media (max-width: 991px) {
    .authors-list {
      width: 100%;
      flex-direction: row;
      justify-content: center;
    }
  }
  .author-item {
    display: flex;
    align-items: center;
    gap: 9px;
    flex-grow: 1;
    flex-shrink: 1;
    flex-basis: auto;
  }
  @media (max-width: 991px) {
    .author-item {
      max-width: 100%;
    }
  }
  .author-icon {
    aspect-ratio: 1;
    object-fit: contain;
    object-position: center;
    width: 25px;
    flex-shrink: 0;
  }
  
  .author-name {
    margin-top: auto;
    margin-bottom: auto;
    flex-basis: auto;
    font-size: 16px;
  }

  @media (max-width: 991px) {
    .author-name {
      font-size: 10px;
    }
  }
  
  .rating-stars {
    aspect-ratio: 5.88;
    object-fit: contain;
    object-position: center;
    width: 259px;
    margin-top: 22px;
    max-width: 100%;
  }

  @media (max-width: 991px) {
    .rating-stars {
      display: none;
    }
  }
  
  .synopsis-heading {
    font-size: 30px;
    margin-top: 34px;
    font-weight: 600;
  }
  @media (max-width: 991px) {
    .synopsis-heading {
      display: none;
    }
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
    margin-bottom: 10%;
  }
  
  @media (max-width: 991px) {
    .synopsis-text {
      max-width: 100%;
      font-size: 14px;
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
      font-size: 19px;
      gap: 5px;
      justify-content: center;
      align-content: center;
    }
  }
  
  .share-icon {
    aspect-ratio: 1;
    object-fit: contain;
    object-position: center;
    width: 50px;
    flex-shrink: 0;
  }
  @media (max-width: 991px) {
    .share-icon {
      width: 30px;
    }
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
    transition: all 0.3s ease; /* Add smooth transition */

    
  }

.action-button:hover:not(:disabled) {
  background-color: #FBE326;
  color: #000E32;
  border-color: #FBE326;
}

.action-button:disabled {
  background-color: #cccccc;
  border-color: #999999;
  color: #666666;
  cursor: not-allowed;
  opacity: 0.7;
}
  </style>
