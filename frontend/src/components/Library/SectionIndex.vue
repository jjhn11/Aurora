<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const props = defineProps({
  sections: {
    type: Array,
    required: true
  }
});

const activeSection = ref(props.sections[0]?.id);
const isVisible = ref(false);

const scrollToSection = (sectionId) => {
  const element = document.getElementById(sectionId);
  if (element) {
    const offset = 100; // Adjust this value based on your header height
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;
    
    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }
};

const checkScroll = () => {
  // Check visibility based on scroll position
  const scrollThreshold = window.innerHeight * 0.4;
  isVisible.value = window.scrollY > scrollThreshold;

  // Existing active section check
  const sections = props.sections.map(section => ({
    id: section.id,
    element: document.getElementById(section.id),
  }));

  const pageYOffset = window.scrollY;
  const windowHeight = window.innerHeight;

  for (const section of sections) {
    if (!section.element) continue;
    
    const rect = section.element.getBoundingClientRect();
    if (rect.top <= windowHeight / 2 && rect.bottom >= windowHeight / 2) {
      activeSection.value = section.id;
      break;
    }
  }
};

onMounted(() => {
  window.addEventListener('scroll', checkScroll);
  checkScroll();
});

onUnmounted(() => {
  window.removeEventListener('scroll', checkScroll);
});
</script>

<template>
  <nav class="section-index" :class="{ 'visible': isVisible }">
    <div class="index-header">
      <h3>Carreras</h3>
    </div>
    <div class="sections-container">
      <button 
        v-for="section in sections" 
        :key="section.id"
        :class="{ active: activeSection === section.id }"
        @click="scrollToSection(section.id)"
      >
        {{ section.name }}
      </button>
    </div>
  </nav>
</template>

<style scoped>
.section-index {
  position: fixed;
  right: 20px;
  top: 55%;
  transform: translateY(-50%);
  z-index: 100;
  background: white;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  max-height: 80vh;
  display: flex;
  flex-direction: column;
  width: 180px; /* Reduced from 250px */
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease;
}

.section-index.visible {
  opacity: 1;
  visibility: visible;
}

.index-header {
  padding: 1rem;
  border-bottom: 1px solid #eee;
}

.index-header h3 {
  margin: 0;
  color: #021E68;
  font-family: 'Josefin Sans', sans-serif;
  font-size: 1.2rem;
  font-weight: 700;
}

.sections-container {
  overflow-y: auto;
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}

.sections-container::-webkit-scrollbar {
  width: 4px;
}

.sections-container::-webkit-scrollbar-thumb {
  background: #021E68;
  border-radius: 4px;
}

button {
  background: none;
  border: none;
  padding: 0.4rem 0.6rem; /* Reduced padding */
  font-family: "Nunito Sans", sans-serif;
  font-size: 0.8rem; /* Reduced from 0.9rem */
  color: #000E32;
  text-align: left;
  cursor: pointer;
  transition: all 0.2s ease;
  border-radius: 5px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

button:hover {
  background-color: #f0f0f0;
}

button.active {
  background-color: #021E68;
  color: white;
}

@media (max-width: 768px) {
  .section-index {
    position: fixed;
    top: auto;
    bottom: 0;
    left: 0;
    right: 0;
    transform: translateY(100%); /* Start from below */
    width: 100%;
    max-height: 40vh;
    border-radius: 10px 10px 0 0;
  }

  .section-index.visible {
    transform: translateY(0); /* Slide up when visible */
  }

  .sections-container {
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    gap: 0.5rem;
    padding: 0.5rem;
  }

  button {
    font-size: 0.8rem;
    padding: 0.4rem 0.8rem;
  }
}
</style>