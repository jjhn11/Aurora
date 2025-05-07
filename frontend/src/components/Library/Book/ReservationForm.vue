<template>
  <div class="reservation-modal-overlay" @click="close">
    <div class="reservation-modal-dialog" @click.stop>
      <div class="reservation-modal-header">
        <h3>RESERVAR LIBRO</h3>
        <button @click="close" class="close-button" type="button">&times;</button>
      </div>
      <div class="reservation-modal-body">
        <div v-if="success" class="success-message">
          <i class="fas fa-check-circle"></i>
          <p>¡Reservación solicitada con éxito! Te contactaremos pronto.</p>
          <button @click="close" class="btn-primary">Cerrar</button>
        </div>
        <form v-else @submit.prevent="submitForm">
          <div class="form-group">
            <div class="book-info">
              <img v-if="book.coverImage" :src="book.coverImage" class="book-thumbnail" alt="Portada del libro">
              <div class="book-detail">
                <h4>{{ book.Title }}</h4>
                <p>{{ book.authorText || book.authors?.join(', ') || 'Sin autor' }}</p>
                <p v-if="book.ISBN"><strong>ISBN:</strong> {{ book.ISBN }}</p>
              </div>
            </div>
          </div>
          
          <div class="form-group">
            <label for="pickup-date">Fecha de recogida:</label>
            <input 
              type="date" 
              id="pickup-date" 
              v-model="pickupDate" 
              class="form-control"
              :min="minDate"
              required
            />
          </div>
          
          <div class="form-group">
            <label for="pickup-time">Hora de recogida:</label>
            <input 
              type="time" 
              id="pickup-time" 
              v-model="pickupTime" 
              class="form-control"
              required
            />
          </div>
          
          <div class="form-group">
            <label for="message">Mensaje adicional (opcional):</label>
            <textarea 
              id="message" 
              v-model="message" 
              class="form-control"
              rows="4"
            ></textarea>
          </div>
          
          <div class="form-actions">
            <button 
              type="submit" 
              class="btn-primary" 
              :disabled="loading"
            >
              <span v-if="loading">Enviando...</span>
              <span v-else>Enviar Solicitud</span>
            </button>
          </div>
          
          <div v-if="error" class="error-message">
            {{ error }}
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useStore } from 'vuex';

const props = defineProps({
  book: {
    type: Object,
    required: true
  }
});

const emit = defineEmits(['close']);

const store = useStore();
const loading = computed(() => store.getters['mail/isLoading']);
const error = computed(() => store.getters['mail/getError']);
const success = ref(false);

const pickupDate = ref('');
const pickupTime = ref('');
const message = ref('');

// Calcular fecha mínima (mañana)
const minDate = computed(() => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  return tomorrow.toISOString().split('T')[0];
});

// Establecer fecha predeterminada a mañana
onMounted(() => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  pickupDate.value = tomorrow.toISOString().split('T')[0];
  
  // Establecer hora predeterminada a las 10:00 AM
  pickupTime.value = '10:00';
});

const submitForm = async () => {
  try {
    // Verificar si el usuario está autenticado
    if (!store.state.user?.isAuthenticated) {
      error.value = 'Debes iniciar sesión para reservar un libro.';
      return;
    }
    
    await store.dispatch('mail/sendBookReservation', {
      book: props.book,
      pickupDate: pickupDate.value,
      pickupTime: pickupTime.value,
      message: message.value
    });
    
    success.value = true;
  } catch (err) {
    console.error('Error al enviar reservación:', err);
    // El error ya se establece en el store
  }
};

const close = () => {
  emit('close');
};
</script>

<style scoped>
.reservation-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.reservation-modal-dialog {
  background-color: white;
  border-radius: 8px;
  width: 90%;
  max-width: 500px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
}

.reservation-modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  border-bottom: 1px solid #eee;
  position: sticky;
  top: 0;
  background-color: white;
  z-index: 1;
}

.reservation-modal-header h3 {
  margin: 0;
  font-family: "Josefin Sans", Arial, sans-serif;
  color: #000E32;
  font-weight: bold;
}

.close-button {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #555;
}

.reservation-modal-body {
  padding: 20px;
}

.book-info {
  display: flex;
  margin-bottom: 20px;
  border-bottom: 1px solid #eee;
  padding-bottom: 15px;
}

.book-thumbnail {
  width: 70px;
  height: auto;
  object-fit: cover;
  margin-right: 15px;
}

.book-detail h4 {
  margin: 0 0 5px;
  font-size: 16px;
  font-weight: bold;
  color: #000E32;
}

.book-detail p {
  margin: 0 0 5px;
  font-size: 14px;
  color: #555;
}

.form-group {
  margin-bottom: 16px;
}

.form-group label {
  display: block;
  margin-bottom: 6px;
  font-weight: 600;
  color: #000E32;
}

.form-control {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-family: inherit;
  font-size: 16px;
}

.form-control:focus {
  outline: none;
  border-color: #0047FF;
  box-shadow: 0 0 0 2px rgba(0, 71, 255, 0.2);
}

textarea.form-control {
  resize: vertical;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  margin-top: 24px;
}

.btn-primary {
  background-color: #000E32;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
}

.btn-primary:hover {
  background-color: #001956;
}

.btn-primary:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

.error-message {
  margin-top: 16px;
  padding: 10px;
  background-color: #fff0f0;
  border: 1px solid #ffcccc;
  color: #cc0000;
  border-radius: 4px;
}

.success-message {
  text-align: center;
  padding: 20px 0;
}

.success-message i {
  font-size: 48px;
  color: #28a745;
  margin-bottom: 16px;
}

.success-message p {
  margin-bottom: 20px;
  font-size: 18px;
}
</style>