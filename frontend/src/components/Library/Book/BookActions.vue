<template>
  <section class="book-actions-section" v-show="!hideButtons">
    <div class="action-buttons">
      <button class="action-button">DESCARGAR</button>
      <button class="action-button reserve-button" @click="$emit('reserve-click')">RESERVAR</button>
    </div>
  </section>
</template>

<script setup>
defineEmits(['reserve-click']);

defineProps({
  hideButtons: {
    type: Boolean,
    default: false
  }
});
</script>

<style scoped>
.book-actions-section {
  margin: 20px 0;
  display: flex;
  justify-content: center;
  width: 100%;
}

.action-buttons {
  display: flex;
  gap: 15px;
}

.action-button {
  font-family: "Josefin Sans", Arial, sans-serif;
  background-color: #000E32;
  color: white;
  border: none;
  padding: 12px 25px;
  border-radius: 4px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
  letter-spacing: 1px;
}

.action-button:hover {
  background-color: #001956;
}

.reserve-button {
  background-color: #0047FF;
}

.reserve-button:hover {
  background-color: #0036C0;
}

@media (max-width: 768px) {
  .action-buttons {
    flex-direction: column;
    width: 100%;
  }
  
  .action-button {
    width: 100%;
  }
}
</style>
