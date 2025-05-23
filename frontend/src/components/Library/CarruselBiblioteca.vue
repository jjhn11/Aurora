<script setup>
import { ref, onMounted, computed } from 'vue';
import { useStore } from 'vuex';
import BookCard from './BookCard.vue';

// Props
const props = defineProps({
  bookSource: {
    type: String,
    default: 'popularBooks' // puede ser: 'popularBooks', 'newBooks', 'popularBooksMonth', etc.+
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
const books = computed(() => store.state.books[props.bookSource] || []); //wonito
const itemsPerSlide = ref(4);
const windowWidth = ref(window.innerWidth);

onMounted(() => {
  const updateItems = () => {
    windowWidth.value = window.innerWidth;
    if (window.innerWidth <= 768) {
      itemsPerSlide.value = 2;
    } else if(window.innerWidth >= 768 && window.innerWidth <= 1068){
      itemsPerSlide.value = 3;
    }else{
      itemsPerSlide.value = 4;
    }
  };

  updateItems();
  window.addEventListener('resize', updateItems);
  
  const carousel = document.querySelector(`#${props.carouselId}`);
  if (carousel) {
    carousel.addEventListener('slid.bs.carousel', (e) => {
      activeSlide.value = e.to;
    });
  }
});

const chunkedBooks = computed(() => {
  const size = itemsPerSlide.value;
  const chunks = [];
  for (let i = 0; i < books.value.length; i += size) {
    chunks.push(books.value.slice(i, i + size));
  }
  totalSlides.value = chunks.length;
  return chunks;
});

// Computed para determinar si es desktop
const isDesktop = computed(() => windowWidth.value >= 768);
</script>

<template>
  <div class="contenedor-carrusel container-fluid d-flex justify-content-start">
    <button
      class="custom-btn-l d-flex btn btn-link carousel-control-prev-bottom"
      type="button"
      :data-bs-target="`#${props.carouselId}`"
      data-bs-slide="prev"
      v-if="chunkedBooks.length > 1"
    >
      <i class="bi bi-chevron-left fs-4"></i>
    </button>
    <div :id="props.carouselId" class="carousel slide" data-bs-touch="true" data-bs-interval="false">
      <div class="carousel-inner">
        <div
          v-for="(group, index) in chunkedBooks"
          :key="index"
          class="carousel-item"
          :class="{ active: index === 0 }"
        >
          <div class="row justify-content-start">
            <div
              v-for="book in group"
              :key="book.ISBN"
              :class="isDesktop ? 'custom-col carousel-item-col' : 'custom-col'"
            >
              <BookCard
                :id="book.ISBN"
                :cover-image="book.coverImage"
                :title="book.Title"
                :description="book.category"
                :fixed-size="true"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <button
      class="d-flex custom-btn-r btn btn-link carousel-control-next-bottom"
      type="button"
      :data-bs-target="`#${props.carouselId}`"
      data-bs-slide="next"
      v-if="chunkedBooks.length > 1"
    >
      <i class="bi bi-chevron-right fs-4"></i>
    </button>
  </div>
  <div class="custom-slider-bar" v-if="props.showSlider">
    <div class="custom-slider-thumb" :style="{ left: `${(activeSlide / (totalSlides - 1)) * 100}%` }"></div>
  </div>
</template>


<style scoped>
.carousel-item-col{
  min-height: 530px;
  min-width: 263px;
}
.custom-btn-l,
.custom-btn-r {
  position: absolute;
  top: 30%;
  transform: translateY(-50%);
  background-color: rgba(255, 255, 255, 0.8);
  border: none;
  padding: 10px;
  border-radius: 50%;
  z-index: 10;
}

.custom-btn-l {
  left: -3%;
}

.custom-btn-r {
  right: -3%;
}
.custom-col {
  flex: 0 0 auto;
  width: 25%;
  padding: 0 10px;
  box-sizing: border-box;
}
@media (max-width: 1468px) {
  .carousel-item-col{
    min-height: 430px;
    min-width: 153px;
  }
}
/*@media (max-width: 1368px) {
  .carousel-item-col{
    min-height: 430px;
    min-width: 183px;
  }
}*/
@media (max-width: 1068px) {
  .custom-btn-r {
  right: 2%;
}
  .custom-col {
    width: calc(33.333% - 20px); /* 3 elementos por fila */
  }
  .carousel-item-col{
    min-height: 430px;
    min-width: 183px;
  }
}

@media (max-width: 768px) {
  .custom-col {
    width: calc(50% - 10px); /* 2 elementos por fila */
    min-width: 170px;
    min-height: 380px;
    margin: 0 5px;
  }
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
  width: 85%;
  max-width: 1300px;
  min-height: 600px;
  height: auto;
  margin: 0;
  margin-bottom: 10px;
  padding: 0 20px;
}

.carousel {
  position: relative;
}

.carousel-item .row {
  flex-wrap: wrap;
  width: auto;
  margin: 15px auto;
}


.carousel-control-prev,
.carousel-control-next {
  display: none;
}
@media (max-width: 768px) {
  .custom-btn-r {
    right: -3%;
  }
  .contenedor-carrusel {
    padding-left: 15px !important;
  }
  .contenedor-carrusel {
    width: 100% !important;
    height: 470px; 
    min-height: unset; /* why */
    padding: 0px;
    margin-bottom: 5px;
    padding-left: 5%;
  }

  .custom-col {
    width: 45% !important;
    margin: 0 5px;
  }

  .carousel-item .row {
    flex-wrap: nowrap;
    width: 100%;
  }
}

</style>