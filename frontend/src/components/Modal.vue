<style>
@import url('https://fonts.googleapis.com/css2?family=Nunito+Sans:ital,opsz,wght@0,6..12,200..1000;1,6..12,200..1000&display=swap');
</style>

<template>
  <div v-if="isOpen" class="modal-overlay" @click.self="close">
    <button class="close-button" @click="close">✖</button>
    <div class="modal-content">
      <img :src="getImageUrl(event.Image_url)" alt="Event Image" class="modal-image" v-if="event.Image_url" />
      <div class="modal-body">
        <h2>{{ event.Title }}</h2>
        <p>{{ event.Description }}</p>
      </div>
    </div>
  </div>
</template>

  
<script setup>
  import { defineProps, defineEmits } from 'vue';
  import axios from 'axios';
  
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

  const getImageUrl = (imagePath) => {
    return `${axios.defaults.baseURL}${imagePath.startsWith('/uploads') ? '' : '/uploads'}${imagePath}`;
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
  h2 {
    font-family: "Josefin Sans", -apple-system, Roboto, Helvetica, sans-serif;
    font-weight: 700;
    font-size: 25px;
    text-align: center;
  }
  p{
    color: #000E32;
    font-family: "Nunito sans";
    font-weight: 400;
    font-size: 16px;
    text-align: justify;
  }
  .modal-content {
    background: #F3F4F5;
    border-radius: 12px;
    max-width: 500px;
    width: 90%;
    position: relative;
    overflow: hidden; 
  }

  .modal-body {
    padding: 1.5rem;
    text-align: center;
  }

  .modal-image {
    width: 100%;
    height: 250px;
    border-top-left-radius: 12px;
    border-top-right-radius: 12px;
    margin-bottom: 2px;
    display: block;
}
  .close-button {
    color: white;
    position: absolute;
    top: 13%;
    right: 30%;
    background: none;
    border-radius: 100%;
    border: none;
    font-size: 2rem;
    cursor: pointer;
    height: 35px;
  }
  @media (max-width: 1068px) {
    .close-button {
      top: 80%;
      right: inherit;
    }
  }
</style>
  