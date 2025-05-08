<script setup>
import { ref, computed } from 'vue';
import { useStore } from 'vuex';
import BookCard from '../Library/BookCard.vue';
import Modal from '../Modal.vue';

const props = defineProps({
  category: String,
  listType: {
    type: String,
    default: 'popular'
  }
});

// Store
const store = useStore();

// arreglo que combina ambas categorias
const books = computed(() => {
  return [
    ...store.state.books.popularBooks,
    ...store.state.books.newBooks
  ];
});


// Filtrar libros por categoría si se especifica
const filteredBooks = computed(() => {
  if (!props.category) return books.value;
  return books.value.filter(book => book.category === props.category);
});


// Paginación
const currentPage = ref(1);
const itemsPerPage = 20;

const totalPages = computed(() => Math.ceil(filteredBooks.value.length / itemsPerPage));

const paginatedBooks = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  return filteredBooks.value.slice(start, start + itemsPerPage);
});

const prevPage = () => {
  if (currentPage.value > 1) currentPage.value--;
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) currentPage.value++;
};

const goToPage = (page) => {
  currentPage.value = page;
};

// Modal
const selectedBook = ref({});
const isModalOpen = ref(false);

const openModal = (book) => {
  selectedBook.value = book;
  isModalOpen.value = true;
};

const closeModal = () => {
  selectedBook.value = {};
  isModalOpen.value = false;
};
</script>

<template>
  <div class="container py-4">
    <div class="row">
      <div
        class="book-column mb-4 custom-book-style"
        v-for="book in paginatedBooks"
        :key="book.id"
      >

        <BookCard
          :id="book.id"
          :title="book.Title"
          :description="book.author"
          :coverImage="book.coverImage"
          @click="openModal(book)"
        />
      </div>
    </div>

    <!-- Botones de paginación -->
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

    <Modal :isOpen="isModalOpen" :event="selectedBook" @close="closeModal" />
  </div>
</template>

  

<style scoped>
.book-column {
  width: 20%; /* Se hizo para mostrar 5 libros por fila */
  padding: 0 10px;
}
@media (max-width: 1002px) {
  .book-column {
    width: 50%; /* 2 en pantallas medianas */
  }
}
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

</style>
