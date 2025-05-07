<script setup>
import { ref, defineEmits, defineProps, onMounted, computed, watch } from 'vue';
import { useStore } from 'vuex';

const props = defineProps({
    modelValue: {
        type: Boolean,
        required: true
    },
    bookId: {
        type: String,
        required: true
    }
});

const emit = defineEmits(['update:modelValue', 'form-sent', 'form-sent-success']);
const store = useStore();

// Form state
const loading = ref(false);
const error = ref(null);
const formSubmitted = ref(false);

// Book and user data (read-only)
const book = ref(null);
const user = computed(() => store.getters['user/getUserData']);

// Reservation data (user input)
const date = ref('');
const time = ref('');

// Fetch the book and user data
const fetchData = async () => {
    loading.value = true;
    error.value = null;
    
    try {
        // Fetch book details
        await store.dispatch('books/fetchBookDetails', props.bookId);
        book.value = store.getters['books/getBookById'](props.bookId);

        if (!book.value || !user.value) {
            error.value = !book.value 
                ? 'No se pudo cargar la información del libro.'
                : 'No se pudo cargar la información del usuario.';
            return;
        }

    } catch (err) {
        console.error('Error fetching data:', err);
        error.value = 'Error al cargar los datos. Por favor intente de nuevo.';
    } finally {
        loading.value = false;
    }
};

const handleSubmit = async () => {
    formSubmitted.value = true;
    
    try {
        const reservationData = {
            bookTitle: book.value.Title,
            bookAuthor: book.value.author,
            bookISBN: book.value.ISBN,
            userName: user.value.Name_user,
            userEmail: user.value.Email,
            date: date.value,
            time: time.value
        };
        
        // Show alert with formatted data
        alert(
            'Datos de la Reserva:\n\n' +
            `Libro: ${reservationData.bookTitle}\n` +
            `Autor: ${reservationData.bookAuthor}\n` +
            `ISBN: ${reservationData.bookISBN}\n` +
            `Usuario: ${reservationData.userName}\n` +
            `Email: ${reservationData.userEmail}\n` +
            `Fecha: ${reservationData.date}\n` +
            `Hora: ${reservationData.time}`
        );
        
        // Here you would dispatch the reservation action
        // await store.dispatch('books/createReservation', reservationData);
        
        emit('form-sent-success');
        closeForm();
    } catch (error) {
        console.error("Error al crear reserva:", error);
        alert('Error al procesar la reserva');
    }
};

// Watch for both user and book data changes
watch([user, book], ([newUser, newBook]) => {
    if (!newUser || !newBook) {
        error.value = !newUser 
            ? 'No se pudo cargar la información del usuario.'
            : 'No se pudo cargar la información del libro.';
    } else {
        error.value = null;
    }
});

// Watch for modal visibility
watch(() => props.modelValue, (isOpen) => {
    if (isOpen) {
        fetchData();
    }
});

const closeForm = () => {
    date.value = '';
    time.value = '';
    formSubmitted.value = false;
    emit('update:modelValue', false);
};

onMounted(() => {
    fetchData();
});
</script>

<template>
    <Transition name="fade">
        <div v-if="modelValue" class="form-overlay" @click.self="closeForm">
            <form class="reservation-form" @submit.prevent="handleSubmit">
                <header class="form-header">
                    <h1 class="form-title">RESERVAR LIBRO</h1>
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

                <div v-else class="form-content">
                    <div class="info-container">
                        <!-- Book Information -->
                        <section class="info-section">
                            <h2 class="section-title">Información del Libro</h2>
                            <div class="info-group">
                                <p><strong>Título:</strong> {{ book?.Title }}</p>
                                <p><strong>Autor:</strong> {{ book?.author }}</p>
                                <p><strong>ISBN:</strong> {{ book?.ISBN }}</p>
                            </div>
                        </section>

                        <!-- User Information -->
                        <section class="info-section">
                            <h2 class="section-title">Información del Usuario</h2>
                            <div class="info-group">
                                <p><strong>Nombre:</strong> {{ user?.Name_user }}</p>
                                <p><strong>Email:</strong> {{ user?.Email }}</p>
                            </div>
                        </section>
                    </div>

                    <!-- Reservation Details -->
                    <section class="reservation-section">
                        <h2 class="section-title">Detalles de la Reserva</h2>
                        <div class="reservation-inputs">
                            <div class="form-group">
                                <label class="form-label">Fecha:</label>
                                <input 
                                    v-model="date"
                                    type="date"
                                    class="form-input"
                                    required
                                    :min="new Date().toISOString().split('T')[0]"
                                >
                            </div>

                            <div class="form-group">
                                <label class="form-label">Hora:</label>
                                <input 
                                    v-model="time"
                                    type="time"
                                    class="form-input"
                                    required
                                >
                            </div>
                        </div>
                    </section>

                    <button type="submit" class="submit-button" @click="handleSubmit">
                        CONFIRMAR RESERVA
                    </button>
                </div>
            </form>
        </div>
    </Transition>
</template>

<style scoped>
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
    width: auto;
    min-width: 500px;
    max-width: 800px;
    height: auto;
    max-height: 80vh;
    background-color: white;
    border-radius: 20px;
    padding: 2rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    overflow-y: auto;
}

.form-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
}

.form-title {
    color: #000E32;
    font-family: 'Crimson Text', serif;
    font-size: 2rem;
    margin: 0;
}

.info-container {
    display: flex;
    gap: 1rem;
    margin-bottom: 1rem;
}

.info-section {
    flex: 1;
    margin-bottom: 1rem;
    padding: 0.75rem;
    border-radius: 10px;
    background-color: #f8f9fa;
}

.section-title {
    font-size: 1rem;
    margin-bottom: 0.5rem;
    color: #000E32;
}

.info-group {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.info-group p {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.reservation-inputs {
    display: flex;
    gap: 1rem;
}

.form-group {
    flex: 1;
    margin-bottom: 1rem;
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

.form-input:hover, .form-input:focus {
    border-color: rgba(0, 71, 255, 1);
    outline: none;
    box-shadow: 0 0 5px rgba(0, 71, 255, 0.2);
}

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

.loading, .error {
    text-align: center;
    padding: 2rem;
    color: #000E32;
}

.error {
    color: red;
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

.close-button {
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    background: none;

    font-size: 30px;
    color: rgba(0, 71, 255, 1);
    transition: all 0.4s ease;

    &:hover {
        color: #FBE326;
    }
}

/* Add responsive behavior */
@media (max-width: 576px) {
    .reservation-form {
        width: 90%;
        min-width: auto;
    }
    
    .info-group p {
        white-space: normal;
    }
}
</style>