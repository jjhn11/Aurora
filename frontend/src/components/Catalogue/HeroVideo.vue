<template>
    <div>
      <section class="hero-container">
        <!-- Always show the GIF as fallback -->
        <img 
          src="@/assets/img/catalogue/CatalogueBanner.jpg" 
          alt="Hero animation" 
          class="hero-background"
        >
        
        <!-- Simple video implementation 
        <video 
          autoplay 
          muted 
          loop 
          playsinline
          class="hero-video"
        >
          <source src="../assets/img/herovideo.mp4" type="video/mp4">
        </video>-->
  
        <!-- Overlay Content -->
        <div class="hero-overlay">
          <span class="hero-title">CATÁLOGO</span>
          <!--<img src="../assets/img/herovideo-title.png" alt="Hero title" class="hero-title">-->
        </div>
      </section>
    </div>
  </template>
<style scoped>
/* Hero Container */
.hero-container {
  position: relative;
  width: 100%;
  height: 250px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  background-color: white;
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
  pointer-events: none; /* Asegura que la superposición no bloquee las interacciones */
}

/* Background elements */
.hero-background, .hero-video {
  position: absolute;
  top: 10%;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: 100% 70%;
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
  z-index: 3; /* Asegura que el contenido esté encima de la superposición */
  color: white;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.hero-title {
  display: flex;
  justify-content: center;
  font-family:
    "Josefin Sans",
    -apple-system,
    Roboto,
    Helvetica,
    sans-serif;
  font-weight: 700;
  font-size: 90px;
  color: white;
  text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.5);
  transform: translateY(30%);
  width: 870px;
  height: 198px;
  max-width: 80%; 
  text-align: center
}  
@media (max-width:776px) {
  .hero-container {
  position: relative;
  width: 100%;
  height: 160px;
  overflow: hidden;
  display: flex;
}
  .hero-title {
  font-size: 3rem;
  transform: translateY(25%);
  width: 100%;
  height: 198px;
  max-width: 80%; 
}  
}
</style>
