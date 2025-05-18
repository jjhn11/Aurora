<style>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap');
</style>
<template>
  <section class="hero-container">
    <img :src="img" alt="Hero image" class="hero-background">
    <div class="hero-overlay">
      <span class="hero-title">{{ title }}</span>
    </div>
  </section>
</template>

<script setup>
const props = defineProps({
  img: String,
  title: String
});
</script>

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
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0) 30%, rgba(0, 0, 0, 0.66) 70%);
  z-index: 2;
  pointer-events: none; /* Asegura que la superposición no bloquee las interacciones */
}

/* Background elements */
.hero-background, .hero-video {
  position: absolute;
  top: 0;
  width: 100%;
  height: 250%;
  object-fit:cover;
  object-position: 100% 95%;
}

/* Background elements */
.hero-background, .hero-video .cubicle{
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  object-fit:fill;
  object-position: 100% 0%;
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
  font-family: "Josefin Sans";
  font-weight: 700;
  font-size: 6rem;
  color: white;
  text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.5);
  letter-spacing: 0.05em;
  margin: 0;
  transform: translateY(30%);
  width: 870px;
  height: 198px;
  max-width: 80%; 
}  
@media (max-width: 1076px) {
  .hero-title {
  font-weight: 700;
  font-size: 50px;
  color: white;
  text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.5);
  letter-spacing: 0.05em;
  margin: 0;
  transform: translateY(30%);
  width: 440px;
  height: 101px;
  max-width: 80%; 
}  
.hero-container {
  position: relative;
  width: 100%;
  height: 182px;
  overflow: hidden;
  display: flex;
  background-color: white;
  justify-content: center; /* Centra horizontalmente */
  align-items: center;     /* Centra verticalmente */
}
}
</style>
