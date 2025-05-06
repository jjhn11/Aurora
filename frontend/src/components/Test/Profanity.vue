<script setup>
import { ref, computed } from 'vue';
import { useStore } from 'vuex';

// Store
const store = useStore();

// Campos de prueba
const testTitle = ref('Título de prueba con palabras');
const testDescription = ref('Descripción normal sin palabras prohibidas');

// Referencia al estado de profanidad
const isProfane = computed(() => store.getters['profanity/isProfane']);
const profaneFields = computed(() => store.getters['profanity/profaneFields']);
const isSFW = computed(() => store.getters['profanity/isSFW']);
const isLoading = computed(() => store.getters['profanity/isLoading']);

// Función para verificar profanidad
const checkProfanity = async () => {
  try {
    await store.dispatch('profanity/checkProfanity', {
      fieldsToCheck: ['title', 'description'],
      content: {
        title: testTitle.value,
        description: testDescription.value
      }
    });
    
    if (!isSFW.value) {
      console.log('Contenido inapropiado detectado:', profaneFields.value);
    } else {
      console.log('Contenido apropiado!');
    }
  } catch (error) {
    console.error('Error al verificar profanidad:', error);
  }
};

// Función para añadir palabras prohibidas para testing
const addBadWord = () => {
  testTitle.value = 'Este título contiene palabras como tonto';
  testDescription.value = 'Este texto incluye palabras como idiota y estupido';
};

// Función para limpiar
const resetTest = () => {
  testTitle.value = 'Título de prueba con palabras';
  testDescription.value = 'Descripción normal sin palabras prohibidas';
  store.dispatch('profanity/resetProfanityState');
};
</script>

<template>
  <div class="container py-4">
    <!-- Panel de prueba de profanidad -->
    <div class="card mb-4 border-primary">
      <div class="card-header bg-primary text-white">
        <h5 class="mb-0">Prueba de Detector de Profanidad</h5>
      </div>
      <div class="card-body">
        <div class="mb-3">
          <label for="testTitle" class="form-label">Título de prueba:</label>
          <input 
            type="text" 
            class="form-control" 
            id="testTitle" 
            v-model="testTitle"
            :class="{'is-invalid': isProfane && profaneFields.some(f => f.field === 'title')}"
          >
          <div class="invalid-feedback" v-if="isProfane && profaneFields.some(f => f.field === 'title')">
            Contiene lenguaje inapropiado: {{ profaneFields.find(f => f.field === 'title').original }}
            <br>
            Sugerencia: {{ profaneFields.find(f => f.field === 'title').censored }}
          </div>
        </div>
        
        <div class="mb-3">
          <label for="testDescription" class="form-label">Descripción de prueba:</label>
          <textarea 
            class="form-control" 
            id="testDescription" 
            v-model="testDescription"
            rows="3"
            :class="{'is-invalid': isProfane && profaneFields.some(f => f.field === 'description')}"
          ></textarea>
          <div class="invalid-feedback" v-if="isProfane && profaneFields.some(f => f.field === 'description')">
            Contiene lenguaje inapropiado: {{ profaneFields.find(f => f.field === 'description').original }}
            <br>
            Sugerencia: {{ profaneFields.find(f => f.field === 'description').censored }}
          </div>
        </div>
        
        <div class="d-flex gap-2">
          <button 
            class="btn btn-primary" 
            @click="checkProfanity"
            :disabled="isLoading"
          >
            {{ isLoading ? 'Verificando...' : 'Verificar Profanidad' }}
          </button>
          <button class="btn btn-warning" @click="addBadWord">
            Agregar Palabras Prohibidas
          </button>
          <button class="btn btn-secondary" @click="resetTest">
            Reiniciar
          </button>
        </div>
        
        <div class="mt-3" v-if="!isSFW">
          <div class="alert alert-danger">
            <strong>Contenido inapropiado detectado</strong>
            <ul class="mb-0 mt-2">
              <li v-for="field in profaneFields" :key="field.field">
                Campo: {{ field.field }} - 
                Original: {{ field.original }} - 
                Sugerencia: {{ field.censored }}
              </li>
            </ul>
          </div>
        </div>
        
        <div class="mt-3" v-else-if="isSFW && !isLoading && profaneFields.length === 0">
          <div class="alert alert-success">
            <strong>¡Contenido apropiado!</strong>
            <p class="mb-0">No se detectaron palabras prohibidas en el texto.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>