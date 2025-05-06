<script setup>
import HeroVideo from '@/components/Home/HeroVideo.vue';
import SearchBar from '@/components/SearchBar.vue';
import Carrusel from '@/components/Home/Carrusel.vue';
import CarruselMobile from '@/components/Home/CarruselMobile.vue';
import Title from '@/components/Home/Title.vue';
import Notice from '@/components/Home/Notice.vue';
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
    <HeroVideo />
    <br><br>
    <SearchBar />
    <br><br>
    <Title title="EVENTOS"/>
    <component :is="isMobile ? CarruselMobile : Carrusel"/>
    <br><br>
    <Title title="NOTICIAS"/>
    <Notice />
    <br><br><br>
</template>