<script setup>
import Profanity from '@/components/Test/Profanity.vue';
</script>

<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-10">
        <h1 class="text-center my-4">Test de Detección de Profanidad</h1>
        <p class="text-center mb-5">Usa esta herramienta para probar la detección de palabras prohibidas en tu contenido</p>
        
        <Profanity />
      </div>
    </div>
  </div>
</template>