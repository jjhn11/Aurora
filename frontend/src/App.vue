<script setup>
import Navbar from './components/Navbar.vue';
import NavbarMobile from './components/NavbarMobile.vue';
import Foot from './components/Footer.vue';
import { RouterView } from 'vue-router';
import { ref, onMounted, onUnmounted, watch } from 'vue';

const isMobile = ref(window.innerWidth < 992);
const isNavbarShrunk = ref(false);

const handleResize = () => {
  isMobile.value = window.innerWidth < 992;
};

const handleScroll = () => {
  isNavbarShrunk.value = window.scrollY > 0;
};

onMounted(() => {
  window.addEventListener('resize', handleResize);
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
  window.removeEventListener('scroll', handleScroll);
});

</script>

<template>
  <div id="app">
    <component :is="isMobile ? NavbarMobile : Navbar" />
    <main class="main-content" :class="{ 'navbar-shrunk': isNavbarShrunk }">
      <RouterView />
    </main>
    <Foot />
  </div>
</template>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* Web styles */
.main-content {
  padding-top: 80px; /* Full web navbar height */
  transition: padding-top 0.3s ease;
}

/* Web navbar shrunk */
.main-content.navbar-shrunk {
  padding-top: 0px; /* Shrunk web navbar height */
}

/* Mobile styles */
@media (max-width: 991px) {
  .main-content {
    padding-top: 30px; /* Full mobile navbar height */
  }
  
  .main-content.navbar-shrunk {
    padding-top: 30px; /* Shrunk mobile navbar height */
  }
}

/* Small mobile styles */
@media (max-width: 576px) {
  .main-content {
    padding-top: 0px; /* Smaller full mobile navbar height */
  }
  
  .main-content.navbar-shrunk {
    padding-top: 0px; /* Smaller shrunk mobile navbar height */
  }
}
</style>

<script type="text/javascript">
  (function(d, t) {
      var v = d.createElement(t), s = d.getElementsByTagName(t)[0];
      v.onload = function() {
        window.voiceflow.chat.load({
          verify: { projectID: '67c2cfe5b20e19cdb7e91eed' },
          url: 'https://general-runtime.voiceflow.com',
          versionID: 'production',
          voice: {
            url: "https://runtime-api.voiceflow.com"
          }
        });
      }
      v.src = "https://cdn.voiceflow.com/widget-next/bundle.mjs"; v.type = "text/javascript"; s.parentNode.insertBefore(v, s);
  })(document, 'script');
</script>
