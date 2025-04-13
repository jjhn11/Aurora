<script setup>
import { ref, onMounted } from 'vue';
import { useStore } from 'vuex';
import BookCard from './BookCard.vue';

// Setup reactive state
const activeSlide = ref(0);
const totalSlides = ref(3);
const store = useStore();

// Get popular books from store
const books = store.state.books?.popularBooks;

// Setup carousel event handling
onMounted(() => {
  const carousel = document.querySelector('#carrusel2');
  if (carousel) {
    carousel.addEventListener('slid.bs.carousel', (e) => {
      activeSlide.value = e.to;
    });
  }
});
</script>

<template>
  <div class="contenedor-carrusel container-fluid d-flex justify-content-center">
    <button class="btn btn-link carousel-control-prev-bottom" type="button" data-bs-target="#carrusel2" data-bs-slide="prev">
      <i class="bi bi-chevron-left fs-4"></i>
    </button>
    <div id="carrusel2" class="carousel">
        <div class="carousel-inner">
            <div class="carousel-item active">
                <div class="row justify-content-center">
                    <div class="col-12 col-sm-6 col-md-4">
                        <BookCard
                            :id="books[0].ISBN"
                            :cover-image="books[0].coverImage"
                            :title="books[0].Title"
                            :description="books[0].category"
                        />
                    </div>
                    <div class="col-12 col-sm-6 col-md-4">
                        <BookCard
                            :id="books[1].ISBN"
                            :cover-image="books[1].coverImage"
                            :title="books[1].Title"
                            :description="books[1].category"
                        />
                    </div>
                    <div class="col-12 col-sm-6 col-md-4">
                        <BookCard
                            :id="books[2].ISBN"
                            :cover-image="books[2].coverImage"
                            :title="books[2].Title"
                            :description="books[2].category"
                        />
                    </div>
                </div>
            </div>
            <div class="carousel-item">
                <div class="row justify-content-center">
                    <div class="col-12 col-sm-6 col-md-4">
                        <BookCard
                            :id="books[3].ISBN"
                            :cover-image="books[3].coverImage"
                            :title="books[3].Title"
                            :description="books[3].category"
                        />
                    </div>
                    <div class="col-12 col-sm-6 col-md-4">
                        <BookCard
                            :id="books[4].ISBN"
                            :cover-image="books[4].coverImage"
                            :title="books[4].Title"
                            :description="books[4].category"
                        />
                    </div>
                    <div class="col-12 col-sm-6 col-md-4">
                        <BookCard
                            :id="books[5].ISBN"
                            :cover-image="books[5].coverImage"
                            :title="books[5].Title"
                            :description="books[5].category"
                        />
                    </div>
                </div>
            </div>
            <div class="carousel-item">
                <div class="row justify-content-center">
                    <div class="col-12 col-sm-6 col-md-4">
                        <BookCard
                            :id="books[6].ISBN"
                            :cover-image="books[6].coverImage"
                            :title="books[6].Title"
                            :description="books[6].category"
                        />
                    </div>
                    <div class="col-12 col-sm-6 col-md-4">
                        <BookCard
                            :id="books[7].ISBN"
                            :cover-image="books[7].coverImage"
                            :title="books[7].Title"
                            :description="books[7].category"
                        />
                    </div>
                    <div class="col-12 col-sm-6 col-md-4">
                        <BookCard
                            :id="books[8].ISBN"
                            :cover-image="books[8].coverImage"
                            :title="books[8].Title"
                            :description="books[8].category"
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>
    <button class="btn btn-link carousel-control-next-bottom" type="button" data-bs-target="#carrusel2" data-bs-slide="next">
      <i class="bi bi-chevron-right fs-4"></i>
    </button>
  </div>
  <div class="custom-slider-bar">
    <div class="custom-slider-thumb" :style="{ left: `${(activeSlide / (totalSlides - 1)) * 100}%` }"></div>
  </div>
</template>

<style scoped>
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
  width: 83%;
}

.carousel {
  position: relative;
  padding-bottom: 30px;
}

.carousel-item {
  margin: 0 auto;
  padding: 20px 10px;
}

.carousel-item .row {
  flex-wrap: nowrap;
  max-width: 1600px;
  justify-content: center;
  margin: 15px auto;
}

.carousel-control-prev,
.carousel-control-next {
  display: none;
}
</style>