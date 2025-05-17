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
      <source src="@/assets/img/home/herovideo.MP4" type="video/mp4">
    </video>

    <!-- Overlay Content -->
    <div class="hero-overlay">
      <!-- <span class="hero-title">Aurora</span> -->
      <!--<img src="@/assets/img/home/herovideo-title.png" alt="Hero title" class="hero-title">  -->
      <p class="hero-title">AURORA</p> <!---->
    </div>

    <!-- SVG Curve for Desktop-->
    <svg class="hero-curve desktop-curve" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 300">
      <path fill="white" fill-opacity="1" d="M0,160 C360,300 1080,300 1440,160 L1440,400 L0,400 Z"></path>
    </svg>

    <!-- SVG Curve for Mobile -->
    <svg class="hero-curve mobile-curve" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 345">
      <path fill="white" fill-opacity="1" d="M0,160 C360,400 1080,400 1440,160 L1440,400 L0,400 Z"></path>
    </svg>
    
  </section>

</template>
  
<style scoped>

/* Hero Container */
.hero-container {
  position: relative;
  top: auto;
  width: 100%;
  height: 117.5vh;
  overflow: hidden;
  display: flex;
  background-color: rgba(255, 255, 255, 0); /* Cambiado a fondo transparente */
  margin-top: -300px;
  margin-bottom: 60px;
}

/* Gradient Overlay */
.hero-container::before {
  content: '';
  position: absolute;
  top: 12.5%;
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
  top: 30%;
  left: 0%;
  width: 102.5%;
  height: 75%;
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
  bottom: 0;
  left: 0;
  width: 100%;
  height: auto;
  z-index: 4;
}

/* Desktop curve */
.mobile-curve {
  display: none;
}

/* 
.hero-title {
  width: 75%;
  max-width: 80%; 
  margin: 0 auto;
  transform: translate(20%, 130%); 
} */


.hero-title {
  position: fixed;
  left: 50%;
  top: 25%;
  transform: translate(10%, 45%);
  
  position: relative;

  font-family: 'Cinzel Decorative';
  font-size: 5.5vw; /* Tamaño responsive basado en el viewport width */
  font-weight: 600;
  
  transition: 0.6s;
  z-index: 3;
}

@media (max-width: 1024px) {
  .hero-container {
    height: 52.5vh;
  }

  .hero-title {
    transform: translate(-5%, 80%);
  }

  .desktop-curve {
    display: none;
  }
  
  .mobile-curve {
    display: block;
  }
}

@media (max-width: 1024px), (max-height:576px) {
  .hero-container {
    height: 95vh;
  }

  .hero-title {
    transform: translate(-5%, 80%);
  }

  .desktop-curve {
    display: none;
  }
  
  .mobile-curve {
    display: block;
  }
}

@media (max-width: 768px) {
  .desktop-curve {
    display: none;
  }
  
  .mobile-curve {
    display: block;
  }

  .hero-container {
    height: 60vh;
  }

  .hero-title {
    font-size: 6vw;
    transform: translate(-10%, 65%);
  }
}

@media (max-width: 768px), (max-height:576px) {
  .desktop-curve {
    display: none;
  }
  
  .mobile-curve {
    display: block;
  }

  .hero-container {
    height: 120vh;
  }

  .hero-title {
    font-size: 6vw;
    transform: translate(-10%, 65%);
  }
}

@media (max-width: 576px) {

  .hero-background, .hero-video {
    position: absolute;
    top: 40%;
    left: 0%;
    width: 135%;
    height: 60%;
    object-fit: cover;
    object-position: 100% 95%;
  }

  .desktop-curve {
    display: none;
  }
  
  .mobile-curve {
    display: block;
  }

  .hero-container {
    height: 80vh;
    margin-top: -372.5px;
  }

  .hero-title {
    font-size: 6vw;
    transform: translate(-15%, 275%);
  }
}

/*
@media (max-width: 540px), (max-height:720px) {

  .hero-background, .hero-video {
    position: absolute;
    top: 40%;
    left: 0%;
    width: 135%;
    height: 60%;
    object-fit: cover;
    object-position: 100% 95%;
  }

  .desktop-curve {
    display: none;
  }
  
  .mobile-curve {
    display: block;
  }

  .hero-container {
    height: 85vh;
    margin-top: -372.5px;
  }

  .hero-title {
    font-size: 6vw;
    transform: translate(-5%, 180%);
  }
}
*/
</style>
