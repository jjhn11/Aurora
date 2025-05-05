<script setup>
import { ref, computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import Card from './Card.vue';

// Setup reactive state
const activeSlide = ref(0);
const totalSlides = ref(3);
const showSlider = ref(true);
const store = useStore();

// Categoría Escolar (ID=3)
const schoolCategoryId = 3;

// Cargar eventos al montar el componente
onMounted(async () => {
  if (!store.state.events?.events?.length) {
    await store.dispatch('events/loadInitialData');
  }
});

// Obtener solo eventos escolares usando el getter
const schoolEvents = computed(() => 
  store.getters['events/getEventsByCategory'](schoolCategoryId) || []
);

// Setup carousel events handling
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
            <div class="carousel-inner" v-if="schoolEvents.length >= 3">
                <div class="carousel-item active">
                    <div class="row justify-content-center">
                        <div class="col-12 col-sm-6 col-md-4">
                            <Card
                               :id="schoolEvents[0]?.Id_event"
                               :image="schoolEvents[0]?.image"
                               :title="schoolEvents[0]?.Title"
                               :description="schoolEvents[0]?.Description"
                               :date="schoolEvents[0]?.Event_date"
                               :isUpcoming="schoolEvents[0]?.Is_coming"
                            />
                        </div>
                        <div class="col-12 col-sm-6 col-md-4" v-if="schoolEvents.length > 1">
                            <Card
                               :id="schoolEvents[1]?.Id_event"
                               :image="schoolEvents[1]?.image"
                               :title="schoolEvents[1]?.Title"
                               :description="schoolEvents[1]?.Description"
                               :date="schoolEvents[1]?.Event_date"
                               :isUpcoming="schoolEvents[1]?.Is_coming"
                            />
                        </div>
                        <div class="col-12 col-sm-6 col-md-4" v-if="schoolEvents.length > 2">
                            <Card
                               :id="schoolEvents[2]?.Id_event"
                               :image="schoolEvents[2]?.image"
                               :title="schoolEvents[2]?.Title"
                               :description="schoolEvents[2]?.Description"
                               :date="schoolEvents[2]?.Event_date"
                               :isUpcoming="schoolEvents[2]?.Is_coming"
                            />
                        </div>
                    </div>
                </div>
                <div class="carousel-item" v-if="schoolEvents.length > 3">
                    <div class="row justify-content-center">
                        <div class="col-12 col-sm-6 col-md-4">
                            <Card
                               :id="schoolEvents[3]?.Id_event"
                               :image="schoolEvents[3]?.image"
                               :title="schoolEvents[3]?.Title"
                               :description="schoolEvents[3]?.Description"
                               :date="schoolEvents[3]?.Event_date"
                               :isUpcoming="schoolEvents[3]?.Is_coming"
                            />
                        </div>
                        <div class="col-12 col-sm-6 col-md-4" v-if="schoolEvents.length > 4">
                            <Card
                               :id="schoolEvents[4]?.Id_event"
                               :image="schoolEvents[4]?.image"
                               :title="schoolEvents[4]?.Title"
                               :description="schoolEvents[4]?.Description"
                               :date="schoolEvents[4]?.Event_date"
                               :isUpcoming="schoolEvents[4]?.Is_coming"
                            />
                        </div>
                        <div class="col-12 col-sm-6 col-md-4" v-if="schoolEvents.length > 5">
                            <Card
                               :id="schoolEvents[5]?.Id_event"
                               :image="schoolEvents[5]?.image"
                               :title="schoolEvents[5]?.Title"
                               :description="schoolEvents[5]?.Description"
                               :date="schoolEvents[5]?.Event_date"
                               :isUpcoming="schoolEvents[5]?.Is_coming"
                            />
                        </div>
                    </div>
                </div>
                <div class="carousel-item" v-if="schoolEvents.length > 6">
                    <div class="row justify-content-center">
                        <div class="col-12 col-sm-6 col-md-4">
                            <Card
                               :id="schoolEvents[6]?.Id_event"
                               :image="schoolEvents[6]?.image"
                               :title="schoolEvents[6]?.Title"
                               :description="schoolEvents[6]?.Description"
                               :date="schoolEvents[6]?.Event_date"
                               :isUpcoming="schoolEvents[6]?.Is_coming"
                            />
                        </div>
                        <div class="col-12 col-sm-6 col-md-4" v-if="schoolEvents.length > 7">
                            <Card
                               :id="schoolEvents[7]?.Id_event"
                               :image="schoolEvents[7]?.image"
                               :title="schoolEvents[7]?.Title"
                               :description="schoolEvents[7]?.Description"
                               :date="schoolEvents[7]?.Event_date"
                               :isUpcoming="schoolEvents[7]?.Is_coming"
                            />
                        </div>
                        <div class="col-12 col-sm-6 col-md-4" v-if="schoolEvents.length > 8">
                            <Card
                               :id="schoolEvents[8]?.Id_event"
                               :image="schoolEvents[8]?.image"
                               :title="schoolEvents[8]?.Title"
                               :description="schoolEvents[8]?.Description"
                               :date="schoolEvents[8]?.Event_date"
                               :isUpcoming="schoolEvents[8]?.Is_coming"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div class="no-events" v-else>
                <p>No hay eventos escolares disponibles</p>
            </div>
        </div>
        <button class="btn btn-link carousel-control-next-bottom" type="button" data-bs-target="#carrusel2" data-bs-slide="next">
            <i class="bi bi-chevron-right fs-4"></i>
        </button>
    </div>
    <div class="custom-slider-bar" v-if="showSlider && schoolEvents.length > 3">
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

.no-events {
    text-align: center;
    padding: 30px;
    background-color: #f8f9fa;
    border-radius: 10px;
    margin: 20px;
    color: #6c757d;
    font-size: 1.2rem;
}
</style>
