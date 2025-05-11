<template>
    <Transition name="fade">
        <div v-if="modelValue" class="form-overlay" @click.self="closeForm">
            <form class="reservation-form" @submit.prevent="handleSubmit">
                <header class="form-header">
                    <h1 class="form-title">RESERVAR CUBÍCULO</h1>
                    <button type="button" class="close-button" @click="closeForm">
                        <i class="fas fa-times"></i>
                    </button>
                </header>

                <div v-if="loading" class="loading">
                    Cargando información...
                </div>

                <div v-else-if="error" class="error">
                    {{ error }}
                </div>

                <div v-else-if="success" class="success-message">
                    <i class="fas fa-check-circle success-icon"></i>
                    <p>¡Cubículo reservado con éxito!</p>
                    <button @click="closeForm" class="success-close-button">
                        CERRAR
                    </button>
                </div>

                <div v-else class="form-content">
                    <div class="info-container">
                        <!-- User Information -->
                        <section class="info-section">
                            <h2 class="section-title">Información del Usuario</h2>
                            <div class="info-group">
                                <p class="info-text"><strong>Nombre:</strong> {{ user?.Name_user }}</p>
                                <p class="info-text"><strong>Email:</strong> {{ user?.Email }}</p>
                            </div>
                        </section>
                    </div>

                    <!-- Reservation Details -->
                    <section class="reservation-section">
                        <h2 class="section-title">Detalles de la Reserva</h2>
                        <div class="reservation-inputs">
                            <div class="form-group">
                                <label class="form-label">Fecha de Reserva:</label>
                                <input 
                                    v-model="date"
                                    type="date"
                                    class="form-input"
                                    required
                                    :min="minDate"
                                >
                            </div>
                        </div>

                        <div class="time-inputs">
                            <div class="form-group">
                                <label class="form-label">Hora de Entrada:</label>
                                <select 
                                    v-model="checkInTime"
                                    class="form-input"
                                    required
                                >
                                    <option value="">Seleccione hora</option>
                                    <option v-for="hour in availableHours" :key="hour.value" :value="hour.value">
                                        {{ hour.label }}
                                    </option>
                                </select>
                            </div>

                            <div class="form-group">
                                <label class="form-label">Hora de Salida:</label>
                                <select 
                                    v-model="checkOutTime"
                                    class="form-input"
                                    required
                                    :disabled="!checkInTime"
                                >
                                    <option value="">Seleccione hora</option>
                                    <option 
                                        v-for="hour in availableEndHours" 
                                        :key="hour.value" 
                                        :value="hour.value"
                                    >
                                        {{ hour.label }}
                                    </option>
                                </select>
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="form-label">Número de Personas:</label>
                            <input 
                                v-model="peopleCount"
                                type="number"
                                class="form-input"
                                min="4"
                                max="8"
                                required
                            >
                            <small class="form-text text-muted">Mínimo 4 personas, máximo 8 personas</small>
                        </div>
                    </section>

                    <button 
                        type="submit" 
                        class="submit-button"
                        :disabled="sending || !isValidForm"
                    >
                        <span v-if="sending">
                            <i class="fas fa-spinner fa-spin me-2"></i>
                            ENVIANDO...
                        </span>
                        <span v-else>
                            CONFIRMAR RESERVA
                        </span>
                    </button>
                </div>
            </form>
        </div>
    </Transition>
</template>

<script setup>
import { ref, defineEmits, defineProps, onMounted, computed, watch } from 'vue';
import { useStore } from 'vuex';

const props = defineProps({
    modelValue: {
        type: Boolean,
        required: true
    }
});

const emit = defineEmits(['update:modelValue', 'form-sent', 'form-sent-success']);
const store = useStore();

// Form state
const loading = ref(false);
const sending = ref(false);
const error = ref(null);
const success = ref(false);

// Form data
const date = ref('');
const checkInTime = ref('');
const checkOutTime = ref('');
const peopleCount = ref(4);
const notes = ref('');

// User data
const user = computed(() => store.getters['user/getUserData']);

// Computed
const availableHours = computed(() => {
    const hours = [];
    for (let i = 7; i <= 20; i++) {
        const hour = i.toString().padStart(2, '0');
        const period = i < 12 ? 'AM' : 'PM';
        const hour12 = i > 12 ? (i - 12) : i;
        hours.push({
            value: `${hour}:00`,
            label: `${hour12}:00 ${period}`
        });
    }
    return hours;
});

const availableEndHours = computed(() => {
    if (!checkInTime.value) return [];
    
    const startHour = parseInt(checkInTime.value.split(':')[0]);
    const hours = [];
    
    // Only allow up to 3 hours after start time
    const maxEndHour = Math.min(startHour + 3, 21); // Don't exceed 9 PM (21:00)
    
    for (let i = startHour + 1; i <= maxEndHour; i++) {
        const hour = i.toString().padStart(2, '0');
        const period = i < 12 ? 'AM' : 'PM';
        const hour12 = i > 12 ? (i - 12) : i;
        hours.push({
            value: `${hour}:00`,
            label: `${hour12}:00 ${period}`
        });
    }
    return hours;
});

