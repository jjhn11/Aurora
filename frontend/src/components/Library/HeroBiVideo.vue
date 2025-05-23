<template>
    <div>
      <section class="hero-container">
        <!-- Always show the GIF as fallback -->
        <img 
          src="@/assets/img/library/bibliotecagif.gif" 
          alt="Hero animation" 
          class="hero-background"
        >
        
        <video 
          autoplay 
          muted 
          loop 
          playsinline
          class="hero-video"
        >
          <source src="@/assets/img/library/BIBLIOTECA PASILLO.mp4" type="video/mp4">
        </video>
  
        <!-- Overlay Content -->
        <div class="hero-overlay">
          <span class="hero-title">BIBLIOTECA</span>
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
  height: 320px;
  overflow: hidden;
  display: flex;
  background-color: white;
  justify-content: center; /* Centra horizontalmente */
  align-items: center;     /* Centra verticalmente */
}

/* Gradient Overlay */
.hero-container::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0) 30%, rgba(0, 0, 0, 0.66) 50%);
  z-index: 2;
  pointer-events: none; /* Asegura que la superposición no bloquee las interacciones */
}

/* Background elements */
.hero-background, .hero-video {
  position: absolute;
  top: 10%;
  left: -15%;
  width: 130%;
  height: 200%;
  object-fit:cover;
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
  z-index: 3; /* Asegura que el contenido esté encima de la superposición */
  color: white;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.hero-title {
  font-family:
    "Josefin Sans",
    -apple-system,
    Roboto,
    Helvetica,
    sans-serif;
  font-weight: 700;
  font-size: 110px;
  color: white;
  text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.5);
  letter-spacing: 0.05em;
  margin: 0;
  transform: translate(3%, 20%);
  width: 870px;
  height: 198px;
  max-width: 80%; 
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
  transform: translateY(30%);
  width: 870px;
  height: 198px;
  max-width: 80%; 
}  
}
</style>
