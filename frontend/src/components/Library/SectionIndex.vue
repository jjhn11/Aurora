<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const props = defineProps({
  sections: {
    type: Array,
    required: true
  }
});

const activeSection = ref(props.sections[0]?.id);

const scrollToSection = (sectionId) => {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};

const checkActiveSection = () => {
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
  window.addEventListener('scroll', checkActiveSection);
  checkActiveSection();
});

onUnmounted(() => {
  window.removeEventListener('scroll', checkActiveSection);
});
</script>

<template>
  <nav class="section-index">
    <ul>
      <li v-for="section in sections" :key="section.id">
        <button 
          @click="scrollToSection(section.id)"
          :class="{ active: activeSection === section.id }"
          :title="section.name"
        >
          {{ section.name }}
        </button>
      </li>
    </ul>
  </nav>
</template>

<style scoped>
.section-index {
  position: fixed;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  z-index: 100;
  background: white;
  padding: 1rem;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

button {
  background: none;
  border: none;
  padding: 0.5rem 1rem;
  font-family: "Josefin Sans", sans-serif;
  font-weight: 600;
  font-size: 14px;
  color: #000E32;
  white-space: nowrap;
  cursor: pointer;
  transition: all 0.3s ease;
  border-radius: 5px;
}

button:hover {
  background-color: #f0f0f0;
}

button.active {
  background-color: #000E32;
  color: white;
}

@media (max-width: 768px) {
  .section-index {
    bottom: 0;
    top: auto;
    right: 0;
    left: 0;
    transform: none;
    border-radius: 10px 10px 0 0;
    padding: 0.5rem;
  }

  ul {
    flex-direction: row;
    justify-content: center;
    flex-wrap: wrap;
  }

  button {
    font-size: 12px;
    padding: 0.25rem 0.5rem;
  }
}
</style>