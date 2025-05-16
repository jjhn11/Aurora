<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const props = defineProps({
  sections: {
    type: Array,
    required: true
  }
});

const activeSection = ref(props.sections[0]?.id);
const topPosition = ref(110);
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
  const scrollThreshold = window.innerHeight * 0.4; 
  const currentScroll = window.scrollY;
  const footerElement = document.querySelector('footer');
  
  // Calculate position between 110% and 55% based on scroll
  if (currentScroll <= scrollThreshold) {
    const progress = Math.min(currentScroll / scrollThreshold, 1);
    // Make the movement more dramatic at the start
    const easeProgress = Math.pow(progress, 1); // Add easing function if wanted a bit more dramatic
    topPosition.value = 110 - (easeProgress * (110 - 55));
  } else {
    topPosition.value = 55;
  }

  // Check if section index is close to footer
  if (footerElement) {
    const footerRect = footerElement.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const footerHeight = footerElement.offsetHeight;
    const sectionIndexElement = document.querySelector('.section-index');
    const sectionIndexHeight = sectionIndexElement ? sectionIndexElement.offsetHeight : 300;
    
    // Calculate the buffer based on section index height
    const bufferZone = viewportHeight * 0.1;
    // Calculate how much space we need from the bottom (in viewport percentage)
    const neededSpace = (sectionIndexHeight / viewportHeight) * 100;
    
    if (footerRect.top <= viewportHeight + bufferZone) {
      const totalDistance = footerHeight + bufferZone;
      const distanceIntoZone = (viewportHeight + bufferZone) - footerRect.top;
      const progress = Math.min(distanceIntoZone / totalDistance, 1);
      
      // Move section index up based on its height
      // Start from 55% and move up by the needed space
      topPosition.value = 55 - (progress * neededSpace);
    }
  }
  
  isVisible.value = currentScroll > scrollThreshold;

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
  <nav 
    class="section-index" 
    :style="{ top: `${topPosition}%` }"
    :class="{ 'scroll-position': isVisible }"
  >
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
  transform: translateY(-50%);
  z-index: 100;
  background: white;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  max-height: 80vh;
  display: flex;
  flex-direction: column;
  width: 180px;
  opacity: 1;
  visibility: visible;
  transition: all 0.3s ease;
}

.section-index.scroll-position {
  /* Other styles remain unchanged */
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
    display: none; /* Hide on mobile */
  }
}
</style>