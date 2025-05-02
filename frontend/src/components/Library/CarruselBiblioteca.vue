<script setup>
import { ref, onMounted, computed } from 'vue';
import { useStore } from 'vuex';
import BookCard from './BookCard.vue';

// Props
const props = defineProps({
  bookSource: {
    type: String,
    default: 'popularBooks' // puede ser: 'popularBooks', 'newBooks', 'popularBooksMonth', etc.
  },
  carouselId: {
    type: String,
    required: true
  },
  showSlider: {
    type: Boolean,
    default: false
  }
});


const activeSlide = ref(0);
const totalSlides = ref(3);

const store = useStore();

// Selección dinámica de libros desde Vuex
const books = computed(() => {
  return store.state.books[props.bookSource] || [];
});


onMounted(() => {
  const carousel = document.querySelector(`#${props.carouselId}`);
  if (carousel) {
    carousel.addEventListener('slid.bs.carousel', (e) => {
      activeSlide.value = e.to;
    });
  }
});


const chunkedBooks = computed(() => {
  const size = 5;
  const chunks = [];
  for (let i = 0; i < books.value.length; i += size) {
    chunks.push(books.value.slice(i, i + size));
  }
  totalSlides.value = chunks.length;
  return chunks;
});

</script>


<template>
  <div class="contenedor-carrusel container-fluid d-flex justify-content-center">
    <button class="custom-btn-l btn btn-link carousel-control-prev-bottom" type="button" :data-bs-target="`#${carouselId}`" data-bs-slide="prev">
      <i class="bi bi-chevron-left fs-4"></i>
    </button>
    
    <div :id="carouselId" class="carousel slide">
      <div class="carousel-inner">
        <div v-for="(group, index) in chunkedBooks" :key="index" class="carousel-item" :class="index === 0 ? 'active' : ''">
          <div class="row justify-content-center">
            <div v-for="book in group" :key="book.ISBN" class="custom-col col-sm-6 col-md-4">
              <BookCard
                :id="book.ISBN"
                :cover-image="book.coverImage"
                :title="book.Title"
                :description="book.category"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <button class="custom-btn-r btn btn-link carousel-control-next-bottom" type="button" :data-bs-target="`#${carouselId}`" data-bs-slide="next">
      <i class="bi bi-chevron-right fs-4"></i>
    </button>
  </div>

  <div class="custom-slider-bar" v-if="showSlider">
    <div class="custom-slider-thumb" :style="{ left: `${(activeSlide / (totalSlides - 1)) * 100}%` }"></div>
  </div>
</template>


<style scoped>
.custom-btn-l,
.custom-btn-r {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: rgba(255, 255, 255, 0.8);
  border: none;
  padding: 10px;
  border-radius: 50%;
  z-index: 10;
}

.custom-btn-l {
  left: 10px;
}

.custom-btn-r {
  right: 1%;
}
.custom-col {
  width: 15%;
  padding: 0 10px;
}
.custom-slider-bar {
  position: relative;
  height: 6px;
  width: 60%;
  margin: 10px auto 0 auto;
  background-color: #d0d0d0;
  border-radius: 5px;
  overflow: hidden;
  margin-bottom: 20px;
}

.custom-slider-thumb {
  position: absolute;
  top: -7px;
  width: 33%;
  height: 18px;
  background-color: #007bff;
  border-radius: 50%;
  transition: left 0.3s ease;
  transform: translateX(-50%);
}

.contenedor-carrusel {
  position: relative;
  width: 1306px;
  height: 391px;
}
.carousel {
  position: relative;
}
.carousel-inner {
  display: flex;
}
.carousel-item {
  margin: 0 auto;
  padding: 20px 10px;
}

.carousel-item .row {
  flex-wrap: nowrap;
  width: 1500px;
  justify-content: center;
  margin: 15px auto;
}

.carousel-control-prev,
.carousel-control-next {
  display: none;
}

</style>