const minDate = computed(() => {
    const today = new Date();
    return today.toISOString().split('T')[0];
});

const isValidForm = computed(() => {
    return date.value && 
           checkInTime.value &&
           checkOutTime.value &&
           peopleCount.value >= 4 &&
           peopleCount.value <= 8;
});

// Methods
const closeForm = () => {
    emit('update:modelValue', false);
};

const handleSubmit = async () => {
    sending.value = true;
    error.value = null;
    success.value = false;

    try {
        await store.dispatch('mail/sendCubicleReservation', {
            date: date.value,
            checkInTime: checkInTime.value,
            checkOutTime: checkOutTime.value,
            peopleCount: peopleCount.value
        });
        
        success.value = true;
        emit('form-sent-success');
    } catch (err) {
        console.error("Error al crear reserva:", err);
        error.value = 'Error al procesar la reserva';
    } finally {
        sending.value = false;
    }
};

onMounted(() => {
    loading.value = true;
    setTimeout(() => {
        loading.value = false;
    }, 1000);
});
</script>

<style scoped>
/* Form overlay and structure */
.form-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
}

.reservation-form {
    width: 500px;
    max-width: 90%;
    background-color: white;
    border-radius: 20px;
    padding: 2rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    overflow-y: auto;
    max-height: 90vh;
}

/* Form elements */
.form-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
}

.form-title {
    color: #000E32;
    font-family: 'Crimson Text', serif;
    font-size: 2rem;
    margin: 0;
}

.close-button {
    background: none;
    border: none;
    font-size: 30px;
    color: rgba(0, 71, 255, 1);
    cursor: pointer;
    transition: all 0.3s ease;
}

.close-button:hover {
    color: #FBE326;
}

/* Content sections */
.form-content {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
}

.info-section {
    padding: 1rem;
    border-radius: 10px;
    background-color: #f8f9fa;
}

.section-title {
    font-size: 1.2rem;
    font-weight: bold;
    margin-bottom: 0.75rem;
    color: #000E32;
}

/* Form inputs */
.time-inputs {
    display: flex;
    gap: 1rem;
    margin-bottom: 1rem;
}

.form-group {
    flex: 1;
}

.form-label {
    display: block;
    margin-bottom: 0.5rem;
    color: #000E32;
    font-weight: 600;
}

.form-input {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid rgba(126, 131, 130, 1);
    border-radius: 10px;
    font-size: 1rem;
    transition: all 0.3s ease;
}

.form-input:hover,
.form-input:focus {
    border-color: rgba(0, 71, 255, 1);
    outline: none;
    box-shadow: 0 0 5px rgba(0, 71, 255, 0.2);
}

/* Submit button */
.submit-button {
    width: 100%;
    padding: 1rem;
    background-color: rgba(0, 71, 255, 1);
    color: white;
    border: none;
    border-radius: 10px;
    font-size: 1.1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
}

.submit-button:hover {
    background-color: #FBE326;
    color: #000E32;
}

.submit-button:disabled {
    background-color: #ccc;
    cursor: not-allowed;
}

/* States */
.loading,
.error,
.success-message {
    text-align: center;
    padding: 2rem;
}

.success-message {
    text-align: center;
    padding: 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
}

.success-icon {
    font-size: 48px;
    color: #28a745;
    margin-bottom: 0.5rem;
}

.success-message p {
    color: #000E32;
    font-family: 'Nunito Sans', sans-serif;
    font-size: 1.1rem;
    margin-bottom: 1.5rem;
}

.success-close-button {
    background-color: rgba(0, 71, 255, 1);
    color: white;
    border: none;
    border-radius: 10px;
    padding: 0.75rem 2rem;
    font-family: 'Josefin Sans', sans-serif;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
}

.success-close-button:hover {
    background-color: #FBE326;
    color: #000E32;
    transform: translateY(-2px);
}

/* Helper text */
.form-text {
    font-size: 0.875rem;
    margin-top: 0.25rem;
    color: #6c757d;
}

/* Animations */
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

/* Responsive */
@media (max-width: 768px) {
    .reservation-form {
        padding: 1rem;
    }

    .time-inputs {
        flex-direction: column;
    }

    .form-title {
        font-size: 1.5rem;
    }

    .success-icon {
        font-size: 36px;
    }

    .success-message p {
        font-size: 1rem;
    }

    .success-close-button {
        padding: 0.6rem 1.5rem;
        font-size: 0.9rem;
    }
}
</style>

