<script setup>
import HeroVideo from '@/components/Home/HeroVideo.vue';
import SearchBar from '@/components/SearchBar.vue';
import Carrusel from '@/components/Home/Carrusel.vue';
import CarruselMobile from '@/components/Home/CarruselMobile.vue';
import Title from '@/components/Home/Title.vue';
import Notice from '@/components/Home/Notice.vue';
import { ref, onMounted, onUnmounted } from 'vue';

const isMobile = ref(window.innerWidth < 768);

const handleResize = () => {
  isMobile.value = window.innerWidth < 768;
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

  <div class="spacer-1"></div>

      <SearchBar />

  <div class="spacer-2"></div>

      <Title title="EVENTOS"/>

      <component :is="isMobile ? CarruselMobile : Carrusel"/>

  <div class="spacer-3 title-spacer"></div>

      <Title class="pb-3" title="NOTICIAS"/>

      <Notice />

  <div class="spacer-4 bottom-space"></div>

</template>

<style scoped>
.spacer-1 {
    height: 2rem; /* 32px by default */
}

.spacer-2 {
    height: 3rem; /* 48px for the title spacer */
}

.spacer-3 {
    height: 3rem; /* 48px for the last spacer */
}

.spacer-4 {
    height: 4rem; /* 48px for the last spacer */
}

@media screen and (max-width: 768px) {
    .spacer-1 {
        height: 2rem; /* 24px for mobile */
    }

    .spacer-2 {
      height: 2.5rem;
    }

    .spacer-3 {
        height: 2rem; /* 32px for mobile */
    }
    
    .spacer-4 {
        height: 2.5rem; /* 32px for mobile */
    }
}

/* Mobile responsive styles */
@media screen and (max-width: 576px) {
    .spacer-1 {
        height: 2rem; /* 24px for mobile */
    }

    .spacer-2 {
      height: 2.5rem;
    }

    .spacer-3 {
        height: 1rem; /* 32px for mobile */
    }
    
    .spacer-4 {
        height: 2.5rem; /* 32px for mobile */
    }
}
</style>