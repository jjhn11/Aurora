<script setup>
import Navbar from './components/Navbar.vue';
import NavbarMobile from './components/NavbarMobile.vue';
import Foot from './components/Footer/Footer.vue';
import { RouterView } from 'vue-router';
import { ref, onMounted, onUnmounted } from 'vue';

const isMobile = ref(window.innerWidth < 992);

const handleResize = () => {
  isMobile.value = window.innerWidth < 992;
};

onMounted(() => {
  window.addEventListener('resize', handleResize);
});

onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
});

</script>

<template>
  <div id="app">
    <component :is="isMobile ? NavbarMobile : Navbar" />
    <RouterView />
    <Foot />
  </div>
</template>

<style>
/* Component-specific styles can stay here */
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>