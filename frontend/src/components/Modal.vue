<template>
    <div v-if="isOpen" class="modal-overlay" @click.self="close">
      <div class="modal-content">
        <button class="close-button" @click="close">✖</button>
        <img :src="event.image" alt="Event Image" class="modal-image" v-if="event.image" />
        <h2>{{ event.title }}</h2>
        <p>{{ event.description }}</p>
        <p v-if="event.date"><strong>Fecha:</strong> {{ event.date }}</p>
      </div>
    </div>
</template>
  
<script setup>
  import { defineProps, defineEmits } from 'vue';
  
  const props = defineProps({
    isOpen: Boolean,
    event: {
      type: Object,
      default: () => ({})
    }
  });
  
  const emit = defineEmits(['close']);
  
  const close = () => {
    emit('close');
  };
</script>
  
<style scoped>
  .modal-overlay {
    position: fixed;
    top: 20px;
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
    border-radius: 12px;
    max-width: 600px;
    width: 90%;
    position: relative;
    text-align: center;
  }
  
  .modal-image {
    width: 100%;
    height: 300px;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
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
  