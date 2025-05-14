<script setup>
const sections = [
  { id: 'industrial', name: 'INDUSTRIAL' },
  { id: 'sistemas', name: 'SISTEMAS COMPUTACIONALES' },
  { id: 'administracion', name: 'ADMINISTRACIÓN' },
  { id: 'libros', name: 'AMANTES DE LOS LIBROS' }
];

const scrollToSection = (sectionId) => {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
};
</script>

<template>
  <div class="quick-menu">
    <div class="menu-container">
      <button 
        v-for="section in sections" 
        :key="section.id"
        class="menu-button"
        @click="scrollToSection(section.id)"
      >
        {{ section.name }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.quick-menu {
  background-color: white;
  padding: 1rem;
  margin-bottom: 2rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.menu-container {
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
  max-width: 1200px;
  margin: 0 auto;
}

.menu-button {
  background: none;
  border: 2px solid #021E68;
  border-radius: 5px;
  padding: 0.5rem 1rem;
  font-family: "Josefin Sans", sans-serif;
  font-weight: 700;
  font-size: 16px;
  color: #021E68;
  cursor: pointer;
  transition: all 0.3s ease;
}

.menu-button:hover {
  background-color: #021E68;
  color: white;
}

@media (max-width: 768px) {
  .menu-container {
    flex-direction: column;
    align-items: center;
  }
  
  .menu-button {
    width: 100%;
    max-width: 300px;
  }
}
</style>