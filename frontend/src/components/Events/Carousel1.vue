<script setup>
import { ref, onMounted } from 'vue';
import { useStore } from 'vuex';
import Card from './Card.vue';
import Modal from '../Modal.vue';
// Setup reactive state
const activeSlide = ref(0);
const totalSlides = ref(3);
const store = useStore();

// Get popular books from store
const events = store.state.events?.events;

// Setup carousel events handling
onMounted(() => {
  const carousel = document.querySelector('#carrusel1');
  if (carousel) {
    carousel.addEventListener('slid.bs.carousel', (e) => {
      activeSlide.value = e.to;
    });
  }
});

// Estado del Modal
const selectedEvent = ref({});
const isModalOpen = ref(false);

const openModal = (event) => {
  selectedEvent.value = event;
  isModalOpen.value = true;
};

const closeModal = () => {
  selectedEvent.value = {};
  isModalOpen.value = false;
};

</script>

<template>
    <div class="contenedor-carrusel container-fluid d-flex justify-content-center">
        <button class="btn btn-link carousel-control-prev-bottom" type="button" data-bs-target="#carrusel1" data-bs-slide="prev">
            <i class="bi bi-chevron-left fs-4"></i>
        </button>
        <div id="carrusel1" class="carousel">
            <div class="carousel-inner">
                <div class="carousel-item active">
                    <div class="row justify-content-center">
                        <div class="col-12 col-sm-6 col-md-4">
                            <Card
                               :id="events[0].id"
                               :image="events[0].image"
                               :title="events[0].title"
                               :description="events[0].description"
                               @click="openModal(events[0])"
                               />
                        </div>
                        <div class="col-12 col-sm-6 col-md-4">
                                <Card
                                :id="events[1].id"
                                :image="events[1].image"
                                :title="events[1].title"
                                :description="events[1].description"
                                @click="openModal(events[1])"
                               />
                        </div>
                        <div class="col-12 col-sm-6 col-md-4">
                            <Card
                            :id="events[2].id"
                               :image="events[2].image"
                               :title="events[2].title"
                               :description="events[2].description"
                               @click="openModal(events[2])"
                               />
                        </div>
                    </div>
                </div>
                <div class="carousel-item">
                    <div class="row justify-content-center">
                        <div class="col-12 col-sm-6 col-md-4">
                            <Card
                               :id="events[0].id"
                               :image="events[0].image"
                               :title="events[0].title"
                               :description="events[0].description"
                               @click="openModal(events[0])"
                               />
                        </div>
                        <div class="col-12 col-sm-6 col-md-4">
                            <Card
                               :id="events[1].id"
                               :image="events[1].image"
                               :title="events[1].title"
                               :description="events[1].description"
                               @click="openModal(events[1])"
                               />
                        </div>
                        <div class="col-12 col-sm-6 col-md-4">
                            <Card
                               :id="events[2].id"
                               :image="events[2].image"
                               :title="events[2].title"
                               :description="events[2].description"
                               @click="openModal(events[2])"
                               />
                        </div>
                    </div>
                </div>
                <div class="carousel-item">
                    <div class="row justify-content-center">
                        <div class="col-12 col-sm-6 col-md-4">
                            <Card
                               :id="events[0].id"
                               :image="events[0].image"
                               :title="events[0].title"
                               :description="events[0].description"
                               @click="openModal(events[0])"
                               />
                        </div>
                        <div class="col-12 col-sm-6 col-md-4">
                            <Card
                               :id="events[1].id"
                               :image="events[1].image"
                               :title="events[1].title"
                               :description="events[1].description"
                               @click="openModal(events[1])"
                               />
                        </div>
                        <div class="col-12 col-sm-6 col-md-4">
                            <Card
                               :id="events[2].id"
                               :image="events[2].image"
                               :title="events[2].title"
                               :description="events[2].description"
                               @click="openModal(events[2])"
                               />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <button class="btn btn-link carousel-control-next-bottom" type="button" data-bs-target="#carrusel1" data-bs-slide="next">
            <i class="bi bi-chevron-right fs-4"></i>
        </button>
    </div>
    <div class="custom-slider-bar" v-if="showSlider">
        <div class="custom-slider-thumb" :style="{ left: `${(activeSlide / (totalSlides - 1)) * 100}%` }"></div>
    </div>

    <Modal :isOpen="isModalOpen" :event="selectedEvent" @close="closeModal" />

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
    margin: 15 auto;
}

.carousel-control-prev,
.carousel-control-next {
    display: none;
}

</style>
