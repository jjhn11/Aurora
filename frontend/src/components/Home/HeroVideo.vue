<template>

  <section class="hero-container">
    <!-- Always show the GIF as fallback -->
    <img 
      src="@/assets/img/home/herovideo.gif" 
      alt="Hero animation" 
      class="hero-background"
    >
    
    <!-- Simple video implementation -->
    <video 
      autoplay 
      muted 
      loop 
      playsinline
      class="hero-video"
    >
      <source src="@/assets/img/home/herovideo.mp4" type="video/mp4">
    </video>

    <!-- Overlay Content -->
    <div class="hero-overlay">
      <!-- <span class="hero-title">Aurora</span> -->
      <img src="@/assets/img/home/herovideo-title.png" alt="Hero title" class="hero-title">
    </div>

    <!-- SVG Curve -->
    <svg class="hero-curve" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 345">
      <path fill="white" fill-opacity="1" d="M0,160 C360,400 1080,400 1440,160 L1440,400 L0,400 Z"></path>
    </svg>
  </section>

</template>
  
<style scoped>

/* Hero Container */
.hero-container {
  position: relative;
  top:auto;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  display: flex;
  background-color: rgba(255, 255, 255, 0); /* Cambiado a fondo transparente */
  margin-top: -115px;
}

/* Gradient Overlay */
.hero-container::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0) 30%, rgba(0, 0, 0, 0.66) 70%);
  z-index: 2;
  pointer-events: none; /* Ensures the overlay doesn't block interactions */
}

/* Background elements */
.hero-background, .hero-video {
  position: absolute;
  top: 0;
  left: -10%;
  width: 130%;
  height: 110%;
  object-fit: cover;
  object-position: 100% 95%;
}

.hero-background {
  z-index: 0;
}

.hero-video {
  z-index: 1;
}

/* Overlay Content */
.hero-overlay {
  position: relative;
  z-index: 2; /* Ensures content is above the gradient overlay */
  text-align: center;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

/* SVG Curve */
.hero-curve {
  position: absolute;
  bottom: -1%;
  left: 0;
  width: 101%;
  height: auto;
  z-index: 4;
}

.hero-title {
  width: 75%;
  max-width: 80%; 
  margin: 0 auto;
  transform: translate(20%, 130%); 
} 
@media (max-width: 1076px) {
  .hero-container {
    height: 60vh;
  }

  .hero-title {
    width: 75%;
    transform: translateY(30%);
  }
}

@media (max-width: 576px) {
  .hero-container {
    height: 45vh;
  }

  .hero-title {
    width: 85%;
    transform: translateY(20%);
  }
}

</style>