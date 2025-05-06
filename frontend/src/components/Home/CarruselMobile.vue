<script setup>
import { ref } from 'vue';
import { useStore } from 'vuex';
import CardHome from './CardHome.vue';
import Modal from '../Modal.vue';

const store = useStore();
const events = store.state.events?.events;

// Modal handling
const isModalOpen = ref(false);
const selectedEvent = ref({});

const openModal = (event) => {
  selectedEvent.value = event;
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
};
</script>

<template>
  <div class="mobile-carousel container-fluid">
    <div id="carouselMobile" class="carousel slide" data-bs-ride="carousel">
      <div class="carousel-inner">
        <div v-for="(event, index) in events" 
             :key="event.id" 
             class="carousel-item"
             :class="{ active: index === 0 }">
          <CardHome
            :id="event.id"
            :image="event.image"
            :title="event.title"
            :description="event.description"
            @openModal="openModal(event)"
          />
        </div>
      </div>

      <div class="carousel-controls">
        <button class="control-btn prev" type="button" data-bs-target="#carouselMobile" data-bs-slide="prev">
          <i class="bi bi-chevron-left"></i>
        </button>

        <div class="carousel-indicators">
          <button v-for="(_, index) in events" 
                  :key="index"
                  type="button"
                  data-bs-target="#carouselMobile"
                  :data-bs-slide-to="index"
                  :class="{ active: index === 0 }">
          </button>
        </div>

        <button class="control-btn next" type="button" data-bs-target="#carouselMobile" data-bs-slide="next">
          <i class="bi bi-chevron-right"></i>
        </button>
      </div>
    </div>
  </div>

  <Modal :isOpen="isModalOpen" :event="selectedEvent" @close="closeModal" />
</template>

<style scoped>
.mobile-carousel {
  padding: 0 15px;
}

.carousel {
  position: relative;
  padding-bottom: 50px;
}

.carousel-item {
  padding: 10px;
}

.control-btn {
  background: none;
  border: none;
  color: #007bff;
  font-size: 1.5rem;
  padding: 5px;
}

.carousel-controls {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
  padding: 10px 0;
}

.carousel-indicators {
  position: static;
  margin: 0;
  display: flex;
  gap: 5px;
}

.carousel-indicators button {
  width: 8px !important;
  height: 8px !important;
  border-radius: 50%;
  background-color: #fff;
  border: 1px solid #6f00ff !important;
  opacity: 0.5;
}

.carousel-indicators button.active {
  background-color: #007bff;
  opacity: 1;
}
</style>